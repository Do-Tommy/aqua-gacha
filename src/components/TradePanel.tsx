import React, { useState } from 'react';
import { Fish } from '../types/fish';
interface TradePanelProps {
  myFish: Fish[];
  otherPlayer: { id: string; username: string; fish: Fish[] };
  onTrade: (myFishId: string, theirFishId: string) => void;
}

const TradePanel: React.FC<TradePanelProps> = ({ myFish, otherPlayer, onTrade }) => {
  const [selectedMyFish, setSelectedMyFish] = useState<string | null>(null);
  const [selectedTheirFish, setSelectedTheirFish] = useState<string | null>(null);

  const handleTrade = () => {
    if (selectedMyFish && selectedTheirFish) {
      onTrade(selectedMyFish, selectedTheirFish);
    }
  };

  return (
    <div>
      <h2>Trade with {otherPlayer.username}</h2>
      <div>
        <h3>Your Fish</h3>
        {myFish.map(fish => (
          <div key={fish.id} onClick={() => setSelectedMyFish(fish.id)}>
            {fish.name} ({fish.rarity})
          </div>
        ))}
      </div>
      <div>
        <h3>Their Fish</h3>
        {otherPlayer.fish.map(fish => (
          <div key={fish.id} onClick={() => setSelectedTheirFish(fish.id)}>
            {fish.name} ({fish.rarity})
          </div>
        ))}
      </div>
      <button onClick={handleTrade} disabled={!selectedMyFish || !selectedTheirFish}>
        Trade
      </button>
    </div>
  );
};

export default TradePanel;