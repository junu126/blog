"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

interface LightboxImageProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  imageClassName?: string;
}

export const LightboxImage = ({
  src,
  alt,
  width,
  className = "",
  imageClassName = "",
}: LightboxImageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    // 클라이언트 포털은 hydration이 끝난 뒤에만 생성합니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, isOpen]);

  const triggerStyle: CSSProperties | undefined = width ? { width } : undefined;
  const accessibleName = alt ? `${alt} 이미지 확대` : "이미지 확대";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={accessibleName}
        className={`group block w-fit max-w-full cursor-zoom-in border-0 bg-transparent p-0 text-left ${className}`}
        style={triggerStyle}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className={`m-0 block h-auto w-full max-w-full transition duration-300 ease-out group-hover:brightness-90 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-gray-900 ${imageClassName}`}
          loading="lazy"
        />
      </button>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt ? `${alt} 확대 이미지` : "확대 이미지"}
                className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={closeLightbox}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="확대 이미지 닫기"
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl font-light leading-none text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
                  onClick={closeLightbox}
                >
                  <span aria-hidden="true">×</span>
                </button>

                <motion.img
                  src={src}
                  alt={alt}
                  className="max-h-[calc(100dvh-3rem)] max-w-[calc(100vw-3rem)] select-none rounded-xl object-contain shadow-2xl sm:max-h-[calc(100dvh-5rem)] sm:max-w-[calc(100vw-5rem)]"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-medium text-white/75 shadow-lg backdrop-blur sm:bottom-6">
                  이미지를 다시 클릭하거나 ESC를 눌러 닫기
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};
