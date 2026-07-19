export function capitalizeDescenders(title: string): string {
  return title.replace(/[ygpq]/g, (ch) => ch.toUpperCase());
}
