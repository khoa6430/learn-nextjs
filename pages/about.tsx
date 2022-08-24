// import Header from '@/components/common/header';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

export interface AboutPageProps {
}

const Header = dynamic(()=> import('@/components/common/header'),{ssr:false})

export default function App (props: AboutPageProps) {
  const router = useRouter();
  const [postList, setPostList] = useState([])
  const page = Number(router.query?.page) || 1
  console.log('router:', router.query)

  // RUN IN CLIENT
  useEffect(() => {
    (async ()=>{
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json();

      setPostList(data.data);
    })()
    

  }, [page])

  function handleNextClick(){
    router.push({
      pathname:'/about',
      query:{
        page : (Number(router.query?.page) || 1) + 1,
      }
    },undefined,{
      shallow:true
    })
  }
  
  return (
    <div>
      <h1>ABOUT PAGE</h1>
      <Header />
      <ul className='post-list'>
        {postList.map((post:any)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleNextClick}>Next Page</button>
    </div>
  );
}

export async function getStaticProps(){
  console.log('getStaticProps:', getStaticProps)
  return {
        props:{},   //will be passed to the page component as props
      }
}

// export function getServerSideProps(){
//   return {
//     props:{},   //will be passed to the page component as props
//   }
// }
