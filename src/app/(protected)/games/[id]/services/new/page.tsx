import NewService from '@/components/partials/Services/New';
import React from 'react';

const ServicesPage = ({ params }: { params: { id: string | number } }) => {
  return (
    <div>
      <NewService gameId={params.id} />
    </div>
  );
};

export default ServicesPage;
