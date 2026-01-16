// A simple in-memory rate limiter / Basit bir bellek içi istek sınırlayıcı
import { LRUCache } from "lru-cache";

const tokenCache = new LRUCache<string, number[]>({
  max: 500, // Keep records of a maximum of 500 different people. // En fazla 500 farklı kişinin kaydını tut
  ttl: 60000, // Her kaydı 60 saniye (1 dakika) boyunca sakla. // Keep each recording for 60 seconds (1 minute)
});

export const rateLimit = {
  check: (limit: number, token: string) => {
    // 1. Adım: Bu kişi (token/IP) daha önce gelmiş mi?
    // Step 1: Has this person (token/IP) been here before?
    const tokenCount = tokenCache.get(token) || [0];

    // 2. Adım: Eğer ilk defa geliyorsa, listeye 1 olarak ekle
    // 2. Adım: Eğer ilk defa geliyorsa, listeye 1 olarak ekle
    if (tokenCount[0] === 0) {
      tokenCache.set(token, [1]);
    }

    // 3. Adım: Geldiği her sefer için sayacı 1 artır
    // Step 3: Increment the counter by 1 each time it appears.
    tokenCount[0] += 1;

    // 4. Adım: Şu anki sayısını kontrol et
    // Step 4: Check the current number
    const currentUsage = tokenCount[0];
    const isRateLimited = currentUsage >= limit; // Sınırı aştı mı? Did it cross the line?

    return {
      isRateLimited, // true/false (Durmalı mı?) // true/false (Should it stay?)
      currentUsage, // Şu an kaçıncı isteği? // How many requests has he/she made now?
    };
  },
};
