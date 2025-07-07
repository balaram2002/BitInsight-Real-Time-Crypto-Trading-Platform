package com.bg.repository;

import com.bg.modal.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails,Long> {
    PaymentDetails findByUserId(Long userId);
}
