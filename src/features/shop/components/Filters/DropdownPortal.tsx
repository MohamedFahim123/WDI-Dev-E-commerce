"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type DropdownPortalProps = {
  anchorRect: DOMRect | null;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const DropdownPortal = ({
  anchorRect,
  open,
  onClose,
  children,
}: DropdownPortalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      onClose();
    };

    const handleResize = () => {
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !anchorRect) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className="fixed z-50"
        style={{
          left: anchorRect.left,
          top: anchorRect.bottom + 4,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};
