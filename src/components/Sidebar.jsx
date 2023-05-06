import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Assets } from "../Assets";

const Sidebar = () => {
  const sidebarItems = [
    "For You",
    "Top Tracks",
    "Favourites",
    "Recently Played",
  ];
  const [activeKey, setActiveKey] = useState(0);

  return (
    <Flex h="100%" flexDirection={"column"} justifyContent={"space-between"}>
      <Box>
        <Image src={Assets.LogoIcon} />
        <Flex pl={2} mt={4} flexDirection={"column"} alignItems={"flex-start"}>
          {sidebarItems.map((item, ind) => (
            <Text
              onClick={() => setActiveKey(ind)}
              _hover={{ cursor: "pointer" }}
              pb={2}
              color="#FFFFFF"
              opacity={ind === activeKey ? 1 : 0.4}
            >
              {item}
            </Text>
          ))}
        </Flex>
      </Box>
      {/* <Box>
        <Image src={Assets.ProfileIcon} />
      </Box> */}
    </Flex>
  );
};

export default Sidebar;
