import EditGame from '@/components/partials/Games/Edit';
import React, { use } from 'react';

const EditGamePage = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  return (
    <div>
      <EditGame gameId={id} />
    </div>
  );
};

export default EditGamePage;
