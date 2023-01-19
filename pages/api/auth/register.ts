import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = req.body;
        body.password  = bcrypt.hashSync(req.body.password, 10)
        const user = prisma.user
        const create = await user.create({data: body})
        if(!create) return res.status(400).json({message: 'user not created'})
        return res.status(200).json({message: 'user created', user: create})
    } catch (error) {
        throw new Error(`Error: ${error}`)
    }
}