import React from 'react';

const ProgressBar = ({ color, width }) => {
    const getColor = () => {
        if (width >= 75) {
          return '#EF4444'; // Red
        } else if (width >= 50) {
          return '#FBBF24'; // Yellow
        } else if (width >= 25) {
          return '#3B82F6'; // Primary
        } else {
          return '#10B981'; // Green
        }
      };
  
    const containerStyles = {
        marginBottom: '6px',
        height: '5px',
        width: '100%',
        backgroundColor: '#e5e7eb', // Neutral background color
        borderRadius: '50px',
      };
    
      const barStyles = {
        height: '5px',
        backgroundColor: getColor(),
        width: `${width}%`,
        borderRadius: '50px',
      };

  return (
    <div   style={containerStyles}>
      <div  style={barStyles}></div>
    </div>
  );
};


const Progressbar = ({ progressBarWidth }) => {
    return (
      <div >
        <ProgressBar width={progressBarWidth} />
      </div>
    );
  };
  
  export default Progressbar;