'use client';
import SearchHeader from './searchHeader';
import { useGames } from '@/hooks/useGames';
import { useState } from 'react';
import Pagination from './pagination';
import GameTable from './table';

const GameHomePage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit set to 10

  const { data, isError, isLoading } = useGames(page, limit);

  const games = data?.data || [];
  const pagination = data?.pagination || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading games</div>;
  }

  return (
    <div className="w-full space-y-4">
      {/* Header with Title and Search */}
      <SearchHeader />

      {/* Table */}
      <div className="rounded-md border">
        <GameTable games={games} />
      </div>
      <Pagination
        setLimit={setLimit}
        setPage={setPage}
        pagination={pagination}
      />
    </div>
  );
};

export default GameHomePage;
