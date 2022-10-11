// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyReqWsCallback, ProxyResCallback } from 'http-proxy'
import { resolve } from 'path';
import Cookies from 'cookies';

type Data = {
  message: string
}

export const config = {
  api:{
    bodyParser : false,
  }
}

const proxy = httpProxy.createProxyServer();

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    if(req.method !== 'POST'){
        return res.status(404).json({message:'method not supported'})
    }
    console.log("1");
    const cookies = new Cookies(req,res)
    cookies.set('access_token')

    res.status(200).json({message:'logout successfully'})
}
