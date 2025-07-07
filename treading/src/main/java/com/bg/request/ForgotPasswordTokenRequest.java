package com.bg.request;

import com.bg.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {

    private  String sendTo;
    private VerificationType verificationType;


}
