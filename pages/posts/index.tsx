import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface PostListPageProps {
  posts : any[]
}

export default function PostListPage({posts}: PostListPageProps) {
  return (
    <div>
        POST LIST PAGE
    </div>
  );
}

export const getStaticProps : GetStaticProps<PostListPageProps> = async (context : GetStaticPropsContext) =>{

  // server side
  // build - time
  console.log("static props");
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json();

  return {
    props:{
      posts: [],
    }
  }
}

