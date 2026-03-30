export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")} COP`;
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}
