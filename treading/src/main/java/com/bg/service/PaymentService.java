package com.bg.service;

import com.bg.domain.PaymentMethod;
import com.bg.modal.PaymentOrder;
import com.bg.modal.User;
import com.bg.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount,
                             PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount,Long orderId) throws StripeException;




}
