(() => {
  const btn = document.getElementById("plant-btn");
  const modal = document.getElementById("shows-modal");
  if (!btn || !modal) return;

  const closeEls = modal.querySelectorAll("[data-close]");
  let busy = false;
  let lastFocus = null;

  const openModal = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal__close");
    closeBtn?.focus();
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
    // restart CSS animation
    void btn.offsetWidth;
    btn.classList.add("is-watering");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 120 : 1450;
    window.setTimeout(() => {
      openModal();
    }, delay);
  };

  btn.addEventListener("click", waterThenOpen);

  closeEls.forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
})();
