import React from 'react';
import { GameStatusType } from '../App';

type Props = {
  status: GameStatusType;
  onStart: () => void; // VoidFunction でも可
  onRestart: () => void;
};

const Button: React.FC<Props> = ({ status, onStart, onRestart }) => {
  return (
    <div className="button">
      {status === 'gameover' ? <button onClick={onRestart}>gameover</button> : <button onClick={onStart}>start</button>}
    </div>
  );
};

export default Button;
