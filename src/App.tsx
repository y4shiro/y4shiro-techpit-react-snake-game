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

export type GameStatusType = 'init' | 'playing' | 'suspended' | 'gameover';

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

// スネークの衝突判定、今回は壁のみ
const isCollision = (fieldSize: number, position: PositionType) => {
  if (position.y < 0 || position.x < 0) {
    return true;
  }
  if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
    return true;
  }

  return false;
};

const App: React.FC = () => {
  const [fields, setFields] = useState(initialValues);
  const [position, setPosition] = useState<PositionType>(initialPosition);
  const [status, setStatus] = useState<GameStatusType>('init');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // ゲームの中の時間を管理する
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!position || status != 'playing') {
      return;
    }

    const canContineu = goUp();
    if (!canContineu) {
      setStatus('gameover');
    }
  }, [tick]);

  const onStart = () => setStatus('playing');

  const onRestart = () => {
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);
    setStatus('init');
    setPosition(initialPosition);
    setFields(initFields(35, initialPosition));
  };

  const goUp = () => {
    const { x, y } = position;
    const newPosition = { x, y: y - 1 };
    if (isCollision(fields.length, newPosition)) {
      unsubscribe();
      return false;
    }
    fields[y][x] = '';
    fields[newPosition.y][x] = 'snake';
    setPosition(newPosition);
    setFields(fields);
    return true;
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
        <Button status={status} onStart={onStart} onRestart={onRestart} />
        <ManipulationPanel />
      </footer>
    </div>
  );
};

export default App;
