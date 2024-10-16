// ContestCard.js
import React from 'react';

const ContestCard = ({ contest }) => {
  const calculateStartsIn = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start - now; // difference in milliseconds
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // convert to hours
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

    if (diffMs > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return "Started";
    }
  };

  return (
    <tr>
      <td>{new Date(contest.start).toLocaleString()}</td>
      <td>{calculateStartsIn(contest.start)}</td>
      <td>{Math.round(contest.duration / 3600)} hours</td>
      <td>
        <a href={contest.href} target="_blank" rel="noopener noreferrer">
          {contest.event}
        </a>
      </td>
    </tr>
  );
};

export default ContestCard;
