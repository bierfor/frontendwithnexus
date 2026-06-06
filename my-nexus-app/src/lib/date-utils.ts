export function relativeTime(iso: string | null): string {
  if (!iso) return '';
  const diffH = (Date.now() - Date.parse(iso)) / 3_600_000;
  if (diffH < 1) return "hace menos de 1h";
  if (diffH < 24) return `hace ${Math.floor(diffH)}h`;
  if (diffH < 48) return "ayer";
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "short" }).format(new Date(iso));
}
