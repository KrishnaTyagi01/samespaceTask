import React from "react";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Assets } from "../Assets";

const Song = ({ value }) => {
  const { artist, duration, photo, title } = value;

  return (
    <Flex minW="100%" alignItems={"center"} px="10px">
      {/* <Avatar  size="md" src={photo} pr="16px" /> */}
      <Image
        src={photo}
        fit={"contain"}
        rounded="full"
        h="40px"
        w="40px"
        mr="16px"
      />
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"}>
          <Text fontSize={"18px"} color="#fff">
            {title}
          </Text>
          <Text fontSize={"14px"} color="#fff" opacity={0.6}>
            {artist}
          </Text>
        </Flex>
        <Text color="#fff" opacity={0.6}>
          {JSON.stringify(duration)[0] +
            ":" +
            JSON.stringify(duration).slice(1)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Song;
