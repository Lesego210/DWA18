// src/context/PodcastContext.jsx
import React, { createContext, useState } from 'react';

export const PodcastContext = createContext();

const PodcastProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (episode) => {
    setFavourites([...favourites, episode]);
  };

  const removeFavourite = (episodeId) => {
    setFavourites(favourites.filter(episode => episode.id !== episodeId));
  };

  return (
    <PodcastContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </PodcastContext.Provider>
  );
};

export default PodcastProvider;
