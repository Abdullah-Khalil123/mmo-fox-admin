import EditUsers from '@/components/partials/Users/Edit';
import React, { use } from 'react';

const EditUserPage = ({
  params,
}: {
  params: Promise<{ id: number | string }>;
}) => {
  const { id } = use(params);
  return (
    <div>
      <EditUsers userId={id} />
    </div>
  );
};

export default EditUserPage;
