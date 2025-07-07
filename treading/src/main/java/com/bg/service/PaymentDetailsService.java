package com.bg.service;

import com.bg.modal.PaymentDetails;
import com.bg.modal.User;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user
                                            );

    public PaymentDetails getUserPaymentDetails(User user);



}
