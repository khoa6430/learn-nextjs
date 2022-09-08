import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';


export interface PokeDetailProps {
    poke:any
}

export default function PokeDetailPage ({poke}: PokeDetailProps) {
   
    const router = useRouter();

    if(!poke) return null;
  return (
    <div>
        <h1 style={{textAlign:'center'}}>POKE DETAIL PAGE</h1>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div><h1>{poke.name}</h1></div>
          <div>
            <img src={poke.sprites.front_default} />
          </div>
  
        </div>
    </div>
  );
}



export const getStaticPaths : GetStaticPaths = async () => {
    // console.log("\n GET STATIC PROPS",context.params?.pokeId);
    const dataListPokemonAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=20`)

    const dataListPokemonDetail = await Promise.all(dataListPokemonAPI?.data.results.map(async (element:{ name: string; url: string })=>{
        try{
          const dataListPokemon = await axios.get(`${element.url}`);
          return dataListPokemon.data;
        }catch(e){
          console.log(e)
        }
    }))

    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json();



    return {
      paths: dataListPokemonDetail.map((item:any) => ({params:{pokeId:`${item.id}` }})),
      fallback: true,
    }
  }
  
  export const getStaticProps : GetStaticProps<PokeDetailProps> = async (context:GetStaticPropsContext) =>{
  
    // server side
    // build - time
    // console.log("\n GET STATIC PROPS",context.params?.pokeId);
    const pokeId = context.params?.pokeId
    if(!pokeId) return {notFound:true}
  
    const responseDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    const responseDetailData = await responseDetail.json();
    // console.log('responseDetailData:', responseDetailData)


    const response = await fetch(`https://js-post-api.herokuapp.com/api/pokemon/sktwi1cgkkuif36dk`)
    const data = await response.json();
  
    return {
      props:{
        poke: responseDetailData,
      },
      revalidate:5
    }
  }