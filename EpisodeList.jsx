// src/components/EpisodeList.jsx
import React, { useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import AudioPlayer from './AudioPlayer';

const EpisodeList = ({ episodes }) => {
  const { favourites, addFavourite, removeFavourite } = useContext(PodcastContext);

  const isFavourite = (episode) => {
    return favourites.some(fav => fav.id === episode.id);
  };

  return (
    <div>
      <h4>Episodes</h4>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <h5>{episode.title}</h5>
            <AudioPlayer src={episode.audio} />
            {isFavourite(episode) ? (
              <button onClick={() => removeFavourite(episode.id)}>Remove from Favourites</button>
            ) : (
              <button onClick={() => addFavourite(episode)}>Add to Favourites</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
