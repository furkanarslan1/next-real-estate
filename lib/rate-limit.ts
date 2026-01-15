// A simple in-memory rate limiter / Basit bir bellek içi istek sınırlayıcı
const LRU = require("lru-cache");

const tokenCache = new LRU({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

export const rateLimit = (ip: string) => {
  const tokenCount = (tokenCache.get(ip) as number[]) || [0];
  if (tokenCount[0]) {
    tokenCache.set(ip, [1]);
  }
  tokenCount[0] += 1;

  const currentUsage = tokenCount[0];
  const isRateLimited = currentUsage >= 5; // Max 5 requests per minute / Dakikada max 5 istek
  return {
    isRateLimited,
    currentUsage,
  };
};
