package com.bg.service;

import com.bg.config.CacheConfig;
import com.bg.modal.Coin;
import com.bg.repository.CoinRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {

    private final CoinRepository coinRepository;
    private final ObjectMapper objectMapper;
    private final ExternalApiClient externalApiClient;
    private final CacheManager cacheManager;
    private final RestTemplate restTemplate;

    @Override
    @Cacheable(value = CacheConfig.COIN_LIST_CACHE, key = "#page")
    public List<Coin> getCoinList(int page) throws Exception {
        try {
            return externalApiClient.getCoinList(page);
        } catch (HttpClientErrorException.TooManyRequests e) {
            log.warn("429 Too Many Requests received. Attempting to return last cached value for page {}", page);
            Cache cache = cacheManager.getCache(CacheConfig.COIN_LIST_CACHE);
            if (cache != null && cache.get(page) != null) {
                return (List<Coin>) cache.get(page).get();
            }
            throw new Exception("Rate limit exceeded and no cached data available.");
        }
    }

    @Override
    @Cacheable(value = CacheConfig.MARKET_CHART_CACHE, key = "#coinId + '-' + #days")
    public String getMarketChart(String coinId, int days) throws Exception {
        try {
            return externalApiClient.getMarketChart(coinId, days);
        } catch (HttpClientErrorException.TooManyRequests e) {
            String key = coinId + "-" + days;
            log.warn("429 Too Many Requests received. Attempting to return last cached value for market chart {}", key);
            Cache cache = cacheManager.getCache(CacheConfig.MARKET_CHART_CACHE);
            if (cache != null && cache.get(key) != null) {
                return (String) cache.get(key).get();
            }
            throw new Exception("Rate limit exceeded and no cached data available.");
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Coin coin = new Coin();
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());
            
            JsonNode marketData = jsonNode.get("market_data");
            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h").asDouble());
            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asLong());
            coin.setTotalSupply(marketData.get("total_supply").asLong());
            
            coinRepository.save(coin);
            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching coin details for {}: {}", coinId, e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception {
        Optional<Coin> optionalCoin = coinRepository.findById(coinId);
        if (optionalCoin.isEmpty()) throw new Exception("coin not found");
        return optionalCoin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTreadingCoins() throws Exception {
        String url = "https://api.coingecko.com/api/v3/search/trending";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
