// src/pages/ShowDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../services/api';
import SeasonList from '../components/SeasonList';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowById(id)
      .then(response => {
        setShow(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching show:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {show && (
        <>
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <SeasonList seasons={show.seasons} />
        </>
      )}
    </div>
  );
};

export default ShowDetail;