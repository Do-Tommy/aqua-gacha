import React, { useEffect } from 'react';
import Phaser from 'phaser';
import TankScene from './scenes/TankScene';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: [TankScene],
      physics: { default: 'arcade' },
    };
    new Phaser.Game(config);
  }, []);

  const handleGachaPull = () => {
    fetch('/api/gacha/pull', { method: 'POST' })
      .then(res => res.json())
      .then(data => console.log('New fish:', data));
  };

  return (
    <div className="app">
      <h1>Aqua Gacha</h1>
      <div id="game-container" />
      <button onClick={handleGachaPull}>Pull a Fish!</button>
    </div>
  );
};

export default App;