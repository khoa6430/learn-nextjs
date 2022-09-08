import MainLayout from '@/components/layout/main'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../models';


const Home: NextPageWithLayout = () => {

  const router = useRouter();

  const GoToDetailPage = () =>{
    router.push({
      pathname:'/posts/[postId]',
      query:{
        postId:123,
        ref:'social',
      }
    })
  }

  return (
    <div>
        <h1 className='text-red-600 text-center'>HOME PAGE</h1>
    </div>

  )
}

Home.Layout = MainLayout

export default Home

