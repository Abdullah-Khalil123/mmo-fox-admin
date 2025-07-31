'use client';
import React, { useState } from 'react';
import NewsTable from './table';
import SearchHeader from '../Games/searchHeader';
import { useNews } from '@/hooks/useNews';
import Pagination from '../Games/pagination';
import useDebounce from '@/hooks/useDebounce';

const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError } = useNews(page, limit, debouncedSearch);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };
  return (
    <div className="w-full space-y-4">
      <SearchHeader
        title="News Articles"
        discription="Manage your news articles and updates"
        link="/news/new"
        onChange={handleSearchChange}
      />
      <NewsTable data={data} isError={isError} isLoading={isLoading} />
      <Pagination
        setLimit={setLimit}
        setPage={setPage}
        pagination={data?.pagination || {}}
      />
    </div>
  );
};

export default NewsPage;
