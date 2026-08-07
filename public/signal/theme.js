(function () {
  var KEY = "otx-theme";
  var LEGACY_KEY = "otx-redesign-theme";
  var LABELS = { dark: "Dark", light: "Light", auto: "Auto" };

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function parsePreference(value) {
    if (value === "light" || value === "dark" || value === "auto") return value;
    return "auto";
  }

  function loadPreference() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === null || stored === "") {
        var legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy === "light" || legacy === "dark") return legacy;
        return "auto";
      }
      return parsePreference(stored);
    } catch (_) {
      return "auto";
    }
  }

  function storePreference(preference) {
    try {
      if (preference === "auto") localStorage.setItem(KEY, "");
      else localStorage.setItem(KEY, preference);
      localStorage.removeItem(LEGACY_KEY);
    } catch (_) {}
  }

  function resolve(preference) {
    return preference === "auto" ? systemTheme() : preference;
  }

  function iconSource(preference) {
    var tmpl = document.getElementById("otx-theme-icons");
    if (!tmpl) return null;
    return tmpl.content.querySelector("." + preference);
  }

  function fillIcon(target, preference) {
    var source = iconSource(preference);
    if (!target || !source) return;
    target.replaceChildren.apply(target, source.cloneNode(true).childNodes);
  }

  function syncLogos(theme) {
    document.querySelectorAll("[data-logo]").forEach(function (img) {
      var darkSrc = img.getAttribute("data-logo-dark");
      var lightSrc = img.getAttribute("data-logo-light");
      if (!darkSrc || !lightSrc) return;
      img.src = theme === "dark" ? darkSrc : lightSrc;
    });
  }

  function syncIcons(preference) {
    document.querySelectorAll("[data-theme-icon]").forEach(function (icon) {
      fillIcon(icon, preference);
    });
    document.querySelectorAll("[data-theme-option-icon]").forEach(function (icon) {
      fillIcon(icon, icon.getAttribute("data-theme-option-icon"));
    });
  }

  function optionList(root) {
    return Array.prototype.slice.call(root.querySelectorAll("[data-theme-option]"));
  }

  function focusOption(root, index) {
    var options = optionList(root);
    if (!options.length) return;
    var next = ((index % options.length) + options.length) % options.length;
    options[next].focus();
  }

  function setMenuOpen(root, open, focusTarget) {
    var button = root.querySelector("[data-theme-button]");
    var menu = root.querySelector("[data-theme-menu]");
    if (!button || !menu) return;
    button.setAttribute("aria-expanded", open ? "true" : "false");
    menu.hidden = !open;
    root.classList.toggle("is-open", open);
    if (open) {
      var selected = root.querySelector('[data-theme-option][aria-selected="true"]');
      var options = optionList(root);
      var target = focusTarget || selected || options[0];
      if (target) target.focus();
    } else if (document.activeElement && root.contains(document.activeElement)) {
      button.focus();
    }
  }

  function closeAllMenus(except) {
    document.querySelectorAll("[data-theme-root]").forEach(function (root) {
      if (except && root === except) return;
      setMenuOpen(root, false);
    });
  }

  function syncControls(preference) {
    document.querySelectorAll("[data-theme-root]").forEach(function (root) {
      var label = root.querySelector("[data-theme-label]");
      if (label) label.textContent = LABELS[preference] || LABELS.auto;

      root.querySelectorAll("[data-theme-option]").forEach(function (option) {
        var selected = option.getAttribute("data-value") === preference;
        option.setAttribute("aria-selected", selected ? "true" : "false");
        option.classList.toggle("is-active", selected);
      });
    });
    syncIcons(preference);
  }

  function apply(preference) {
    preference = parsePreference(preference);
    var theme = resolve(preference);
    document.documentElement.dataset.theme = theme;
    storePreference(preference);
    syncLogos(theme);
    syncControls(preference);
  }

  window.otxTheme = {
    apply: apply,
    preference: loadPreference,
    resolved: function () {
      return resolve(loadPreference());
    },
  };

  apply(loadPreference());

  document.addEventListener("click", function (event) {
    var option = event.target.closest("[data-theme-option]");
    if (option) {
      apply(option.getAttribute("data-value"));
      closeAllMenus();
      return;
    }

    var button = event.target.closest("[data-theme-button]");
    if (button) {
      var root = button.closest("[data-theme-root]");
      if (!root) return;
      var open = button.getAttribute("aria-expanded") !== "true";
      closeAllMenus();
      if (open) setMenuOpen(root, true);
      return;
    }

    if (!event.target.closest("[data-theme-root]")) closeAllMenus();
  });

  document.addEventListener("keydown", function (event) {
    var option = event.target.closest("[data-theme-option]");
    if (option) {
      var root = option.closest("[data-theme-root]");
      if (!root) return;
      var options = optionList(root);
      var index = options.indexOf(option);
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        focusOption(root, index + 1);
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        focusOption(root, index - 1);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusOption(root, 0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        focusOption(root, options.length - 1);
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        apply(option.getAttribute("data-value"));
        closeAllMenus();
        return;
      }
      if (event.key === "Escape" || event.key === "Tab") {
        closeAllMenus();
        return;
      }
    }

    var button = event.target.closest("[data-theme-button]");
    if (button && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
      var menuRoot = button.closest("[data-theme-root]");
      if (!menuRoot) return;
      if (button.getAttribute("aria-expanded") === "true") return;
      event.preventDefault();
      closeAllMenus(menuRoot);
      setMenuOpen(menuRoot, true);
      return;
    }

    if (event.key === "Escape") closeAllMenus();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (loadPreference() !== "auto") return;
    apply("auto");
  });
})();
