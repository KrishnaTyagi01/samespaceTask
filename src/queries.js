import { gql } from "@apollo/client";

export const GET_ALL_SONGS = gql`
  query getAllSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      duration
      photo
      title
      url
      artist
    }
  }
`;
