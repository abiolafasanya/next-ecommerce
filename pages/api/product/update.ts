import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const product = client.product
    let body = req.body;
    const update = product.update({where: {id: req.query.id as string}, data: body})
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));

    console.log('passed', update);
    if (!update) throw new Error('Bad request check your inputs');
    return res
      .status(200)
      .json({ success: true, message: 'Product updated', procuct: update });
}

