import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ENTRY } from '../../utils/mutations';

const DraftBoard = ({ year }) => {
  const [picks, setPicks] = useState(Array(32).fill().map((_, i) => ({ pickNumber: i + 1, playerName: '' })));
  const [addEntry, { error }] = useMutation(ADD_ENTRY);

  const handlePickChange = (pickNumber, playerName) => {
    const newPicks = picks.map((pick) => {
      if (pick.pickNumber === pickNumber) {
        return { ...pick, playerName };
      }
      return pick;
    });
    setPicks(newPicks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addEntry({
        variables: {
          year,
          picks,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {picks.map((pick) => (
        <div key={pick.pickNumber}>
          <span>{pick.pickNumber}.</span>
          <img src={`/src/assets/images/${pick.pickNumber}.png`} alt={`Team logo for pick ${pick.pickNumber}`} />
          <input
            type="text"
            value={pick.playerName}
            onChange={(e) => handlePickChange(pick.pickNumber, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
      {error && <p>Something went wrong...</p>}
    </form>
  );
};

export default DraftBoard;
