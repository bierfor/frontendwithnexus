import { backendGraphqlUrl } from './backend-url.ts';

/**
 * Lightweight GraphQL fetch for Nexus (works in load() server and client islands).
 * Proxies or direct to backend GraphQL.
 */
export async function gql<T = any>(
  query: string,
  variables?: Record<string, any>,
  opts?: { tags?: string[]; locale?: string }
): Promise<T> {
  let url = backendGraphqlUrl();

  // If locale is provided, pass it as a query param to the backend
  if (opts?.locale) {
    const u = new URL(url);
    u.searchParams.set('lang', opts.locale);
    url = u.toString();
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // In server load, cache: 'no-store' or use revalidate; client always fresh for now
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`GraphQL HTTP error ${res.status}`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    const msg = json.errors.map(e => e.message).join('; ');
    throw new Error(`GraphQL: ${msg}`);
  }

  if (!json.data) {
    throw new Error('GraphQL response missing data');
  }

  return json.data;
}
