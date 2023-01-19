import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    console.log(body);
    const client = prisma.category;
    const create = await client.create({ data: body });
    if (!create) {
      throw new Error(`Error: Failed to create ${body}`);
    }
    return res.status(200).json({ message: 'category created', body });
  } catch (error) {
    console.log(error);
    return;
  }
}
