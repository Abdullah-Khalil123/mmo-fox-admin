import ViewService from '@/components/partials/Services/View';
import React, { use } from 'react';

const ViewServicePage = ({
  params,
}: {
  params: Promise<{ serviceId: number }>;
}) => {
  const { serviceId } = use(params);
  return (
    <div>
      <ViewService serviceId={serviceId} />
    </div>
  );
};

export default ViewServicePage;
