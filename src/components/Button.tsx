import React from 'react';

type Props = {
  onStart: () => void; // VoidFunction でも可
};

const Button: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="button">
      <button onClick={onStart}>start</button>
    </div>
  );
};

export default Button;
