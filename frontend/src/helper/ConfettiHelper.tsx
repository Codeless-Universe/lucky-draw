import confetti from "canvas-confetti";

export const ConfettiHelper = {
  showConfetti: (dom: Element | null | undefined) => {
    if (!dom) {
      return;
    }
    const domRect = dom.getBoundingClientRect();
    confetti({
      origin: {
        x: (domRect.x + domRect.width / 2) / innerWidth,
        y: (domRect.y + domRect.height / 2) / innerHeight,
      },
    });
  },
};
