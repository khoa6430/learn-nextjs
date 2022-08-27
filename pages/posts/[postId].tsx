import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { PostListPageProps } from '.';

export interface PostPageProps {
  post:any,
}

export default function PostDetailPage ({post}: PostPageProps) {
    const router = useRouter();

    if(!post) return null;

  return (
    <div>
      <h1>Post Detail Page</h1>

      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths : GetStaticPaths = async () => {
  console.log("\n GET STATIC PATHS");

  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await response.json();

  return {
    paths: data.data.map((post:any) => ({params:{postId:post.id }})),
    fallback: true,
  }
}

export const getStaticProps : GetStaticProps<PostPageProps> = async (context:GetStaticPropsContext) =>{

  // server side
  // build - time
  console.log("\n GET STATIC PROPS",context.params?.postId);
  const postId = context.params?.postId
  if(!postId) return {notFound:true}

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await response.json();
  // console.log('data:', data); 

  return {
    props:{
      post: data,
    },
    revalidate:5
  }
}

