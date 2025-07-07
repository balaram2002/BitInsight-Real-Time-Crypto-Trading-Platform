package com.bg.service;

import com.bg.modal.User;
import com.bg.modal.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal procedWithdrawal(Long withdrawalId,boolean accept) throws Exception;

    List<Withdrawal> getUsersWithdrawalHistory(User user);

    List<Withdrawal>getAllWithdrawalRequest();

}
