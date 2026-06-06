function trimSlash(s: string): string {
  return s.trim().replace(/\/+$/, "");
}

function cleanEnvValue(v: string | undefined): string {
  if (!v) return "";
  return v.trim().replace(/^["'`]+/, "").replace(/["'`]+$/, "").trim();
}

function backendBaseRaw(): string {
  // Works in server (load) and browser (islands). In browser, falls back to same-origin proxy or default.
  const proc = (typeof process !== 'undefined' ? process : undefined) as any;
  const win = (typeof window !== 'undefined' ? window : undefined) as any;
  const fromEnv = cleanEnvValue(proc?.env?.BACKEND_URL) || cleanEnvValue(win?.__BACKEND_URL);
  return fromEnv || "http://localhost:4000";
}

/** Base URL del backend, sin barra final ni /graphql final. */
export function backendBaseUrl(): string {
  const b = trimSlash(backendBaseRaw());
  return b.endsWith("/graphql") ? b.slice(0, -"/graphql".length) : b;
}

export function backendGraphqlUrl(): string {
  return `${backendBaseUrl()}/graphql`;
}
