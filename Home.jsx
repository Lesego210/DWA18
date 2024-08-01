// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const genreMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const Home = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const sortedShows = [...shows].sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const filteredShows = sortedShows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search shows..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => handleSort('A-Z')}>Sort A-Z</button>
        <button onClick={() => handleSort('Z-A')}>Sort Z-A</button>
      </div>
      <ul>
        {filteredShows.map(show => (
          <li key={show.id}>
            <Link to={`/show/${show.id}`}>
              <h2>{show.title}</h2>
              <p>Genres: {show.genres.map(genre => genreMapping[genre]).join(', ')}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
