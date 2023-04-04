import { Request, Response, urlencoded, json } from 'express';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import Cloudinary from './../../../utils/cloudinary';

const prisma = new PrismaClient();

const handler = nc<Request, Response>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: `Something broke!. 
 err` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

handler.use(urlencoded({ extended: true }));
handler.use(json());
handler.use(Cloudinary.multer.single('image'));

handler.post(async (req, res) => {
    const body = req.body;

  const order = await prisma.order.create({
    data: {shipment: body},
  });

  if (!order) {
    return res.status(500).json({ message: 'order was not created' });
  }
  return res.json({ message:'order added', order });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
