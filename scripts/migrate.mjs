// Creates the database tables from db/schema.sql.
// Usage: npm run db:migrate   (reads NUXT_DATABASE_URL from .env or the environment)
import { readFile } from 'node:fs/promises'
import { neon } from '@neondatabase/serverless'

const url = process.env.NUXT_DATABASE_URL
if (!url) {
  console.error('NUXT_DATABASE_URL is not set. Add it to .env (see .env.example).')
  process.exit(1)
}

const sql = neon(url)
const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8')

// The Neon HTTP driver runs one statement per call.
const statements = schema
  .replace(/--.*$/gm, '')
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean)

for (const statement of statements) {
  await sql.query(statement)
}
console.log(`Migration complete (${statements.length} statements).`)
