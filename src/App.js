import "./App.css";
import {
  Box,
  Center,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import List from "./components/List";
import Player from "./components/Player";

import React, { useState, useEffect, useRef } from "react";

import { useQuery } from "@apollo/client";
import { GET_ALL_SONGS } from "./queries";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const curPlayer = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [songs, setSongs] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_SONGS, {
    variables: { playlistId: 1 },
  });
  const [activeSong, setActiveSong] = useState({});

  const handleSearch = (e) => {
    const searchVal = e.target.value.toLowerCase();
    const songArr = !loading ? data.getSongs : [];

    const filterdSongs = songArr.filter(
      (val) =>
        val.artist.toLowerCase().includes(searchVal) ||
        val.title.toLowerCase().includes(searchVal)
    );

    setSongs(filterdSongs);
  };

  const handleSongChange = (index, song) => {
    setActiveSong(song);
    setActiveIndex(index);
  };

  const handleClickNext = () => {
    if (activeIndex < songs.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      setActiveSong(songs[newIndex]);
    }
  };

  const handleClickPrev = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      setActiveSong(songs[newIndex]);
    }
  };

  useEffect(() => {
    if (!loading) {
      setSongs(data.getSongs);
    }
  }, [loading, data]);
  return (
    <Box minH="100vh" opacity={"0.9"} background="#0B0819" className="App">
      {!isMobile ? (
        <SimpleGrid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          h="100%"
          p={5}
          columns={{ sm: 1, md: 3 }}
          px={10}
        >
          <GridItem h="100%">
            <Sidebar />
          </GridItem>
          <GridItem h="100%">
            <List
              songs={songs}
              setSongs={setSongs}
              loading={loading}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              handleSearch={handleSearch}
              handleSongChange={handleSongChange}
            />
          </GridItem>
          <GridItem>
            <Player
              setIsModalOpen={setIsModalOpen}
              isMobile={isMobile}
              activeSong={activeSong}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              curPlayer={curPlayer}
              handleClickNext={handleClickNext}
              handleClickPrev={handleClickPrev}
            />
          </GridItem>
        </SimpleGrid>
      ) : (
        <Box>
          <Modal
            background="#0B0819"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent px={4} background="#0B0819">
              <List
                isMobile={isMobile}
                setIsModalOpen={setIsModalOpen}
                songs={songs}
                setSongs={setSongs}
                loading={loading}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                handleSearch={handleSearch}
                handleSongChange={handleSongChange}
              />
            </ModalContent>
          </Modal>
          <Player
            isMobile={isMobile}
            setIsModalOpen={setIsModalOpen}
            activeSong={activeSong}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            curPlayer={curPlayer}
            handleClickNext={handleClickNext}
            handleClickPrev={handleClickPrev}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
