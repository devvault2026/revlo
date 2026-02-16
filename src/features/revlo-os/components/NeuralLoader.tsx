import React from 'react';

const NeuralLoader: React.FC = () => {
  return (
    <div className="neural-loader-wrapper relative">
      <style>{`
        .neural-container {
          position: relative;
          border-radius: 50%;
          height: 120px;
          width: 120px;
          animation: neural-rotate 1.5s linear infinite;
          background: linear-gradient(#9333ea, #3b82f6, #06b6d4);
        }

        .neural-container span {
          position: absolute;
          border-radius: 50%;
          height: 100%;
          width: 100%;
          background: linear-gradient(#9333ea, #3b82f6, #06b6d4);
        }

        .neural-container span:nth-of-type(1) { filter: blur(5px); }
        .neural-container span:nth-of-type(2) { filter: blur(10px); }
        .neural-container span:nth-of-type(3) { filter: blur(25px); }
        .neural-container span:nth-of-type(4) { filter: blur(50px); }

        .neural-container::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          background-color: #020408;
          border-radius: 50%;
          box-shadow: inset 0 0 20px rgba(147, 51, 234, 0.2);
        }

        @keyframes neural-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="neural-container">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default NeuralLoader;
