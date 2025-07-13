import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

const Entries = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <h2>My Entries</h2>
      <ul>
        {userData.entries &&
          userData.entries.map((entry) => (
            <li key={entry._id}>
              <Link to={`/entry/${entry._id}`}>
                {entry.year} Draft
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Entries;