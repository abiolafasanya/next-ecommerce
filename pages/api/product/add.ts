import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const product = client.product
    let body = req.body;
    const add =await product.create({data: body})
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