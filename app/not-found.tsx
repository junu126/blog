import { InternalLink } from "@/components/ui/InternalLink";
import { Text, Box, Divider } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box gap="24px" display="flex" flexDir="column" className="w-full">
      <Box as="header">
        <Text as="h1" fontSize={22} fontWeight={600}>
          Page not found.
        </Text>
        <Text fontSize={13} fontWeight={300} lineHeight={2.2}>
          요청하신 페이지를 찾을 수 없습니다.
        </Text>
      </Box>
      <Divider opacity={1} bg="rgb(235, 235, 235)" />
      <InternalLink fontSize={14} href="/" width="fit-content">
        처음으로 돌아가기 {">"}
      </InternalLink>
    </Box>
  );
}
