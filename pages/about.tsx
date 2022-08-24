import { useRouter } from 'next/router';
import * as React from 'react';

export interface AboutPageProps {
}

export default function App (props: AboutPageProps) {
  const router = useRouter();
  console.log('router:', router.query)

  return (
    <div>
      ABOUT PAGE PROPS
    </div>
  );
}

export function getServerSideProps(){
  return {
    props:{},   //will be passed to the page component as props
  }
}
