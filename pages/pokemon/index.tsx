import Link from 'next/link';
import * as React from 'react';
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import styles from './pokestyle.module.css';

export interface PokemonProps {
    pokes : any[]
}

export default function PokemonListPage ({pokes}: PokemonProps) {

  return (
    <div>
        <h1 style={{textAlign:'center'}} className={styles.title}>POKEMON PAGE </h1>
    <div>
          {pokes?.map(item => 
            <div key={item?.id}>
              <Link href={`/pokemon/${item.id}`}>
                  <a>
                      {item?.name}
                  </a>
               </Link>
              {/* <img src={item.sprites.front_default}/> */}
            </div>
          )}
        </div>
    </div>
  );
}


export async function getServerSideProps() {

    const dataListPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=20`)
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




