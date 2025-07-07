package com.bg.service;

import com.bg.modal.Coin;
import com.bg.modal.User;
import com.bg.modal.Watchlist;

public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;


    Coin addItemToWatchlist(Coin coin,User user) throws Exception;


}
