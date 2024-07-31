import React from 'react';
import ClearSessionData from './ClearSessionData';
import Episodes from './Episodes';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Podcast App</h1>
    </header>
    <ClearSessionData />
    {/* Example usage of Episodes component */}
    <Episodes podcastId="your_podcast_id_here" selectedSeason={0} />
  </div>
);

export default App;




