export function capitalizeDescenders(title: string): string {
  return title.replace(/[ygp]/g, (ch) => ch.toUpperCase());
}
