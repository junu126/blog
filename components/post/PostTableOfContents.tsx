"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import styles from "./PostTableOfContents.module.css";

interface Props {
  articleId: string;
}

interface Heading {
  id: string;
  level: number;
  text: string;
}

const OPEN_THRESHOLD = 0.82;
const CLOSE_THRESHOLD = 0.28;

function getProximity(pointerX: number, pointerY: number) {
  const anchorY = window.innerHeight * 0.48;
  const distance = Math.hypot(Math.max(pointerX - 8, 0), pointerY - anchorY);

  // 먼 구간에서는 잔잔하게, 마지막 100px 안에서 물방울처럼 빠르게 팽창한다.
  return 1 / (1 + Math.exp((distance - 92) / 15));
}

export function PostTableOfContents({ articleId }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchOpen, setIsTouchOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const proximity = useMotionValue(0);
  const spring = useSpring(proximity, {
    stiffness: reducedMotion ? 1000 : 360,
    damping: reducedMotion ? 100 : 28,
    mass: 0.72,
  });

  const width = useTransform(spring, [0, 0.5, 0.8, 1], [12, 18, 80, 284]);
  const height = useTransform(spring, [0, 0.5, 0.8, 1], [64, 82, 150, 430]);
  const borderRadius = useTransform(
    spring,
    [0, 0.72, 1],
    ["0 999px 999px 0", "0 58% 58% 0", "0 28px 28px 0"],
  );
  const contentOpacity = useTransform(spring, [0.79, 0.92], [0, 1]);
  const contentX = useTransform(spring, [0.79, 1], [-18, 0]);

  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) {
      return;
    }

    const elements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h1[id], h2[id], h3[id]"),
    );
    const nextHeadings = elements
      .map(({ id, tagName, textContent }) => ({
        id,
        level: Number(tagName.slice(1)),
        text: textContent?.trim() ?? "",
      }))
      .filter(({ text }) => text.length > 0);

    setHeadings(nextHeadings);

    let frame = 0;
    const updateActiveHeading = () => {
      frame = 0;
      const current = [...elements]
        .reverse()
        .find((heading) => heading.getBoundingClientRect().top <= 140);
      setActiveId(current?.id ?? elements[0]?.id ?? "");
    };
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveHeading);
      }
    };

    updateActiveHeading();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [articleId]);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    let frame = 0;
    let pointerX = -1000;
    let pointerY = -1000;

    const update = () => {
      frame = 0;
      const panel = panelRef.current;
      const inOpenPanelZone =
        openRef.current &&
        panel &&
        pointerX <= panel.getBoundingClientRect().right + 36 &&
        pointerY >= panel.getBoundingClientRect().top - 36 &&
        pointerY <= panel.getBoundingClientRect().bottom + 36;
      const next = inOpenPanelZone ? 1 : getProximity(pointerX, pointerY);

      proximity.set(reducedMotion ? (next >= OPEN_THRESHOLD ? 1 : 0) : next);

      if (!openRef.current && next >= OPEN_THRESHOLD) {
        openRef.current = true;
        setIsOpen(true);
      } else if (openRef.current && next < CLOSE_THRESHOLD) {
        openRef.current = false;
        setIsOpen(false);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    const onPointerLeave = () => {
      proximity.set(0);
      openRef.current = false;
      setIsOpen(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onPointerLeave,
      );
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [proximity, reducedMotion]);

  useEffect(() => {
    if (!isTouchOpen) {
      return;
    }

    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") {
        return;
      }
      if (
        event instanceof PointerEvent &&
        panelRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setIsTouchOpen(false);
    };

    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [isTouchOpen]);

  if (headings.length < 2) {
    return null;
  }

  const expanded = isOpen || isTouchOpen;
  const minLevel = Math.min(...headings.map(({ level }) => level));

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setIsTouchOpen(false);
  };

  return (
    <motion.nav
      ref={panelRef}
      aria-label="글 목차"
      aria-expanded={expanded}
      className={`${styles.shell} ${isTouchOpen ? styles.touchOpen : ""}`}
      style={{
        width: isTouchOpen ? 284 : width,
        height: isTouchOpen ? 430 : height,
        borderRadius: isTouchOpen ? "0 28px 28px 0" : borderRadius,
      }}
    >
      <button
        type="button"
        className={styles.touchTrigger}
        aria-label={isTouchOpen ? "목차 닫기" : "목차 열기"}
        aria-expanded={isTouchOpen}
        onClick={() => setIsTouchOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <motion.div
        aria-hidden={!expanded}
        className={styles.content}
        style={{
          opacity: isTouchOpen ? 1 : contentOpacity,
          x: isTouchOpen ? 0 : contentX,
          pointerEvents: expanded ? "auto" : "none",
        }}
      >
        <div className={styles.eyebrow}>
          <span>목차</span>
          <span className={styles.progress} aria-hidden="true" />
        </div>
        <ol className={styles.list}>
          {headings.map((heading) => {
            const active = activeId === heading.id;
            return (
              <li
                key={heading.id}
                className={styles.item}
                style={
                  { "--depth": heading.level - minLevel } as React.CSSProperties
                }
              >
                <a
                  href={`#${heading.id}`}
                  className={styles.link}
                  aria-current={active ? "location" : undefined}
                  tabIndex={expanded ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(heading.id);
                  }}
                >
                  <span className={styles.marker} aria-hidden="true" />
                  <span>{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </motion.nav>
  );
}
