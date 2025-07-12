import ServiceEdit from '@/components/partials/Services/Edit';
import React, { use } from 'react';

const EditServicePage = ({
  params,
}: {
  params: Promise<{ serviceId: number }>;
}) => {
  const { serviceId } = use(params);

  return (
    <div>
      <ServiceEdit serviceId={serviceId} />
    </div>
  );
};

export default EditServicePage;
