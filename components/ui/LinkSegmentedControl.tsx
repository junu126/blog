import { motion } from "framer-motion";
import Link from "next/link";
interface Item {
  id: string;
  href: string;
  title: string;
}
const MotionLink = motion.create(Link);
export function LinkSegmentedControl({
  activeItem,
  items,
}: {
  activeItem: Item | null;
  items: Item[];
}) {
  return (
    <ul className="nav-links">
      {items.map((item) => (
        <li key={item.id}>
          <MotionLink
            href={item.href}
            aria-current={item.id === activeItem?.id ? "page" : undefined}
            whileTap={
              item.id === activeItem?.id ? { scale: 0.95 } : { opacity: 0.6 }
            }
          >
            {item.title}
          </MotionLink>
        </li>
      ))}
    </ul>
  );
}
