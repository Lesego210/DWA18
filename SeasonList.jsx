// src/components/SeasonList.jsx
import React, { useState } from 'react';
import EpisodeList from './EpisodeList';

const SeasonList = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  return (
    <div>
      <h3>Seasons</h3>
      <ul>
        {seasons.map(season => (
          <li key={season.id} onClick={() => setSelectedSeason(season)}>
            {season.title}
          </li>
        ))}
      </ul>
      {selectedSeason && <EpisodeList episodes={selectedSeason.episodes} />}
    </div>
  );
};

export default SeasonList;
