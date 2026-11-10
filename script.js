(() => {
  const btn = document.getElementById("plant-btn");
  const modal = document.getElementById("site-modal");
  if (!btn || !modal) return;

  const closeEls = modal.querySelectorAll("[data-close]");
  const navBtns = modal.querySelectorAll("[data-panel]");
  const panels = modal.querySelectorAll("[data-panel-id]");
  let busy = false;
  let lastFocus = null;

  const setPanel = (id) => {
    navBtns.forEach((el) => {
      const active = el.dataset.panel === id;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      const active = panel.dataset.panelId === id;
      panel.hidden = !active;
    });
  };

  const openModal = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setPanel("merch");
    modal.querySelector(".site-nav__btn.is-active")?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    busy = false;
    btn.classList.remove("is-watering");
    btn.disabled = false;
    (lastFocus || btn).focus?.();
  };

  const waterThenOpen = () => {
    if (busy || !modal.hidden) return;
    busy = true;
    btn.disabled = true;
    btn.classList.remove("is-watering");
    void btn.offsetWidth;
    btn.classList.add("is-watering");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 120 : 2600;
    window.setTimeout(openModal, delay);
  };

  btn.addEventListener("click", waterThenOpen);
  closeEls.forEach((el) => el.addEventListener("click", closeModal));
  navBtns.forEach((el) => {
    el.addEventListener("click", () => setPanel(el.dataset.panel));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || modal.hidden) return;
    const poster = document.getElementById("poster-modal");
    if (poster && !poster.hidden) return;
    closeModal();
  });
})();

(() => {
  const modal = document.getElementById("poster-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal__close");
  const closeEls = modal.querySelectorAll("[data-poster-close]");

  const isPastShow = () => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    return today > "2026-11-13";
  };

  const openModal = () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    const site = document.getElementById("site-modal");
    if (!site || site.hidden) document.body.style.overflow = "";
  };

  closeEls.forEach((el) => el.addEventListener("click", closeModal));
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || modal.hidden) return;
    event.preventDefault();
    closeBtn?.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  if (!isPastShow()) openModal();
})();
