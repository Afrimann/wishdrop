export function formatEventDate(value: string): string {
  if (!value) return "";
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(parsed);
}

export function slugifyUsername(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const CURRENCY_LOCALE: Record<string, string> = {
  NGN: "en-NG",
  USD: "en-US",
  GBP: "en-GB",
};

export function formatPrice(
  value: number | null | undefined,
  currency: string = "USD",
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  const locale = CURRENCY_LOCALE[currency] ?? "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
