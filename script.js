(function () {
    var header = document.querySelector(".site-header");
    var nav = document.getElementById("site-nav");
    var toggle = document.querySelector(".nav-toggle");
    var yearEl = document.getElementById("year");
    var themeBtn = document.getElementById("theme-toggle");
    var progressEl = document.getElementById("scroll-progress");
    var metaTheme = document.getElementById("meta-theme");
    var copyBtn = document.getElementById("copy-email");
  
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  
    function setMetaTheme(dark) {
      if (!metaTheme) return;
      metaTheme.setAttribute("content", dark ? "#131314" : "#ffffff");
    }
  
    function applyTheme(dark) {
      if (dark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      setMetaTheme(dark);
      if (themeBtn) {
        themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
        themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      }
    }
  
    function writeStoredTheme(value) {
      try {
        if (value) {
          localStorage.setItem("theme", value);
        } else {
          localStorage.removeItem("theme");
        }
      } catch (e) {}
    }
  
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        var next = !isDark;
        applyTheme(next);
        writeStoredTheme(next ? "dark" : "light");
      });
      var darkNow = document.documentElement.getAttribute("data-theme") === "dark";
      setMetaTheme(darkNow);
      themeBtn.setAttribute("aria-pressed", darkNow ? "true" : "false");
      themeBtn.setAttribute("aria-label", darkNow ? "Switch to light theme" : "Switch to dark theme");
    }
  
    var scrollTicking = false;
  
    function updateScrollUI() {
      scrollTicking = false;
      if (header) {
        if (window.scrollY > 12) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }
      if (progressEl) {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var p = max > 0 ? (window.scrollY / max) * 100 : 0;
        progressEl.style.width = Math.min(100, Math.max(0, p)) + "%";
      }
    }
  
    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
        toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
        nav.classList.toggle("is-open", !open);
      });
  
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
          nav.classList.remove("is-open");
        });
      });
    }
  
    if (copyBtn) {
      var email = copyBtn.getAttribute("data-email") || "";
      copyBtn.addEventListener("click", function () {
        if (!email || !navigator.clipboard || !navigator.clipboard.writeText) {
          window.location.href = "mailto:" + email;
          return;
        }
        navigator.clipboard.writeText(email).then(
          function () {
            copyBtn.classList.add("is-done");
            var prev = copyBtn.textContent;
            copyBtn.textContent = "Copied!";
            copyBtn.disabled = true;
            window.setTimeout(function () {
              copyBtn.textContent = prev;
              copyBtn.classList.remove("is-done");
              copyBtn.disabled = false;
            }, 2000);
          },
          function () {
            window.location.href = "mailto:" + email;
          }
        );
      });
    }
  
    var revealIo = null;
  
    function setRevealMotionReduced(isReduced) {
      var revealEls = document.querySelectorAll(".reveal");
      if (revealIo) {
        revealIo.disconnect();
        revealIo = null;
      }
      if (isReduced) {
        revealEls.forEach(function (el) {
          el.classList.add("is-visible");
        });
        return;
      }
      revealEls.forEach(function (el) {
        el.classList.remove("is-visible");
      });
      if (revealEls.length && "IntersectionObserver" in window) {
        revealIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealIo.unobserve(entry.target);
              }
            });
          },
          { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        revealEls.forEach(function (el) {
          revealIo.observe(el);
        });
      } else {
        revealEls.forEach(function (el) {
          el.classList.add("is-visible");
        });
      }
    }
  
    var mqReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRevealMotionReduced(mqReduceMotion.matches);
    if (mqReduceMotion.addEventListener) {
      mqReduceMotion.addEventListener("change", function () {
        setRevealMotionReduced(mqReduceMotion.matches);
      });
    } else if (mqReduceMotion.addListener) {
      mqReduceMotion.addListener(function () {
        setRevealMotionReduced(mqReduceMotion.matches);
      });
    }
  
    /* Rotating hero one-liners, Konami toast, footer dot mini-game */
    (function initPlayfulBits() {
      var funLineText = document.getElementById("hero-funline-text");
      var funLineWrap = document.getElementById("hero-funline");
      var toastEl = document.getElementById("fun-toast");
      var toastTimer;
  
      var lines = [
        "Ctrl+S is a quiet thank-you to Future You.",
        "If the build is green, we celebrate with the smallest possible deploy dance.",
        "Good logs read like a story; great ones save your weekend.",
        "Tests pass, coffee refills — ship it.",
        "404: imposter syndrome (sometimes). 200: shipped anyway.",
        "I read stack traces the way some people read mystery novels.",
        "Rubber duck debugging: still undefeated.",
      ];
  
      function showFunToast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.hidden = false;
        requestAnimationFrame(function () {
          toastEl.classList.add("fun-toast--show");
        });
        clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
          toastEl.classList.remove("fun-toast--show");
          toastTimer = window.setTimeout(function () {
            toastEl.hidden = true;
            toastEl.textContent = "";
          }, 420);
        }, 3200);
      }
  
      if (funLineText && funLineWrap && lines.length) {
        var idx = Math.floor(Math.random() * lines.length);
        funLineText.textContent = lines[idx];
        if (!mqReduceMotion.matches) {
          window.setInterval(function () {
            idx = (idx + 1) % lines.length;
            funLineWrap.classList.add("hero-funline--swap");
            window.setTimeout(function () {
              funLineText.textContent = lines[idx];
              funLineWrap.classList.remove("hero-funline--swap");
            }, 260);
          }, 12000);
        }
      }
  
      function normalizeKonamiKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return "";
        var c = e.code;
        if (c === "ArrowUp" || c === "ArrowDown" || c === "ArrowLeft" || c === "ArrowRight") return c;
        if (c === "KeyB" || c === "KeyA") return c;
        var k = e.key;
        if (k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight") return k;
        if (k && k.length === 1) {
          if (/^b$/i.test(k)) return "KeyB";
          if (/^a$/i.test(k)) return "KeyA";
        }
        var kc = typeof e.keyCode === "number" ? e.keyCode : e.which;
        if (kc === 38) return "ArrowUp";
        if (kc === 40) return "ArrowDown";
        if (kc === 37) return "ArrowLeft";
        if (kc === 39) return "ArrowRight";
        if (kc === 66) return "KeyB";
        if (kc === 65) return "KeyA";
        return "";
      }
  
      var konami = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
      ];
      var kPos = 0;
      document.addEventListener(
        "keydown",
        function (e) {
          var tag = (e.target && e.target.tagName) || "";
          if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.isComposing) return;
          if (e.target && e.target.isContentEditable) return;
          if (e.repeat) return;
          var step = normalizeKonamiKey(e);
          if (!step) {
            kPos = 0;
            return;
          }
          if (step !== konami[kPos]) {
            kPos = step === konami[0] ? 1 : 0;
            return;
          }
          kPos++;
          if (kPos === konami.length) {
            kPos = 0;
            showFunToast("Nice — classic cheat code unlocked.");
          }
        },
        false
      );
  
      var footerColors = document.querySelector(".footer-colors");
      if (footerColors) {
        var dotSeq = 0;
        var expectedDots = [0, 1, 2, 3];
        footerColors.addEventListener("click", function (e) {
          var t = e.target;
          if (!t || !t.getAttribute) return;
          var raw = t.getAttribute("data-footer-dot");
          if (raw === null) return;
          var n = parseInt(raw, 10);
          if (n !== expectedDots[dotSeq]) {
            dotSeq = n === 0 ? 1 : 0;
            return;
          }
          dotSeq++;
          t.classList.add("footer-dot--pop");
          window.setTimeout(function () {
            t.classList.remove("footer-dot--pop");
          }, 450);
          if (dotSeq === 4) {
            dotSeq = 0;
            showFunToast("Rainbow order — you get bonus points.");
          }
        });
      }
    })();
  
    /* GitHub repos — multi-page API fetch, batched grid + ?demo=1 sample data */
    (function initRepoGrid() {
      var grid = document.getElementById("repo-showcase-grid");
      var statusEl = document.getElementById("repo-showcase-status");
      var fallback = document.getElementById("repo-showcase-fallback");
      var actionsEl = document.getElementById("repo-showcase-actions");
      var loadMoreBtn = document.getElementById("repo-showcase-load-more");
      if (!grid || !actionsEl || !loadMoreBtn) return;
  
      var GITHUB_USER = "PraveenKannaAyyasamy";
      var PER_PAGE = 100;
      var INITIAL_VISIBLE = 12;
      var LOAD_MORE_STEP = 12;
  
      var demoMode = /(?:^|[?&])demo=1(?:&|$)/.test(window.location.search);
      var allRepos = [];
      var visibleCount = 0;
      var lastApiPageCount = 1;
  
      function safeGithubUrl(u) {
        if (!u || typeof u !== "string") return "#";
        try {
          var parsed = new URL(u);
          if (parsed.hostname !== "github.com") return "#";
          return parsed.href;
        } catch (e) {
          return "#";
        }
      }
  
      function langClass(lang) {
        var map = {
          Java: "java",
          TypeScript: "ts",
          JavaScript: "js",
          HTML: "html",
          CSS: "css",
          Python: "py",
        };
        if (!lang) return "misc";
        return map[lang] || "misc";
      }
  
      function formatUpdated(iso) {
        if (!iso) return "";
        var d = new Date(iso);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      }
  
      function buildDemoRepos() {
        var base = "https://github.com/PraveenKannaAyyasamy/";
        var langs = ["Java", "TypeScript", "JavaScript", "Python", "HTML", "CSS"];
        var stems = ["ledger", "risk-ui", "auth-bff", "batch-jobs", "reports", "notifications", "pricing", "catalog"];
        var out = [];
        var i;
        for (i = 0; i < 28; i++) {
          var lang = langs[i % langs.length];
          var stem = stems[i % stems.length];
          var num = (i + 1 < 10 ? "0" : "") + (i + 1);
          var name = "demo-" + stem + "-" + num;
          if (i === 8) name = "spring-security-lab";
          if (i === 17) name = "legacy-migration-playground";
          var daysAgo = i * 2 + (i % 11);
          var d = new Date();
          d.setDate(d.getDate() - daysAgo);
          d.setHours(12, 0, 0, 0);
          var iso = d.toISOString();
          out.push({
            name: name,
            html_url: base + name,
            description:
              "Sample repository #" +
              (i + 1) +
              " for layout demos — long text clamps inside the card.",
            language: lang,
            fork: i === 12,
            archived: i === 24,
            stargazers_count: (i * 3) % 17,
            forks_count: (i * 2) % 9,
            pushed_at: iso,
            updated_at: iso,
          });
        }
        return out;
      }
  
      function fetchAllRepos(user) {
        var acc = [];
        var pageCount = 0;
        function fetchPage(page) {
          var url =
            "https://api.github.com/users/" +
            encodeURIComponent(user) +
            "/repos?per_page=" +
            PER_PAGE +
            "&sort=updated&type=all&page=" +
            page;
          return fetch(url, { headers: { Accept: "application/vnd.github+json" } }).then(function (res) {
            if (!res.ok) throw new Error("GitHub API " + res.status);
            return res.json().then(function (chunk) {
              pageCount++;
              if (!Array.isArray(chunk) || chunk.length === 0) {
                return { repos: acc, pageCount: pageCount };
              }
              acc = acc.concat(chunk);
              if (chunk.length < PER_PAGE) {
                return { repos: acc, pageCount: pageCount };
              }
              return fetchPage(page + 1);
            });
          });
        }
        return fetchPage(1);
      }
  
      function sortRepos(repos) {
        repos.sort(function (a, b) {
          if (Boolean(a.archived) !== Boolean(b.archived)) {
            return a.archived ? 1 : -1;
          }
          var da = new Date(a.pushed_at || a.updated_at || 0).getTime();
          var db = new Date(b.pushed_at || b.updated_at || 0).getTime();
          return db - da;
        });
        return repos;
      }
  
      function appendCard(repo) {
        var name = repo.name || "repo";
        var url = safeGithubUrl(repo.html_url);
        var desc = repo.description ? String(repo.description) : "No description — open the repo for the README.";
        if (desc.length > 200) {
          desc = desc.slice(0, 197) + "…";
        }
        var lang = repo.language || "Code";
        var langSlug = langClass(repo.language);
  
        var cell = document.createElement("li");
        cell.className = "repo-showcase__cell";
  
        var card = document.createElement("article");
        card.className = "repo-showcase__tile repo-showcase__tile--" + langSlug;
  
        var top = document.createElement("div");
        top.className = "repo-showcase__head";
  
        var badges = document.createElement("div");
        badges.className = "repo-showcase__badges";
  
        var langEl = document.createElement("span");
        langEl.className = "repo-lang repo-lang--" + langSlug;
        langEl.textContent = lang;
        badges.appendChild(langEl);
  
        if (repo.fork) {
          var fork = document.createElement("span");
          fork.className = "repo-showcase__tag";
          fork.title = "Forked repository";
          fork.textContent = "Fork";
          badges.appendChild(fork);
        }
        if (repo.archived) {
          var arch = document.createElement("span");
          arch.className = "repo-showcase__tag";
          arch.title = "Archived";
          arch.textContent = "Archived";
          badges.appendChild(arch);
        }
  
        var ext = document.createElement("a");
        ext.className = "repo-showcase__ext";
        ext.href = url;
        ext.target = "_blank";
        ext.rel = "noopener noreferrer";
        ext.setAttribute("aria-label", "Open " + name + " on GitHub");
        ext.textContent = "↗";
  
        top.appendChild(badges);
        top.appendChild(ext);
  
        var title = document.createElement("h3");
        title.className = "repo-showcase__title";
        var titleA = document.createElement("a");
        titleA.href = url;
        titleA.target = "_blank";
        titleA.rel = "noopener noreferrer";
        titleA.textContent = name;
        title.appendChild(titleA);
  
        var p = document.createElement("p");
        p.className = "repo-showcase__desc";
        p.textContent = desc;
  
        var meta = document.createElement("div");
        meta.className = "repo-showcase__meta";
        var stars = typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0;
        var forks = typeof repo.forks_count === "number" ? repo.forks_count : 0;
        var updated = formatUpdated(repo.pushed_at || repo.updated_at);
  
        var s1 = document.createElement("span");
        s1.textContent = "★ " + stars;
        meta.appendChild(s1);
        var s2 = document.createElement("span");
        s2.textContent = forks + " forks";
        meta.appendChild(s2);
        if (updated) {
          var s3 = document.createElement("span");
          s3.textContent = "Updated " + updated;
          meta.appendChild(s3);
        }
  
        card.appendChild(top);
        card.appendChild(title);
        card.appendChild(p);
        card.appendChild(meta);
        cell.appendChild(card);
        grid.appendChild(cell);
      }
  
      function appendBatch(start, endExclusive) {
        var i;
        for (i = start; i < endExclusive; i++) {
          if (i >= allRepos.length) break;
          appendCard(allRepos[i]);
        }
      }
  
      function updateStatus() {
        if (!statusEl) return;
        var n = allRepos.length;
        var v = visibleCount;
        var parts = [];
        if (demoMode) {
          parts.push("Demo sample data (" + n + " repos — not from GitHub)");
        } else {
          parts.push(n + " public repo" + (n === 1 ? "" : "s"));
          if (n > PER_PAGE || lastApiPageCount > 1) {
            parts.push("GitHub API: " + lastApiPageCount + " page" + (lastApiPageCount === 1 ? "" : "s"));
          }
        }
        parts.push("showing " + v + " of " + n);
        parts.push("newest first");
        statusEl.textContent = parts.join(" · ");
      }
  
      function syncLoadMoreButton() {
        if (visibleCount >= allRepos.length) {
          actionsEl.hidden = true;
          loadMoreBtn.disabled = false;
          return;
        }
        if (allRepos.length <= INITIAL_VISIBLE) {
          actionsEl.hidden = true;
          return;
        }
        actionsEl.hidden = false;
        var next = Math.min(LOAD_MORE_STEP, allRepos.length - visibleCount);
        loadMoreBtn.textContent = "Load more (" + next + ")";
        loadMoreBtn.disabled = false;
      }
  
      function revealMore() {
        var nextEnd = Math.min(visibleCount + LOAD_MORE_STEP, allRepos.length);
        appendBatch(visibleCount, nextEnd);
        visibleCount = nextEnd;
        updateStatus();
        syncLoadMoreButton();
      }
  
      function bootstrap(repos, pageCount) {
        lastApiPageCount = pageCount || 1;
        sortRepos(repos);
        allRepos = repos;
        grid.innerHTML = "";
        visibleCount = 0;
        if (!allRepos.length) {
          if (statusEl) statusEl.textContent = "No public repositories found.";
          if (fallback) fallback.hidden = false;
          actionsEl.hidden = true;
          return;
        }
        if (fallback) fallback.hidden = true;
        var first = Math.min(INITIAL_VISIBLE, allRepos.length);
        appendBatch(0, first);
        visibleCount = first;
        updateStatus();
        syncLoadMoreButton();
      }
  
      loadMoreBtn.addEventListener("click", revealMore);
  
      var loadPromise = demoMode
        ? Promise.resolve({ repos: buildDemoRepos(), pageCount: 1 })
        : fetchAllRepos(GITHUB_USER);
  
      loadPromise
        .then(function (result) {
          bootstrap(result.repos, result.pageCount);
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent =
              "Could not load repositories (network or rate limit). Open GitHub directly:";
          }
          if (fallback) fallback.hidden = false;
          actionsEl.hidden = true;
        });
    })();
  })();
  