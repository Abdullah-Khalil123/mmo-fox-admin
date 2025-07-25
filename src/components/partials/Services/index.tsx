'use client';
import React from 'react';
import ServicesTable from './table';
import Search from './searchHeader';
import { useServicesByGameId } from '@/hooks/useServices';

const Services = ({ gameId }: { gameId: number | string }) => {
  const { data, isLoading, isError, error } = useServicesByGameId(gameId);
  const services = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <Search />
      <ServicesTable services={services} gameId={gameId} />
    </div>
  );
};

export default Services;
