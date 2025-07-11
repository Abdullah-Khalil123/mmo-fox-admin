'use client';
import React from 'react';
import ServicesTable from './table';
import Search from './searchHeader';
import { useServicesByGameId } from '@/hooks/useServices';

const Services = ({ gameId }: { gameId: number | string }) => {
  const { data, isLoading, isError } = useServicesByGameId(gameId);
  const services = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading services</div>;
  }
  return (
    <div>
      <Search />
      <ServicesTable services={services} />
    </div>
  );
};

export default Services;
