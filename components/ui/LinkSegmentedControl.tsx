import { motion } from "framer-motion";
import Link from "next/link";
interface Item {
  id: string;
  href: string;
  title: string;
}
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
        <motion.li
          key={item.id}
          whileTap={
            item.id === activeItem?.id ? { scale: 0.95 } : { opacity: 0.6 }
          }
        >
          <Link
            href={item.href}
            aria-current={item.id === activeItem?.id ? "page" : undefined}
          >
            {item.title}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
