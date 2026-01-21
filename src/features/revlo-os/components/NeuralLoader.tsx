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
          background: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
        }

        .neural-container span {
          position: absolute;
          border-radius: 50%;
          height: 100%;
          width: 100%;
          background: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
        }

        .neural-container span:nth-of-type(1) { filter: blur(5px); }
        .neural-container span:nth-of-type(2) { filter: blur(10px); }
        .neural-container span:nth-of-type(3) { filter: blur(25px); }
        .neural-container span:nth-of-type(4) { filter: blur(50px); }

        .neural-container::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          background-color: #fff;
          border: solid 4px #ffffff;
          border-radius: 50%;
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
