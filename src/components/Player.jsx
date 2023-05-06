import { SunIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({
  activeSong,
  activeIndex,
  curPlayer,
  setActiveIndex,
  handleClickNext,
  handleClickPrev,
  isMobile,
  setIsModalOpen,
}) => {
  const { artist, duration, photo, title, url } = activeSong;

  return (
    <>
      {title ? (
        <Box w="100%" px={5}>
          <Flex flexDirection={"column"} alignItems={"flex-start"}>
            <Text fontWeight={"bolder"} color="#fff" fontSize="32px">
              {title}
            </Text>
            <Text color="#fff" fontSize="16px" opacity={0.6}>
              {artist}
            </Text>
            {isMobile && (
              <Button
                mt={4}
                variant={"outline"}
                color="#fff"
                onClick={() => setIsModalOpen(true)}
              >
                Select Song
              </Button>
            )}
          </Flex>

          <Image my={10} src={photo} />
          <AudioPlayer
            showSkipControls={true}
            onClickNext={() => handleClickNext()}
            onClickPrevious={() => handleClickPrev()}
            key={activeIndex}
            src={url}
            ref={curPlayer}
            autoPlay
            loop={false}
            showJumpControls={false}
            customIcons={{
              loop: <icon>...</icon>,
              loopOff: <icon>...</icon>,
            }}
            style={{ background: "transparent" }}
          />
        </Box>
      ) : (
        <Flex w="100%" color="#fff" fontSize={"2rem"} flexDirection={"column"}>
          Select a song to play
          {isMobile && (
            <Button mt={4} onClick={() => setIsModalOpen(true)}>
              Select Song
            </Button>
          )}
        </Flex>
      )}
    </>
  );
};

export default Player;
