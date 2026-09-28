package com.bg.service;

import com.bg.config.CacheConfig;
import com.bg.modal.Coin;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class CacheRefreshScheduler {

    private final ExternalApiClient externalApiClient;
    private final CacheManager cacheManager;

    /**
     * Refreshes the coin list cache every 10 minutes.
     * This ensures that users always get relatively fresh data even if they don't trigger a cache miss.
     */
    @Scheduled(fixedRate = 600000) // 10 minutes in milliseconds
    public void refreshCoinListCache() {
        log.info("Scheduled task: Refreshing coin list cache...");
        try {
            List<Coin> coins = externalApiClient.getCoinList(1);
            if (cacheManager.getCache(CacheConfig.COIN_LIST_CACHE) != null) {
                cacheManager.getCache(CacheConfig.COIN_LIST_CACHE).put(1, coins);
                log.info("Successfully refreshed coin list cache for page 1");
            }
        } catch (Exception e) {
            log.error("Failed to refresh coin list cache: {}", e.getMessage());
        }
    }

    /**
     * Refreshes market charts for popular coins. 
     * In a real production app, you might track which coins are currently popular or being viewed.
     */
    @Scheduled(fixedRate = 600000) // 10 minutes in milliseconds
    public void refreshPopularMarketCharts() {
        log.info("Scheduled task: Refreshing popular market charts...");
        String[] popularCoins = {"bitcoin", "ethereum", "tether"};
        for (String coinId : popularCoins) {
            try {
                String chart = externalApiClient.getMarketChart(coinId, 1);
                String key = coinId + "-1";
                if (cacheManager.getCache(CacheConfig.MARKET_CHART_CACHE) != null) {
                    cacheManager.getCache(CacheConfig.MARKET_CHART_CACHE).put(key, chart);
                    log.info("Successfully refreshed market chart cache for {}", coinId);
                }
            } catch (Exception e) {
                log.error("Failed to refresh market chart for {}: {}", coinId, e.getMessage());
            }
        }
    }
}
