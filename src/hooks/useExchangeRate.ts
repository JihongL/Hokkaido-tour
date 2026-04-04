import { useQuery } from "@tanstack/react-query";

interface ExchangeRateData {
  rate: number;
  updatedAt: string;
  isFallback: boolean;
}

const PRIMARY_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.min.json";
const FALLBACK_URL =
  "https://latest.currency-api.pages.dev/v1/currencies/krw.min.json";

const FALLBACK_RATE = 0.11;
const FETCH_TIMEOUT = 5000;

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRate(): Promise<ExchangeRateData> {
  for (const url of [PRIMARY_URL, FALLBACK_URL]) {
    try {
      const res = await fetchWithTimeout(url, FETCH_TIMEOUT);
      if (!res.ok) continue;
      const data = await res.json();
      const jpyRate = data?.krw?.jpy;
      const date = data?.date; // API returns "YYYY-MM-DD"
      if (typeof jpyRate === "number" && jpyRate > 0) {
        return {
          rate: Math.round(jpyRate * 10000) / 10000,
          updatedAt: date || new Date().toISOString().slice(0, 10),
          isFallback: false,
        };
      }
    } catch {
      continue;
    }
  }
  throw new Error("Exchange rate API unavailable");
}

export function useExchangeRate() {
  return useQuery({
    queryKey: ["exchange-rate-krw-jpy"],
    queryFn: fetchRate,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    placeholderData: { rate: FALLBACK_RATE, updatedAt: "", isFallback: true },
  });
}
