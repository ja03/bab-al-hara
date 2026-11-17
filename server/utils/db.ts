import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let client: NeonQueryFunction<false, false> | null = null

/** Neon SQL client, or null when NUXT_DATABASE_URL isn't set. */
export function useDb() {
  if (client) return client
  const { databaseUrl } = useRuntimeConfig()
  if (!databaseUrl) return null
  client = neon(databaseUrl)
  return client
}
