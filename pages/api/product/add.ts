import { PrismaClient } from "@prisma/client"
import { Session } from "inspector";
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';


const client = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getSession(res)
      const SMail = session?.user?.email as string
      const findUser = await client.user.findFirst({where: {email: SMail}})
      
      const product = client.product
      let body = req.body;
      let data
      if (!findUser) {
        data = {...body}
      } else {
        data = {...body, userId: findUser?.id as string}
      }
      
    // const adds =await product.create({data: {}})
    const add =await product.create({data: data})
    console.log('passed', add);
    if (!add) throw new Error('Bad request check your inputs');
    if (add) return res
      .status(200)
      .json({ success: true, message: 'Product Added', procuct: add });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
}