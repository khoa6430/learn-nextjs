import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface PokemonProps {
    poke : any[]
}

export default function PokemonPage ({poke}: PokemonProps) {
  console.log('poke:', poke)
  return (
    <div>
        POKEMON PAGE
        <ul>
            {poke?.map((item :any) => 
            <li key={item.name}>
                <Link href={`/poke/${item.id}`}>
                <a>
                    {item.name}------{item.url} --{item.id}
                </a>
                </Link>
            </li>)}
        </ul>
    </div>
  );
}

export const getStaticProps : GetStaticProps<PokemonProps> = async (context : GetStaticPropsContext) =>{

    // server side
    // build - time
    // console.log("static props");
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1&offset=20')
    const data = await response.json();

    let x2:any = [];
    await Promise.all(data.results.map(async (item:any) => {
        try{
             x2.push(await axios.get(item.url)).then(( data:any ) => (x2.push(data))); 
          
        }
        catch(e){
            console.log(e);
        }
    }));
    
    // console.log('x2:', x2[0].data)
  
    return {
      props:{
        poke: x2,
      }
    }
  }
  