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
export type DirectionType = 'up' | 'right' | 'left' | 'down';

const OppositeDirection = {
  up: 'down',
  right: 'left',
  left: 'right',
  down: 'up',
} as const;

const Delta = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
} as const;

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
  const [direction, setDirection] = useState<DirectionType>('up');
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

    const canContineu = handleMoving();
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
    setDirection('up');
    setFields(initFields(35, initialPosition));
  };

  const handleMoving = () => {
    const { x, y } = position;
    const delta = Delta[direction];
    const newPosition = {
      x: x + delta.x,
      y: y + delta.y,
    };

    if (isCollision(fields.length, newPosition)) {
      unsubscribe();
      return false;
    }

    fields[y][x] = '';
    fields[newPosition.y][newPosition.x] = 'snake';
    setPosition(newPosition);
    setFields(fields);
    return true;
  };

  const onChangeDirection = (newDirection: DirectionType): DirectionType | undefined => {
    if (status !== 'playing') {
      return direction;
    }
    if (OppositeDirection[direction] === newDirection) {
      return;
    }
    setDirection(newDirection);
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
        <ManipulationPanel onChange={onChangeDirection} />
      </footer>
    </div>
  );
};

export default App;
