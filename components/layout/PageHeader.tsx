import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

PageHeader.Text = PageHeaderText;
export function PageHeader({ title, description, children }: Props) {
  return (
    <Box as="header" className="w-full flex flex-col gap-8">
      <Box className="flex flex-col gap-2">
        <Heading size="sm">{title}</Heading>
        <Text fontSize={14} fontWeight={300}>
          {description}
        </Text>
      </Box>
      {children}
      <Divider variant="dashed" />
    </Box>
  );
}

function PageHeaderText(props: {
  children: ReactNode;
  size?: "default" | "small";
  bold?: boolean;
}) {
  const { children, size = "default", bold } = props;

  return (
    <Text fontSize={size === "default" ? 15 : 13} fontWeight={bold ? 700 : 300}>
      {children}
    </Text>
  );
}
