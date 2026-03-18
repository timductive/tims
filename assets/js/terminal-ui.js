(function () {
  var focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(", ");

  var lastInteractionWasKeyboard = true;
  var searchTrigger = null;
  var menuTrigger = null;
  var authorTrigger = null;

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  function normalizePath(pathname) {
    if (!pathname) {
      return "/";
    }

    var normalized = pathname.replace(/\/+$/, "");
    return normalized || "/";
  }

  function isVisible(element) {
    return Boolean(element && element.getClientRects().length);
  }

  function isDisclosureButtonVisible(button) {
    return isVisible(button);
  }

  function getFocusable(container) {
    if (!container) {
      return [];
    }

    return Array.prototype.filter.call(
      container.querySelectorAll(focusableSelector),
      function (element) {
        return isVisible(element) && !element.hasAttribute("disabled");
      }
    );
  }

  function restoreFocus(target) {
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  }

  function setExpanded(button, expanded) {
    if (button) {
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  function closeMenu(menuToggle, hiddenLinks, options) {
    options = options || {};

    if (!menuToggle || !hiddenLinks) {
      return;
    }

    hiddenLinks.classList.add("hidden");
    menuToggle.classList.remove("close");
    setExpanded(menuToggle, false);

    if (options.restoreFocus !== false) {
      restoreFocus(menuTrigger || menuToggle);
    }
  }

  function closeAuthorMenu(authorButton, authorLinks, options) {
    options = options || {};

    if (!authorButton || !authorLinks) {
      return;
    }

    authorButton.classList.remove("open");
    authorLinks.classList.remove("is--visible");
    setExpanded(authorButton, false);

    if (options.restoreFocus !== false) {
      restoreFocus(authorTrigger || authorButton);
    }
  }

  function closeSearch(searchToggle, searchContent, initialContent, searchInput, options) {
    options = options || {};

    if (!searchToggle || !searchContent || !initialContent) {
      return;
    }

    searchContent.classList.remove("is--visible");
    initialContent.classList.remove("is--hidden");
    if (searchInput) {
      searchInput.setAttribute("tabindex", "-1");
    }

    syncSearchState(searchToggle, searchContent, initialContent, searchInput);

    if (options.restoreFocus !== false) {
      restoreFocus(searchTrigger || searchToggle);
    }
  }

  function syncCurrentNav(nav) {
    if (!nav) {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);

    Array.prototype.forEach.call(
      nav.querySelectorAll(".visible-links a[href], .hidden-links a[href]"),
      function (link) {
      var href = link.getAttribute("href");

      if (!href || href.indexOf("#") === 0 || href.indexOf("http") === 0) {
        return;
      }

      if (normalizePath(href) === currentPath) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      }
    );
  }

  function syncMenuState(menuToggle, hiddenLinks) {
    if (!menuToggle || !hiddenLinks) {
      return false;
    }

    var isExpanded = !hiddenLinks.classList.contains("hidden") && isVisible(menuToggle);
    setExpanded(menuToggle, isExpanded);
    hiddenLinks.setAttribute("aria-hidden", isExpanded ? "false" : "true");
    return isExpanded;
  }

  function syncAuthorState(authorButton, authorLinks) {
    if (!authorButton || !authorLinks) {
      return false;
    }

    var isMobileDisclosure = isDisclosureButtonVisible(authorButton);
    var isExpanded = isMobileDisclosure
      ? authorLinks.classList.contains("is--visible") || authorButton.classList.contains("open")
      : isVisible(authorLinks);

    setExpanded(authorButton, isMobileDisclosure && isExpanded);
    authorLinks.setAttribute("aria-hidden", isExpanded ? "false" : "true");
    return isExpanded;
  }

  function syncSearchState(searchToggle, searchContent, initialContent, searchInput) {
    if (!searchToggle || !searchContent || !initialContent) {
      return false;
    }

    var isExpanded = searchContent.classList.contains("is--visible");
    setExpanded(searchToggle, isExpanded);
    searchContent.setAttribute("aria-hidden", isExpanded ? "false" : "true");
    initialContent.setAttribute("aria-hidden", isExpanded ? "true" : "false");

    if ("inert" in initialContent) {
      initialContent.inert = isExpanded;
    }

    if (searchInput) {
      if (isExpanded) {
        searchInput.removeAttribute("tabindex");
      } else {
        searchInput.setAttribute("tabindex", "-1");
      }
    }

    return isExpanded;
  }

  function trapFocus(event, container) {
    var focusable = getFocusable(container);

    if (!focusable.length) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function getSearchMatchCount(results) {
    if (!results) {
      return 0;
    }

    var summary = results.querySelector(".results__found");

    if (!summary) {
      return 0;
    }

    var match = summary.textContent.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  function ensureSearchPlaceholder(results, type, query) {
    if (!results) {
      return;
    }

    var placeholder = results.querySelector(".terminal-search__empty");

    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "terminal-search__empty";
      results.appendChild(placeholder);
    }

    if (type === "idle") {
      placeholder.innerHTML =
        '<p class="terminal-search__empty-title">awaiting query</p>' +
        '<p class="terminal-search__empty-copy">Type to scan titles, excerpts, categories, and tags.</p>' +
        '<p class="terminal-search__empty-copy">Examples: <code>director</code>, <code>remote</code>, <code>python</code>.</p>';
      return;
    }

    placeholder.innerHTML =
      '<p class="terminal-search__empty-title">no matching documents</p>' +
      '<p class="terminal-search__empty-copy">No indexed posts matched <code>' +
      query.replace(/[<>&]/g, "") +
      "</code>. Try a broader term.</p>";
  }

  function removeSearchPlaceholder(results) {
    if (!results) {
      return;
    }

    var placeholder = results.querySelector(".terminal-search__empty");
    if (placeholder) {
      placeholder.remove();
    }
  }

  function decorateSearchResults(results) {
    if (!results) {
      return;
    }

    Array.prototype.forEach.call(results.querySelectorAll(".list__item"), function (item, index) {
      var article = item.querySelector(".archive__item");
      var titleLink = item.querySelector(".archive__item-title a");
      var excerpt = item.querySelector(".archive__item-excerpt");

      if (!article || !titleLink) {
        return;
      }

      item.style.setProperty("--terminal-result-index", "'" + String(index + 1).padStart(2, "0") + "'");

      var meta = article.querySelector(".terminal-search__path");
      if (!meta) {
        meta = document.createElement("p");
        meta.className = "terminal-search__path";
        article.insertBefore(meta, excerpt || article.querySelector(".archive__item-title").nextSibling);
      }

      var pathname = "/";

      try {
        pathname = new URL(titleLink.href, window.location.origin).pathname;
      } catch (error) {
        pathname = titleLink.getAttribute("href") || "/";
      }

      meta.textContent = "open " + pathname;
    });
  }

  function enhanceExternalSocialLinks() {
    var selectors = [
      ".author__urls a[href]",
      ".page__footer-follow a[href]"
    ];

    Array.prototype.forEach.call(
      document.querySelectorAll(selectors.join(", ")),
      function (link) {
        var href = link.getAttribute("href");

        if (!href || href.indexOf("http") !== 0) {
          return;
        }

        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer me");
      }
    );
  }

  function enhanceSearchPresentation(searchContent, searchForm, searchInput, results) {
    if (!searchContent || !searchForm || !searchInput || !results) {
      return;
    }

    if (!searchContent.querySelector(".terminal-search__intro")) {
      var intro = document.createElement("div");
      intro.className = "terminal-search__intro";
      intro.innerHTML =
        '<p class="terminal-search__boot">index ready :: lunr/content-store :: live scan enabled</p>' +
        '<p class="terminal-search__hint">Use plain language. Results update as you type.</p>';
      searchContent.querySelector(".search-content__inner-wrap").insertBefore(intro, searchForm);
    }

    if (!searchForm.querySelector(".terminal-search__prompt")) {
      var prompt = document.createElement("span");
      prompt.className = "terminal-search__prompt";
      prompt.setAttribute("aria-hidden", "true");
      prompt.textContent = "grep>";
      searchForm.insertBefore(prompt, searchInput);
    }

    var status = searchContent.querySelector(".terminal-search__status");
    if (!status) {
      status = document.createElement("div");
      status.className = "terminal-search__status";
      status.setAttribute("aria-live", "polite");
      searchForm.insertAdjacentElement("afterend", status);
    }

    results.classList.add("terminal-search__results");
    results.setAttribute("role", "region");
    results.setAttribute("aria-live", "polite");
    searchInput.setAttribute("placeholder", "search posts, tags, categories...");

    var query = searchInput.value.trim();
    searchContent.dataset.query = query;

    var foundSummary = results.querySelector(".results__found");
    var matches = getSearchMatchCount(results);

    if (!query) {
      status.textContent = "status: awaiting query";
      if (foundSummary) {
        foundSummary.textContent = "0 matches";
      }
      ensureSearchPlaceholder(results, "idle", query);
      return;
    }

    status.textContent =
      "status: scan complete :: " +
      matches +
      " " +
      (matches === 1 ? "match" : "matches") +
      ' for "' +
      query +
      '"';

    if (foundSummary) {
      foundSummary.textContent =
        ">> " + matches + " " + (matches === 1 ? "result" : "results") + " loaded";
    }

    if (matches === 0) {
      ensureSearchPlaceholder(results, "empty", query);
      return;
    }

    removeSearchPlaceholder(results);
    decorateSearchResults(results);
  }

  onReady(function () {
    var nav = document.getElementById("site-nav");
    var menuToggle = document.querySelector(".greedy-nav__toggle");
    var hiddenLinks = document.querySelector(".hidden-links");
    var searchToggle = document.querySelector(".search__toggle");
    var searchContent = document.querySelector(".search-content");
    var searchForm = document.querySelector(".search-content__form");
    var searchInput = document.querySelector(".search-input");
    var searchLabel = document.querySelector("label[for='search']");
    var searchResults = document.getElementById("results");
    var initialContent = document.querySelector(".initial-content");
    var authorButton = document.querySelector(".author__urls-wrapper button");
    var authorLinks = document.querySelector(".author__urls");

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Tab" ||
        event.key.indexOf("Arrow") === 0 ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        lastInteractionWasKeyboard = true;
      }
    });

    document.addEventListener("pointerdown", function () {
      lastInteractionWasKeyboard = false;
    });

    if (nav) {
      syncCurrentNav(nav);
    }

    enhanceExternalSocialLinks();

    if (menuToggle && hiddenLinks) {
      if (!hiddenLinks.id) {
        hiddenLinks.id = "site-nav-hidden-links";
      }

      menuToggle.setAttribute("aria-controls", hiddenLinks.id);
      menuToggle.setAttribute("aria-haspopup", "true");
      syncMenuState(menuToggle, hiddenLinks);

      menuToggle.addEventListener("click", function () {
        menuTrigger = menuToggle;

        window.setTimeout(function () {
          if (syncMenuState(menuToggle, hiddenLinks) && lastInteractionWasKeyboard) {
            var firstHiddenLink = hiddenLinks.querySelector("a[href]");
            if (firstHiddenLink) {
              firstHiddenLink.focus();
            }
          }
        }, 0);
      });

      menuToggle.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown" && hiddenLinks.classList.contains("hidden")) {
          event.preventDefault();
          menuTrigger = menuToggle;
          menuToggle.click();
        }
      });

      new MutationObserver(function () {
        syncMenuState(menuToggle, hiddenLinks);
      }).observe(hiddenLinks, { attributes: true, attributeFilter: ["class"] });
    }

    if (authorButton && authorLinks) {
      if (!authorLinks.id) {
        authorLinks.id = "author-links-panel";
      }

      authorButton.setAttribute("aria-controls", authorLinks.id);
      authorButton.setAttribute("aria-haspopup", "true");
      syncAuthorState(authorButton, authorLinks);

      authorButton.addEventListener("click", function () {
        authorTrigger = authorButton;

        window.setTimeout(function () {
          if (syncAuthorState(authorButton, authorLinks) && lastInteractionWasKeyboard) {
            var firstAuthorLink = authorLinks.querySelector("a[href]");
            if (firstAuthorLink) {
              firstAuthorLink.focus();
            }
          }
        }, 0);
      });

      new MutationObserver(function () {
        syncAuthorState(authorButton, authorLinks);
      }).observe(authorLinks, { attributes: true, attributeFilter: ["class"] });

      new MutationObserver(function () {
        syncAuthorState(authorButton, authorLinks);
      }).observe(authorButton, { attributes: true, attributeFilter: ["class"] });
    }

    if (searchToggle && searchContent && initialContent) {
      if (!searchContent.id) {
        searchContent.id = "site-search-panel";
      }

      if (searchLabel && !searchLabel.id) {
        searchLabel.id = "site-search-label";
      }

      searchToggle.setAttribute("aria-controls", searchContent.id);
      searchToggle.setAttribute("aria-haspopup", "dialog");
      searchContent.setAttribute("role", "dialog");
      searchContent.setAttribute("aria-modal", "true");

      if (searchLabel) {
        searchContent.setAttribute("aria-labelledby", searchLabel.id);
      }

      syncSearchState(searchToggle, searchContent, initialContent, searchInput);
      enhanceSearchPresentation(searchContent, searchForm, searchInput, searchResults);

      searchToggle.addEventListener("click", function () {
        searchTrigger = searchToggle;

        window.setTimeout(function () {
          if (syncSearchState(searchToggle, searchContent, initialContent, searchInput)) {
            window.setTimeout(function () {
              if (searchInput) {
                searchInput.focus();
              }
            }, 25);
          } else {
            restoreFocus(searchTrigger || searchToggle);
          }
        }, 0);
      });

      new MutationObserver(function () {
        syncSearchState(searchToggle, searchContent, initialContent, searchInput);
      }).observe(searchContent, { attributes: true, attributeFilter: ["class"] });

      if (searchResults) {
        new MutationObserver(function () {
          enhanceSearchPresentation(searchContent, searchForm, searchInput, searchResults);
        }).observe(searchResults, { childList: true });
      }

      if (searchInput) {
        searchInput.addEventListener("input", function () {
          enhanceSearchPresentation(searchContent, searchForm, searchInput, searchResults);
        });
      }
    }

    document.addEventListener("click", function (event) {
      if (menuToggle && hiddenLinks && syncMenuState(menuToggle, hiddenLinks) && !nav.contains(event.target)) {
        closeMenu(menuToggle, hiddenLinks, { restoreFocus: false });
      }

      if (
        authorButton &&
        authorLinks &&
        isDisclosureButtonVisible(authorButton) &&
        syncAuthorState(authorButton, authorLinks) &&
        !authorButton.closest(".author__urls-wrapper").contains(event.target)
      ) {
        closeAuthorMenu(authorButton, authorLinks, { restoreFocus: false });
      }
    });

    document.addEventListener("focusin", function (event) {
      if (menuToggle && hiddenLinks && syncMenuState(menuToggle, hiddenLinks) && !nav.contains(event.target)) {
        closeMenu(menuToggle, hiddenLinks, { restoreFocus: false });
      }

      if (
        authorButton &&
        authorLinks &&
        isDisclosureButtonVisible(authorButton) &&
        syncAuthorState(authorButton, authorLinks) &&
        !authorButton.closest(".author__urls-wrapper").contains(event.target)
      ) {
        closeAuthorMenu(authorButton, authorLinks, { restoreFocus: false });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (searchToggle && searchContent && initialContent && syncSearchState(searchToggle, searchContent, initialContent, searchInput)) {
          event.preventDefault();
          closeSearch(searchToggle, searchContent, initialContent, searchInput);
          return;
        }

        if (menuToggle && hiddenLinks && syncMenuState(menuToggle, hiddenLinks)) {
          event.preventDefault();
          closeMenu(menuToggle, hiddenLinks);
          return;
        }

        if (authorButton && authorLinks && isDisclosureButtonVisible(authorButton) && syncAuthorState(authorButton, authorLinks)) {
          event.preventDefault();
          closeAuthorMenu(authorButton, authorLinks);
        }
      }

      if (event.key === "Tab" && searchToggle && searchContent && initialContent && syncSearchState(searchToggle, searchContent, initialContent, searchInput)) {
        trapFocus(event, searchContent);
      }
    });
  });
})();
