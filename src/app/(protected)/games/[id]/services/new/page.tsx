import NewService from '@/components/partials/Services/New';
import React, { use } from 'react';

const ServicesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div>
      <NewService gameId={id} />
    </div>
  );
};

export default ServicesPage;
