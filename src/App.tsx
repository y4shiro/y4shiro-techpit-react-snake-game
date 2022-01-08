import React, { useEffect, useState } from 'react';

import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import ManipulationPanel from './components/ManipulationPanel';
import { initFields } from './utils';

type PositionType = {
  x: number;
  y: number;
};

const initialPosition: PositionType = { x: 17, y: 17 };
const initialValues = initFields(35, initialPosition);
const defaultInterval = 100;

let timer: NodeJS.Timer | undefined = undefined;

const unsubscribe = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer);
};

const App: React.FC = () => {
  const [fields, setFields] = useState(initialValues);
  const [position, setPosition] = useState<PositionType>();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setPosition(initialPosition);

    // ゲームの中の時間を管理する
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!position) {
      return;
    }
    goUp();
  }, [tick]);

  const goUp = () => {
    if (position) {
      const { x, y } = position;
      const nextY = Math.max(y - 1, 0);
      fields[y][x] = '';
      fields[nextY][x] = 'snake';
      setPosition({ x, y: nextY });
      setFields(fields);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button />
        <ManipulationPanel />
      </footer>
    </div>
  );
};

export default App;
