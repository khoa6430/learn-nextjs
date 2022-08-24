import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailPageProps {
}

export default function App (props: PostDetailPageProps) {
    const router = useRouter();
  return (
    <div>
      <h1>Post Detail Page</h1>
      <h1>Query : {JSON.stringify(router.query)}</h1>
    </div>
  );
}
