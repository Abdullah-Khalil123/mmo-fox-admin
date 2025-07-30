import NewsPage from '@/components/partials/News/View';
import React, { use } from 'react';

const NewsViewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const id = use(params).id;
  return (
    <div>
      <NewsPage newsId={id} />
    </div>
  );
};

export default NewsViewPage;
