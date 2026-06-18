import React from 'react';

const StarRating = ({ rating, size = 14 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half = !filled && i - 0.5 <= rating;
    stars.push(
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none">
        {half ? (
          <>
            <defs>
              <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#c9a84c"/>
                <stop offset="50%" stopColor="#2a2a2a"/>
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={`url(#half-${i})`}
              stroke="#c9a84c"
              strokeWidth="1"
            />
          </>
        ) : (
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={filled ? '#c9a84c' : '#2a2a2a'}
            stroke={filled ? '#c9a84c' : '#333'}
            strokeWidth="1"
          />
        )}
      </svg>
    );
  }
  return (
    <div className="flex items-center gap-0.5">
      {stars}
      <span className="ml-1.5 text-xs" style={{ color: '#888' }}>{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
