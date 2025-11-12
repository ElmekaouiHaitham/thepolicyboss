import { headers } from 'next/headers';

export async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol =
    headersList.get('x-forwarded-proto') ?? (process.env.NODE_ENV === 'development' ? 'http' : 'https');

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

