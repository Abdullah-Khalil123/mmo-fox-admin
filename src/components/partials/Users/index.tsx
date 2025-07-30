'use client';
import React, { ChangeEvent, useState } from 'react';
import UserTable from './UserTable';
import Pagination from './userpagination';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/user.schema';
import SearchHeader from '../Games/searchHeader';
import useDebounce from '@/hooks/useDebounce';

const Users = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { data, isError, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch,
  });
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const users: User[] = data?.data || [];
  const totalItems = data?.pagination?.totalItems ?? 0;
  const userpagination = data?.pagination || {
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems: data?.pagination?.totalItems || 0,
    limit,
  };

  if (isError) {
    return <div>Error loading users</div>;
  }
  return (
    <>
      <SearchHeader
        title="Users"
        discription="Manage your users and their roles"
        link="/users/new"
        onChange={handleSearchChange}
      />
      {isLoading ? (
        <div className="my-4">Loading...</div>
      ) : (
        <div className="rounded-md border my-4">
          <UserTable users={users} />
        </div>
      )}
      <Pagination
        pagination={userpagination}
        setLimit={setLimit}
        setPage={setPage}
      />
    </>
  );
};

export default Users;
