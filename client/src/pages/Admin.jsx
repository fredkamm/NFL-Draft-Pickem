import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DRAFT_RESULT } from '../utils/mutations';

const Admin = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [picks, setPicks] = useState(Array(32).fill().map((_, i) => ({ pickNumber: i + 1, playerName: '', playerPosition: '', teamName: '' })));
  const [addDraftResult, { error }] = useMutation(ADD_DRAFT_RESULT);

  const handlePickChange = (pickNumber, field, value) => {
    const newPicks = picks.map((pick) => {
      if (pick.pickNumber === pickNumber) {
        return { ...pick, [field]: value };
      }
      return pick;
    });
    setPicks(newPicks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDraftResult({
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
      <label>
        Year:
        <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
      </label>
      {picks.map((pick) => (
        <div key={pick.pickNumber}>
          <span>{pick.pickNumber}.</span>
          <input
            type="text"
            placeholder="Player Name"
            value={pick.playerName}
            onChange={(e) => handlePickChange(pick.pickNumber, 'playerName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Player Position"
            value={pick.playerPosition}
            onChange={(e) => handlePickChange(pick.pickNumber, 'playerPosition', e.target.value)}
          />
          <input
            type="text"
            placeholder="Team Name"
            value={pick.teamName}
            onChange={(e) => handlePickChange(pick.pickNumber, 'teamName', e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
      {error && <p>Something went wrong...</p>}
    </form>
  );
};

export default Admin;