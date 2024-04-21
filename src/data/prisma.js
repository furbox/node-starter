import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();

if(process.env.NODE !== "production") global.prisma = prisma

export default prisma