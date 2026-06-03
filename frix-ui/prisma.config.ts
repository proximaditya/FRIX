import { defineConfig } from '@prisma/config'
import 'dotenv/config' // This ensures it reads your .env file!

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})