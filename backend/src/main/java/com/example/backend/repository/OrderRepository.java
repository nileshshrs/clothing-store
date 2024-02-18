package com.example.backend.repository;

import com.example.backend.entity.Clothing;
import com.example.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    void deleteByClothing(Clothing clothing);
    // You can add custom query methods if needed
}
