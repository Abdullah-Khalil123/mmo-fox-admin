import React, { use } from 'react';
import EditNews from '@/components/partials/News/Edit';

const EditNewsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const id = use(params).id;
  return (
    <div>
      <EditNews newsId={id} />
    </div>
  );
};

export default EditNewsPage;
