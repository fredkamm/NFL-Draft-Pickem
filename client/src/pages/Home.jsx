import React from 'react';
import DraftBoard from '../components/Draftboard';

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h1>NFL Draft {currentYear}</h1>
      <DraftBoard year={currentYear} />
    </div>
  );
};

export default Home;