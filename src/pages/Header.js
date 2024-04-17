import { Box, Flex, Heading } from "@chakra-ui/react";

export const Header = ({ data, count }) => {
  return (
    <Flex
      w={"100%"}
      justifyContent={"space-around"}
      alignItems={"center"}
      border={"1px solid RGBA(0, 0, 0, 0.24)"}
      borderRadius={"15px"}
      padding={"20px"}
      bgColor={"gray.700"}
    >
      <Heading color={"RGBA(255, 255, 255, 0.80)"} fontSize={"28px"}>
        Todo-List-Plus
      </Heading>
      <Box
        w={"100px"}
        h={"100px"}
        borderRadius={"50%"}
        textAlign={"center"}
        lineHeight={"100px"}
        fontSize={"25px"}
        fontWeight={600}
        bgColor={"cyan.700"}
        boxSizing={"border-box"}
        color={"RGBA(255, 255, 255, 0.80)"}
      >
        {data.length === 0 ? "0" : `${count.length}/${data.length}`}
      </Box>
    </Flex>
  );
};
