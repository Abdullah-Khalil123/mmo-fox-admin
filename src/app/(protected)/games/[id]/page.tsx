import GameView from '@/components/partials/Games/View';
import React, { use } from 'react';

const GameViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  console.log(`Rendering GameViewPage for ID: ${id}`);
  return (
    <div>
      <GameView gameId={id} />
    </div>
  );
};

export default GameViewPage;
