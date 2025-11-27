import { RefObject, useEffect } from "react";

export default function useOutsideClose<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClose: () => void,
  closeOnScroll = false
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    }

    function handleScroll() {
      if (closeOnScroll) onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    if (closeOnScroll) window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeOnScroll)
        window.removeEventListener("scroll", handleScroll, true);
    };
  }, [ref, onClose, closeOnScroll]);
}
