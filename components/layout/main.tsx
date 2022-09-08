
import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import { useEffect } from 'react'; 


export default function MainLayout ({children}: LayoutProps) {

  useEffect(() => {
    console.log("MainLayout mouting");
  
    return () => {
      console.log("MainLayout unmouting");
    }
  }, [])
  

  return (
    <div>
      <h1>Main Layout</h1>
      <div className='flex gap-x-3'>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div>
              <Link href="/about" >
                <a>About</a>
              </Link>
          </div>
      </div>
 
   

      <div>{children}</div>
    </div>
  );
}
