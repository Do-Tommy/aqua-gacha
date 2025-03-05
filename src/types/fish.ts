export interface Fish {
    id: string;
    name: string;
    rarity: string;
    speed: number; // Pixels per second in Phaser
    hungerRate: number; // Hours until next feeding
    happiness: number; // 0-100, affects trading and animations
    sprite: string; // Path to sprite image
  }

  const fluffelFin: Fish = {
    id: 'fluffel-001',
    name: 'Fluffel Fin',
    rarity: 'Rare',
    speed: 60,
    hungerRate: 8,
    happiness: 75,
    sprite: 'assets/sprites/fluffel-fin.png',
  };

  export { fluffelFin };