import { PrismaClient } from '@prisma/client'

// 1. Force-feed the URL into the Node process to bypass Next.js dropping it
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_WJDK8ktNjR0E@ep-floral-rain-ao8hajr6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const prismaClientSingleton = () => {
  // 2. Pass a basic config to satisfy the Prisma 7 non-empty requirement
  return new PrismaClient({
    log: ['error', 'warn'],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma