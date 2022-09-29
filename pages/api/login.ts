// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import { resolve } from 'path';
type Data = {
  message: string
}

export const config = {
  api:{
    bodyParser : false,
  }
}

const proxy = httpProxy.createProxyServer();

export default function handler( req: NextApiRequest, res: NextApiResponse<any>) {
    if(req.method !== 'POST'){
        return res.status(404).json({message:'method not supported'})
    }
  return new Promise((resolve)=>{
    //don't send cookies to API server
 
    console.log('login request');
    req.headers.cookie = ''
    //api student
    //http://js-post-api.herokuapp.com/api/students/
    const handleLoginResponse:ProxyResCallback =  (proxyRes,req,res) => {
        // target : process.env.API_URL,
        target : 'https://js-post-api.herokuapp.com',
        changeOrigin : true,
        selfHandleResponse:true,
    })

    proxy.once('proxyRes',()=>{
      resolve(true)
    })
  })
}
