package com.bg.service;

import com.bg.modal.Order;
import com.bg.modal.User;
import com.bg.modal.Wallet;


public interface WalletService {


    Wallet getUserWallet (User user);

    Wallet addBalance(Wallet wallet,Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransfer(User sender,Wallet receiverWallet,Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;


}
