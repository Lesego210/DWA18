// src/pages/ShowList.jsx
import React, { useEffect, useState } from 'react';
import { fetchShows } from '../services/api';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows()
      .then(response => {
        setShows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {shows.map(show => (
        <div key={show.id}>
          <h3>{show.title}</h3>
          {/* Display other show details */}
        </div>
      ))}
    </div>
  );
};

export default ShowList;
