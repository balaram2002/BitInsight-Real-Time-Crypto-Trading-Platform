package com.bg.request;

import com.bg.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private  String coinId;
    private  double quantity;
    private OrderType orderType;
}
