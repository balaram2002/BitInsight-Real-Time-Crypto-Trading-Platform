package com.bg.service;

import com.bg.domain.VerificationType;
import com.bg.modal.User;
import com.bg.modal.VerificationCode;

public interface VerificationCodeService {

    VerificationCode sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);




    void  deleteVerificationCodeById(VerificationCode verificationCode);



}
