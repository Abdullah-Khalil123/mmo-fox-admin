import React, { use } from 'react';
import Services from '@/components/partials/Services';

const ServicesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div>
      <Services gameId={id} />
    </div>
  );
};

export default ServicesPage;
