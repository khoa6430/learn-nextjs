// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import { resolve } from 'path';
// type Data = {
//   name: string
// }

export const config = {
  api:{
    bodyParser : false,
  }
}

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve)=>{
    //don't send cookies to API server
    req.headers.cookie = ''
    //api student
    //http://js-post-api.herokuapp.com/api/students/
    proxy.web(req,res,{
        // target : process.env.API_URL,
        target : 'https://js-post-api.herokuapp.com',
        changeOrigin : true,
        selfHandleResponse:false,
    })

    proxy.once('proxyRes',()=>{
      resolve(true)
    })
  })
}
