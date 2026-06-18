import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div
        className={`${sizes[size]} border-2 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'transparent' }}
      >
        <div
          className="w-full h-full border-2 border-transparent rounded-full animate-spin"
          style={{
            borderColor: 'transparent',
            borderTopColor: '#c9a84c',
            animationDirection: 'reverse',
            animationDuration: '0.7s',
          }}
        />
      </div>
      {text && (
        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#555' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
