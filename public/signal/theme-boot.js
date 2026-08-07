(function () {
  try {
    var KEY = "otx-theme";
    var LEGACY_KEY = "otx-redesign-theme";
    var stored = localStorage.getItem(KEY);
    if (stored === null || stored === "") {
      var legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === "light" || legacy === "dark") stored = legacy;
      else stored = "auto";
    }
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
