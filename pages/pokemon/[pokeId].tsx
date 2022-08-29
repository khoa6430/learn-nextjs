import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface PokemonDetail {
}

export default function PokemonDetailPage ({}: PokemonDetail) {
  return (
    <div>
        POKEMON DETAIL PAGE

    </div>
  );
}



// export const getStaticPaths : GetStaticPaths = async () => {
//     console.log("\n GET STATIC PATHS");
  
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
//     const data = await response.json();
//     // console.log('data:', data)
    
//     let x1 = [];

//     await Promise.all(data.result.map(async (item:any) => {
//         console.log('item:', item.url)
//         const getData = axios.get(item.url);
//         // console.log('getData:', getData)
//     }));
  
//     return {
//       paths: data.data.map((post:any) => ({params:{postId:post.id }})),
//       fallback: true,
//     }
//   }
  
//   export const getStaticProps : GetStaticProps<PokemonDetail> = async (context:GetStaticPropsContext) =>{
  
//     // server side
//     // build - time
//     // console.log("\n GET STATIC PROPS",context.params?.postId);
//     // const postId = context.params?.postId
//     // if(!postId) return {notFound:true}
  
//     const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/sktwi1cgkkuif36dj`)
//     const data = await response.json();

//     // console.log('data:', data); 
  
//     return {
//       props:{
//         post: data,
//       },
//       revalidate:5
//     }
//   }
  