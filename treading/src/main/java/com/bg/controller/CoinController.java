package com.bg.controller;


import com.bg.modal.Coin;
import com.bg.service.CoinService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
@RequiredArgsConstructor
@Slf4j
public class CoinController {

    private final CoinService coinService;
    private final ObjectMapper objectMapper;

    @GetMapping
    ResponseEntity<List<Coin>>getCoinList(@RequestParam(name="page", defaultValue = "1") int page) throws Exception {
        log.info("Request to get coin list for page: {}", page);
        List<Coin> coins=coinService.getCoinList(page);
        return  new ResponseEntity<>(coins, HttpStatus.OK);

    }
    @GetMapping("/{coinId}/chart")
    ResponseEntity<JsonNode>getMarketChart(
            @PathVariable String coinId,
            @RequestParam("days")int days
    ) throws Exception {
        log.info("Request to get market chart for coin: {} for {} days", coinId, days);
        String res=coinService.getMarketChart(coinId,days);
        JsonNode jsonNode=objectMapper.readTree(res);
        return  new ResponseEntity<>(jsonNode, HttpStatus.OK);
    }

    @GetMapping("/search")
    ResponseEntity<JsonNode>searchCoin(
            @RequestParam("q")String keyword
    ) throws Exception {
        log.info("Request to search coin with keyword: {}", keyword);
        String coin=coinService.searchCoin(keyword);
        JsonNode jsonNode=objectMapper.readTree(coin);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/top50")
    ResponseEntity<JsonNode>getTop50CoinByMarketCapRank(
    ) throws Exception {
        log.info("Request to get top 50 coins");
        String coin=coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode=objectMapper.readTree(coin);
        return  ResponseEntity.ok(jsonNode);
    }
    @GetMapping("/treading")
    ResponseEntity<JsonNode>getTreadingCoin(

    ) throws Exception {
        log.info("Request to get trending coins");
        String coin=coinService.getTreadingCoins();
        JsonNode jsonNode=objectMapper.readTree(coin);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode>getCoinDetails(
            @PathVariable String coinId

    ) throws Exception {
        log.info("Request to get coin details for: {}", coinId);
        String coin=coinService.getCoinDetails(coinId);
        JsonNode jsonNode=objectMapper.readTree(coin);
        return ResponseEntity.ok(jsonNode);
    }



}
