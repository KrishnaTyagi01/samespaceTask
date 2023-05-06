import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Assets } from "../Assets";
import Song from "./Song";
import { useQuery } from "@apollo/client";
import { GET_ALL_SONGS } from "../queries";

const List = ({
  loading,
  songs,
  activeIndex,
  setActiveIndex,
  handleSearch,
  handleSongChange,
  setIsModalOpen,
  isMobile,
}) => {
  if (loading) {
    return <Text color="#fff">Loading...</Text>;
  }

  return (
    <Flex
      w={"100%"}
      h="100%"
      flexDirection={"column"}
      alignItems={"flex-start"}
    >
      <Heading fontSize="32px" as={"h4"} color="#FFFFFF" mb={4}>
        For You
      </Heading>
      <InputGroup width={"25rem"} mb={4}>
        <Input
          color="#fff"
          placeholder="Search Song, Artist"
          onChange={(e) => handleSearch(e)}
        />
        <InputRightElement children={<SearchIcon color="#fff" />} />
      </InputGroup>

      <Box
        width={"25rem"}
        h="70%"
        overflowY={"scroll"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "8px",
            backgroundColor: `
          rgba(0,0,0,0.6)`,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `
          #627EEA`,
          },
        }}
      >
        {!loading &&
          songs.map((song, ind) => (
            <Box
              onClick={() => {
                handleSongChange(ind, song);
                if (isMobile) {
                  setIsModalOpen(false);
                }
              }}
              _hover={{ cursor: "pointer" }}
              key={ind}
              my={5}
              py={1}
              borderRadius={"8px"}
              background={activeIndex === ind && "rgba(255, 255, 255, 0.08)"}
            >
              <Song value={song} />
            </Box>
          ))}
      </Box>
    </Flex>
  );
};

export default List;
