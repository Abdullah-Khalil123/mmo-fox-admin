'use client';

import CreateCurrencyService from '@/components/partials/Services/Config';
import { useServiceById } from '@/hooks/useServices';
import { useParams } from 'next/navigation';
import React from 'react';

const ServiceConfig = () => {
  const rawId = useParams().serviceId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data, isLoading, error } = useServiceById(id as string);
  const serviceType = data?.data?.type;

  if (!id) {
    return <div>Service ID is required</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service: {error.message}</div>;
  }

  return (
    <div>
      {serviceType === 'CURRENCY' ? (
        <CreateCurrencyService serviceId={id} />
      ) : (
        <div>Service type not supported</div>
      )}
    </div>
  );
};

export default ServiceConfig;
