// src/pages/Favourites.jsx
import React, { useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(PodcastContext);

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map(fav => (
          <li key={fav.id}>
            {fav.title}
            <button onClick={() => removeFavourite(fav.id)}>Remove from Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
