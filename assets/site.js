(() => {
  const root = document.documentElement;
  const key = "jk-apps-theme";
  let theme = root.dataset.theme || "arcade";

  try {
    const saved = localStorage.getItem(key);
    if (saved === "studio" || saved === "arcade") theme = saved;
  } catch {}

  function apply(next, save) {
    theme = next;
    root.classList.add("theme-switching");
    root.classList.add("js-ready");
    root.dataset.theme = theme;

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(theme === "studio"));
      const state = button.querySelector(".theme-state");
      if (state) state.textContent = theme === "studio" ? "On" : "Off";
    });

    void root.offsetHeight;
    requestAnimationFrame(() => root.classList.remove("theme-switching"));

    if (save) {
      try {
        localStorage.setItem(key, theme);
      } catch {}
    }
  }

  apply(theme, false);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      apply(theme === "arcade" ? "studio" : "arcade", true);
    });
  });
})();
