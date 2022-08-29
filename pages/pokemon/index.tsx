import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import InfiniteScroll from "react-infinite-scroll-component";


export interface PokemonProps {
    pokes : any[]
}

export default function PokemonListPage ({pokes}: PokemonProps) {
  const [pokelist, setPokeList] = useState(pokes);
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = async () => {
    console.log("load")
    // const res = await fetch(
    //   `${API_URL}/posts?_start=${posts.length}&_limit=10`
    // );
    const dataListPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=20`)
    console.log('dataListPokemon:', dataListPokemon.data.results)

    const dataListPokemonDetail = await Promise.all(dataListPokemon?.data.results.map(async (element:{ name: string; url: string })=>{
      try{
        const dataListPokemon = await axios.get(`${element.url}`);
        return dataListPokemon.data;
      }catch(e){
        console.log(e)
      }
    }))
    // const newPosts = await res.json();
    // setPosts((posts) => [...posts, ...newPosts]);
  };

  // useEffect(() => {
  //   setHasMore(numberOfPosts > posts.length ? true : false);
  // }, [pokelist]);

  return (
    <div>
        <section className='bg-slate-500 '>
          <h1 className="text-3xl font-bold underline p-8 text-center">POKEMON PAGE</h1>
          <InfiniteScroll
              dataLength={pokes.length}
              next={getMorePosts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
          <div className='container flex flex-wrap justify-start gap-3 m-auto p-4'>
       
              {pokelist?.map((item:any)=>(
                <div key={item.id} className="bg-[#f4f1de] w-[255px] m-auto">
     
                  <div className='mx-auto'>
                    <img src={item.sprites.front_default }  className=""/>
                  </div>
                  <div className='text-center'>{item.name}</div>
                </div>
              ))}
    
          </div>
          </InfiniteScroll>
        </section>
    </div>
  );
}


export async function getServerSideProps() {

    const dataListPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=20`)
    console.log('dataListPokemon:', dataListPokemon.data.results)

    const dataListPokemonDetail = await Promise.all(dataListPokemon?.data.results.map(async (element:{ name: string; url: string })=>{
      try{
        const dataListPokemon = await axios.get(`${element.url}`);
        return dataListPokemon.data;
      }catch(e){
        console.log(e)
      }
    }))


    return {
        props:{
            pokes: dataListPokemonDetail
          }
    }
    
  }

// export const getStaticProps : GetStaticProps<PokemonProps> = async (context : GetStaticPropsContext) =>{

//   const dataListPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`)
//     // console.log('dataListPokemon:', dataListPokemon.data.results);

//     const dataListPokemonDetail = await Promise.all(dataListPokemon?.data.results.map(async (element:{ name: string; url: string })=>{
//       try{
//         const dataListPokemon = await axios.get(`${element.url}`);
//         return dataListPokemon.data;
//       }catch(e){
//         console.log(e)
//       }
    
//     }))

//   return {
//     props:{
//       pokes: dataListPokemonDetail
//     }
//   }
// }




