import { useEffect } from 'react';
import Phaser from 'phaser';
import TankScene from './scenes/TankScene';
import './App.css';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: [TankScene],
      physics: { default: 'arcade' },
    };
    new Phaser.Game(config);
  }, []);

  return (
    <div>
      <h1>Aqua Gacha</h1>
      <div id="game-container"></div>
      <button onClick={handleGachaPull}>Pull a Fish!</button>
    </div>
  );
}

const handleGachaPull = () => {
  // API call to backend for gacha result
  fetch('/api/gacha/pull', { method: 'POST' })
    .then(res => res.json())
    .then(data => console.log('New fish:', data));
};

export default App;