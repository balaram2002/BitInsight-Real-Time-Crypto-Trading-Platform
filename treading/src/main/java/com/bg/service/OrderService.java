package com.bg.service;

import com.bg.domain.OrderType;
import com.bg.modal.Coin;
import com.bg.modal.Order;
import com.bg.modal.OrderItem;
import com.bg.modal.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);
    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId,OrderType orderType,String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;






}
