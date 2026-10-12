(() => {
  const container = document.querySelector(".markdown-root");
  let mermaidLoader = null;

  if (!container) {
    return;
  }

  loadMarkdown(container);

  async function loadMarkdown(root) {
    try {
      const response = await fetch(root.dataset.source, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const source = await response.text();
      root.innerHTML = renderMarkdown(source);
      decoratePage(root);
      await initializeEnhancements(root);
      enhanceLinks(root);
      scrollToHash();
    } catch (error) {
      root.innerHTML = [
        "<p><strong>Local preview could not load the Markdown source.</strong></p>",
        `<p>${escapeHtml(String(error.message || error))}</p>`
      ].join("");
    }
  }

  function renderMarkdown(markdown) {
    const lines = stripFrontMatter(markdown)
      .replace(/\r\n?/g, "\n")
      .split("\n");

    const blocks = [];
    let paragraph = [];
    let index = 0;

    function flushParagraph() {
      if (!paragraph.length) {
        return;
      }

      blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }

    while (index < lines.length) {
      const originalLine = lines[index].replace(/\t/g, "  ");
      const trimmedLine = originalLine.trim();

      if (!trimmedLine) {
        flushParagraph();
        index += 1;
        continue;
      }

      if (/^#{1,6}\s+/.test(trimmedLine)) {
        flushParagraph();
        const match = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
        const level = match[1].length;
        blocks.push(`<h${level}>${renderInline(match[2])}</h${level}>`);
        index += 1;
        continue;
      }

      if (/^(-{3,}|\*{3,})$/.test(trimmedLine)) {
        flushParagraph();
        blocks.push("<hr>");
        index += 1;
        continue;
      }

      if (/^```/.test(trimmedLine)) {
        flushParagraph();
        const result = parseCodeFence(lines, index);
        blocks.push(result.html);
        index = result.nextIndex;
        continue;
      }

      if (trimmedLine.startsWith(">")) {
        flushParagraph();
        const quoteLines = [];

        while (index < lines.length) {
          const quoteLine = lines[index].trim();
          if (!quoteLine.startsWith(">")) {
            break;
          }

          quoteLines.push(quoteLine.replace(/^>\s?/, ""));
          index += 1;
        }

        blocks.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
        continue;
      }

      if (isRawHtml(trimmedLine)) {
        flushParagraph();
        blocks.push(trimmedLine);
        index += 1;
        continue;
      }

      const standaloneImage = parseStandaloneImage(trimmedLine);
      if (standaloneImage) {
        flushParagraph();
        blocks.push(buildImageHtml(standaloneImage, true));
        index += 1;
        continue;
      }

      const listMatch = originalLine.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
      if (listMatch) {
        flushParagraph();
        const result = parseList(lines, index, listMatch[1].length);
        blocks.push(result.html);
        index = result.nextIndex;
        continue;
      }

      paragraph.push(trimmedLine);
      index += 1;
    }

    flushParagraph();
    return blocks.join("\n");
  }

  function parseCodeFence(lines, startIndex) {
    const firstLine = lines[startIndex].trim();
    const language = firstLine.slice(3).trim().toLowerCase();
    const codeLines = [];
    let index = startIndex + 1;

    while (index < lines.length) {
      const line = lines[index];
      if (line.trim() === "```") {
        index += 1;
        break;
      }

      codeLines.push(line);
      index += 1;
    }

    return {
      html: buildCodeBlockHtml(codeLines.join("\n"), language),
      nextIndex: index
    };
  }

  function buildCodeBlockHtml(code, language) {
    if (language === "mermaid") {
      return `<div class="mermaid">${escapeHtml(code)}</div>`;
    }

    const languageClass = language ? ` language-${escapeAttribute(language)}` : "";
    return `<pre class="md-code-block"><code class="${(`md-code${languageClass}`).trim()}">${escapeHtml(code)}</code></pre>`;
  }

  function parseList(lines, startIndex, baseIndent) {
    let html = "";
    let listTag = "";
    let index = startIndex;

    while (index < lines.length) {
      const originalLine = lines[index].replace(/\t/g, "  ");
      const trimmedLine = originalLine.trim();

      if (!trimmedLine) {
        index += 1;
        continue;
      }

      const match = originalLine.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
      if (!match) {
        break;
      }

      const indent = match[1].length;
      if (indent < baseIndent) {
        break;
      }

      if (indent > baseIndent) {
        break;
      }

      const nextTag = /\d+\./.test(match[2]) ? "ol" : "ul";
      if (!listTag) {
        listTag = nextTag;
        html += `<${listTag}>`;
      } else if (listTag !== nextTag) {
        html += `</${listTag}><${nextTag}>`;
        listTag = nextTag;
      }

      const itemText = match[3].trim();
      index += 1;
      let childHtml = "";

      while (index < lines.length) {
        const nestedLine = lines[index].replace(/\t/g, "  ");
        const nestedTrimmed = nestedLine.trim();

        if (!nestedTrimmed) {
          index += 1;
          continue;
        }

        const nestedMatch = nestedLine.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
        if (nestedMatch && nestedMatch[1].length > baseIndent) {
          const nestedResult = parseList(lines, index, nestedMatch[1].length);
          childHtml += nestedResult.html;
          index = nestedResult.nextIndex;
          continue;
        }

        break;
      }

      html += `<li>${renderInline(itemText)}${childHtml}</li>`;
    }

    if (listTag) {
      html += `</${listTag}>`;
    }

    return { html, nextIndex: index };
  }

  function renderInline(text) {
    const escapedTokens = [];
    text = text.replace(/\\\*/g, () => {
      const token = `@@ESCAPED${escapedTokens.length}@@`;
      escapedTokens.push("*");
      return token;
    });

    const imageTokens = [];
    let html = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)(?:\{([a-z-]+)\})?/g, (_, alt, url, title, variant) => {
      const token = `@@IMAGE${imageTokens.length}@@`;
      imageTokens.push(buildImageHtml({ alt, url, title, variant }, false));
      return token;
    });

    const linkTokens = [];
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const token = `@@LINK${linkTokens.length}@@`;
      linkTokens.push(`<a href="${escapeAttribute(url)}">${escapeHtml(label)}</a>`);
      return token;
    });

    html = escapeHtml(html);

    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/@@ESCAPED(\d+)@@/g, (_, tokenIndex) => escapedTokens[Number(tokenIndex)]);
    html = html.replace(/@@IMAGE(\d+)@@/g, (_, tokenIndex) => {
      return imageTokens[Number(tokenIndex)];
    });
    html = html.replace(/@@LINK(\d+)@@/g, (_, tokenIndex) => {
      return linkTokens[Number(tokenIndex)];
    });

    return html;
  }

  function parseStandaloneImage(text) {
    const match = text.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)(?:\{([a-z-]+)\})?$/);
    if (!match) {
      return null;
    }

    return {
      alt: match[1],
      url: match[2],
      title: match[3] || "",
      variant: match[4] || ""
    };
  }

  function buildImageHtml(image, isBlock) {
    const variant = (image.variant || "").toLowerCase();
    const src = escapeAttribute(image.url);
    const alt = escapeAttribute(image.alt || "");
    const title = image.title ? ` title="${escapeAttribute(image.title)}"` : "";

    if (!isBlock) {
      const inlineClasses = ["md-inline-image"];
      if (variant) {
        inlineClasses.push(`md-inline-image--${variant}`);
      }

      return `<img class="${inlineClasses.join(" ")}" src="${src}" alt="${alt}"${title}>`;
    }

    const figureClasses = ["md-figure"];
    const imageClasses = ["md-image"];
    if (variant) {
      figureClasses.push(`md-figure--${variant}`);
      imageClasses.push(`md-image--${variant}`);
    }

    const caption = getImageCaption(image, variant);
    let html = `<figure class="${figureClasses.join(" ")}"><img class="${imageClasses.join(" ")}" src="${src}" alt="${alt}"${title}>`;
    if (caption) {
      html += `<figcaption>${escapeHtml(caption)}</figcaption>`;
    }
    html += "</figure>";
    return html;
  }

  function getImageCaption(image, variant) {
    if (variant === "avatar" || variant === "icon") {
      return "";
    }

    if (image.title) {
      return image.title;
    }

    if (variant === "feature") {
      return image.alt || "";
    }

    return "";
  }

  function stripFrontMatter(text) {
    let normalized = text.replace(/\r\n?/g, "\n");

    while (normalized.startsWith("---\n")) {
      const endIndex = normalized.indexOf("\n---\n", 4);
      if (endIndex === -1) {
        break;
      }

      normalized = normalized.slice(endIndex + 5);

      if (normalized.startsWith("\n")) {
        normalized = normalized.slice(1);
      }
    }

    return normalized;
  }

  function decoratePage(root) {
    if (root.classList.contains("publications-page")) {
      decoratePublications(root);
    }
  }

  async function initializeEnhancements(root) {
    if (root.querySelector(".mermaid")) {
      await initializeMermaid(root);
    }
  }

  async function initializeMermaid(root) {
    try {
      if (!window.mermaid) {
        if (!mermaidLoader) {
          mermaidLoader = loadScript("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js")
            .then(() => {
              window.mermaid.initialize({
                startOnLoad: false,
                securityLevel: "loose",
                theme: "base",
                themeVariables: {
                  primaryColor: "#fffaf2",
                  primaryTextColor: "#19232d",
                  primaryBorderColor: "#cbb79d",
                  lineColor: "#8a8f98",
                  secondaryColor: "#f4eee4",
                  tertiaryColor: "#f5fbfa",
                  fontFamily: "IBM Plex Sans, Segoe UI, sans-serif"
                },
                flowchart: {
                  curve: "basis",
                  nodeSpacing: 32,
                  rankSpacing: 42,
                  padding: 14,
                  useMaxWidth: true
                }
              });
              return window.mermaid;
            });
        }

        await mermaidLoader;
      }

      const nodes = Array.from(root.querySelectorAll(".mermaid")).filter((node) => !node.dataset.mermaidProcessed);
      if (!nodes.length) {
        return;
      }

      for (const node of nodes) {
        node.dataset.mermaidProcessed = "true";
      }

      await window.mermaid.run({ nodes });
    } catch (error) {
      root.querySelectorAll(".mermaid").forEach((node) => {
        node.classList.add("mermaid-fallback");
      });
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }

  function decoratePublications(root) {
    const nodes = Array.from(root.childNodes);
    const fragment = document.createDocumentFragment();
    let currentSection = null;
    let currentCard = null;
    let leadAssigned = false;
    let pendingNodes = [];

    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.textContent.trim()) {
          continue;
        }

        if (currentCard) {
          currentCard.append(node);
        } else if (currentSection) {
          currentSection.append(node);
        } else {
          fragment.append(node);
        }
        continue;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      const tag = node.tagName;

      if (tag === "H1") {
        fragment.append(node);
        continue;
      }

      if (!leadAssigned && tag === "P") {
        node.classList.add("publications-lead");
        fragment.append(node);
        leadAssigned = true;
        continue;
      }

      if (tag === "H2") {
        currentSection = document.createElement("section");
        currentSection.className = "pub-section";
        currentSection.append(node);
        fragment.append(currentSection);
        currentCard = null;
        pendingNodes = [];
        continue;
      }

      if (!currentSection) {
        fragment.append(node);
        continue;
      }

      if (tag === "A" && node.id) {
        pendingNodes.push(node);
        continue;
      }

      if (tag === "H3") {
        currentCard = document.createElement("article");
        currentCard.className = "pub-card";

        for (const pendingNode of pendingNodes) {
          currentCard.append(pendingNode);
        }
        pendingNodes = [];

        currentCard.append(node);
        currentSection.append(currentCard);
        continue;
      }

      if (currentCard) {
        currentCard.append(node);
      } else {
        currentSection.append(node);
      }
    }

    root.replaceChildren(fragment);
  }

  function enhanceLinks(root) {
    root.querySelectorAll("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    });
  }

  function scrollToHash() {
    if (!window.location.hash) {
      return;
    }

    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) {
      target.scrollIntoView();
    }
  }

  function isRawHtml(text) {
    return /^<[\s\S]+>$/.test(text);
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  function escapeAttribute(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/\"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();