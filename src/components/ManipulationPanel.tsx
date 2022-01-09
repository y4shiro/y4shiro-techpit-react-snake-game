import React from 'react';
import { DirectionType } from '../App';

type Props = {
  onChange: (newDirection: DirectionType) => DirectionType | undefined;
};

const ManipulationPanel: React.FC<Props> = ({ onChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const onUp = () => onChange('up');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const onRight = () => onChange('right');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const onLeft = () => onChange('left');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const onDown = () => onChange('down');

  return (
    <div className="manipulation-panel">
      <button onClick={onLeft}>←</button>
      <button onClick={onUp}>↑</button>
      <button onClick={onDown}>↓</button>
      <button onClick={onRight}>→</button>
    </div>
  );
};

export default ManipulationPanel;
