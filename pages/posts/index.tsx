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
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await response.json();
  console.log('data:', data);

  return {
    props:{
      posts: [],
    }
  }
}

