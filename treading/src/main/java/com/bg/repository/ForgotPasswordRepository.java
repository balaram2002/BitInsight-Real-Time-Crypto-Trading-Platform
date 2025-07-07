package com.bg.repository;

import com.bg.modal.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository <ForgotPasswordToken ,String >{

    ForgotPasswordToken findByUserId(Long UserId);




}
