import { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Error from './Error.jsx';
import { Card, CardContent, CardHeader, Button, Typography, Skeleton } from '@mui/material';
import FavoriteEpisodes from './FavoriteEpisodes.jsx';
import { v4 as uuidv4 } from 'uuid';

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <Card variant="outlined">
    <CardHeader>
      <Skeleton animation="wave" variant="text" />
    </CardHeader>
    <CardContent>
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
    </CardContent>
  </Card>
);

// Main Episodes Component
const Episodes = ({ podcastId, selectedSeason }) => {
  const apiUrl = `https://podcast-api.netlify.app/id/${podcastId}`;
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [disabledEpisodes, setDisabledEpisodes] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [displayedEpisodesCount, setDisplayedEpisodesCount] = useState(4);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPodcastData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (audioRef.current && !audioRef.current.paused) {
        e.preventDefault();
        e.returnValue = ''; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const savedState = JSON.parse(localStorage.getItem('lastPlayedEpisode'));
      if (savedState && savedState.episodeId === currentAudio?.id) {
        audioRef.current.currentTime = savedState.timestamp;
      }

      const handleTimeUpdate = () => {
        localStorage.setItem('lastPlayedEpisode', JSON.stringify({
          episodeId: currentAudio?.id,
          timestamp: audioRef.current.currentTime,
        }));
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentAudio]);

  const isEpisodeFavorite = useCallback((episodeId) => {
    return favoriteEpisodes.some(episode => episode.id === episodeId);
  }, [favoriteEpisodes]);

  const handleAddToFavorites = useCallback((seasonId, episode) => {
    const episodeId = uuidv4();
    if (!isEpisodeFavorite(episodeId)) {
      setFavoriteEpisodes(prevEpisodes => [...prevEpisodes, { ...episode, id: episodeId }]);
      setDisabledEpisodes(prevDisabled => [...prevDisabled, episodeId]);
    }
  }, [isEpisodeFavorite]);

  const handleRemoveFromFavorites = useCallback((episodeId) => {
    setFavoriteEpisodes(prevEpisodes => prevEpisodes.filter(episode => episode.id !== episodeId));
    setDisabledEpisodes(prevDisabled => prevDisabled.filter(id => id !== episodeId));
  }, []);

  const showMoreEpisodes = () => {
    setDisplayedEpisodesCount(prevCount => prevCount + 4);
  };

  if (error) return <Error />;

  return (
    <>
      <div id='seasons'>
        {podcastData && podcastData.seasons.map((season) => (
          <div key={season.season} style={{ marginBottom: '10px' }}>
            <Card variant="outlined" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
              <CardHeader title={season.title} />
              <CardContent>
                <div style={{ display: 'flex', overflowX: 'auto', padding: '10px', gap: '10px' }}>
                  {season.episodes.slice(0, displayedEpisodesCount).map((episode) => (
                    <Card key={episode.id} variant="outlined" style={{ minWidth: '200px', color: 'black', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                      <CardContent>
                        <Typography variant="h6">{episode.title}</Typography>
                        <Typography variant="body1">{episode.description}</Typography>
                        <Typography variant="body2">Episode: {episode.episode}</Typography>
                        <audio controls ref={audioRef} onPlay={() => setCurrentAudio(episode)}>
                          <source src={episode.file} type="audio/mp3" />
                          Your browser does not support the audio tag.
                        </audio>
                        <Button
                          onClick={() => { handleAddToFavorites(season.season, episode);
                            alert("Added to favorites");
                          }}
                          variant="contained"
                          color={isEpisodeFavorite(`${season.season}-${episode.id}`) ? 'secondary' : 'primary'}
                          disabled={disabledEpisodes.includes(`${season.season}-${episode.id}`)}
                        >
                          {isEpisodeFavorite(`${season.season}-${episode.id}`) ? 'Remove from favorites' : 'Add to favorites'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {season.episodes.length > displayedEpisodesCount && (
                  <Button onClick={showMoreEpisodes} variant="outlined" style={{ marginTop: '10px' }}>
                    Show More
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {loading && <LoadingSkeleton />}
      {favoriteEpisodes.length > 0 && (
        <FavoriteEpisodes
          episodes={favoriteEpisodes}
          removeFromFavorites={handleRemoveFromFavorites}
        />
      )}
    </>
  );
};

Episodes.propTypes = {
  podcastId: PropTypes.string.isRequired,
  selectedSeason: PropTypes.string.isRequired,
};

export default Episodes;
