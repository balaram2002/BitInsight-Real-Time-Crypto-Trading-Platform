package com.bg.service;

import com.bg.modal.Coin;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class ExternalApiClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private static final String BASE_URL = "https://api.coingecko.com/api/v3";

    public List<Coin> getCoinList(int page) {
        String url = BASE_URL + "/coins/markets?vs_currency=usd&per_page=10&page=" + page;
        log.info("Fetching coin list from CoinGecko API: {}", url);
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});
        } catch (HttpClientErrorException.TooManyRequests e) {
            log.error("Rate limit exceeded (429) while fetching coin list");
            throw e;
        } catch (Exception e) {
            log.error("Error fetching coin list from CoinGecko: {}", e.getMessage());
            throw new RuntimeException("External API error", e);
        }
    }

    public String getMarketChart(String coinId, int days) {
        String url = BASE_URL + "/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;
        log.info("Fetching market chart from CoinGecko API: {}", url);
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (HttpClientErrorException.TooManyRequests e) {
            log.error("Rate limit exceeded (429) while fetching market chart for {}", coinId);
            throw e;
        } catch (Exception e) {
            log.error("Error fetching market chart from CoinGecko: {}", e.getMessage());
            throw new RuntimeException("External API error", e);
        }
    }
}
