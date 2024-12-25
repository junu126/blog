import { motion } from "framer-motion";
import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { JSX } from "react";

interface Item {
  id: string;
  href: string;
  title: string;
}

interface Props {
  activeItem: Item | null;
  items: Item[];
}

export const LinkSegmentedControl = ({
  activeItem,
  items,
}: Props): JSX.Element => {
  return (
    <Box as="ol" display="inline-flex" margin={0} padding="3px">
      {items.map((item) => {
        const isActive = item.id === activeItem?.id;

        return (
          <motion.li
            whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
            key={item.title}
          >
            <Link href={item.href}>
              <Button
                color="black"
                variant="ghost"
                pos="relative"
                margin={0}
                height="28px"
                padding="0px 8px"
              >
                <Box pos="relative" zIndex={2}>
                  <Text
                    fontSize={14}
                    fontWeight={400}
                    color={isActive ? "rgb(48, 48, 48)" : "rgb(138, 138, 138)"}
                  >
                    {item.title}
                  </Text>
                </Box>
              </Button>
            </Link>
          </motion.li>
        );
      })}
    </Box>
  );
};
