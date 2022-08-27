import { useRouter } from 'next/router';
import { resolve } from 'path';
import * as React from 'react';

export interface ParamsPageProps {
}

export default function ParamsPage (props: ParamsPageProps) {

    const router = useRouter();

  return (
    <div>
      <h1>Params Page</h1>
      <h1>Query : {JSON.stringify(router.query)}</h1>
    </div>
  );
}


export async function getServerSideProps() {

  // fake slow query
  await new Promise((resolve)=> setTimeout(resolve,3000))

  return {
    props : {},
  }
  
}