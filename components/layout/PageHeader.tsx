import { Box, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

PageHeader.Text = PageHeaderText;
export function PageHeader({ title, description, children }: Props) {
  return (
    <Box as="header" className="w-full flex flex-col gap-8">
      <Box className="flex flex-col gap-2">
        <Heading size="sm">{title}</Heading>
        <Text fontSize={15} fontWeight={300}>
          {description}
        </Text>
      </Box>
      {children}
    </Box>
  );
}

function PageHeaderText(props: { children: ReactNode; bold?: boolean }) {
  const { children, bold } = props;

  return (
    <Text fontSize={15} fontWeight={bold ? 700 : 300}>
      {children}
    </Text>
  );
}
