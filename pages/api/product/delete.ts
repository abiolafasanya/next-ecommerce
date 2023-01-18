import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const product = client.product
    let id = req.query.id as string;
    const remove = product.delete({where: {id: id}})
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));

    console.log('remove', remove);
    if (!remove) throw new Error('Failed to remove');
    return res
      .status(200)
      .json({ success: true, message: 'Product removeed', procuct: remove });
}