import GameView from '@/components/partials/Games/View';
import React, { use } from 'react';

const GameViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div>
      <GameView id={id} />
    </div>
  );
};

export default GameViewPage;
