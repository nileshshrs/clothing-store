package com.example.backend.service;


import com.example.backend.entity.Cart;
import com.example.backend.entity.Clothing;
import com.example.backend.entity.Order;
import com.example.backend.entity.Users;
import com.example.backend.repository.ClothingRepository; // Assuming you have a repository for Clothing
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ClothingRepository clothingRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ClothingRepository clothingRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.clothingRepository = clothingRepository;
    }

    public synchronized List<Map<String, Object>> createOrder(List<Map<String, Object>> cartItems, LocalDateTime orderDate, String shippingAddress, String paymentMethod, String contact) {
        List<Map<String, Object>> result = new ArrayList<>();

        for (Map<String, Object> cartItem : cartItems) {
            // Convert userId and bookId to Long to avoid ClassCastException
            Long userId = ((Number) cartItem.get("userId")).longValue();
            Long clothingId = ((Number) cartItem.get("clothingId")).longValue();
            int quantity = (int) cartItem.get("quantity");

            // Convert total to BigDecimal safely
            BigDecimal total;
            if (cartItem.get("total") instanceof Double) {
                total = BigDecimal.valueOf((Double) cartItem.get("total"));
            } else if (cartItem.get("total") instanceof Integer) {
                total = BigDecimal.valueOf((Integer) cartItem.get("total"));
            } else {
                // Handle the case where total is not a valid numeric type
                result.add(Map.of("error", "Invalid 'total' value"));
                continue; // Skip to the next iteration of the loop
            }

            Optional<Users> optionalUser = userRepository.findById(userId);
            Optional<Clothing> optionalClothing = clothingRepository.findById(clothingId);

            if (optionalUser.isPresent() && optionalClothing.isPresent()) {
                Users user = optionalUser.get();
                Clothing clothing= optionalClothing.get();

                Order order = new Order();
                order.setUser(user);
                order.setClothing(clothing);
                order.setQuantity(quantity);
                order.setOrderDate(orderDate);
                order.setShippingAddress(shippingAddress);
                order.setPaymentMethod(paymentMethod);
                order.setTotalPrice(total);
                order.setContact(contact);

                Order savedOrder = orderRepository.save(order);

                Map<String, Object> orderMap = new HashMap<>();
                orderMap.put("orderId", savedOrder.getOrderId());
                orderMap.put("clothingId", savedOrder.getClothing().getId());
                orderMap.put("name", savedOrder.getClothing().getName());
                orderMap.put("price", savedOrder.getClothing().getPrice());
                orderMap.put("image", savedOrder.getClothing().getImagePath());
                orderMap.put("userId", savedOrder.getUser().getId());
                orderMap.put("username", savedOrder.getUser().getUsername());
                orderMap.put("userEmail", savedOrder.getUser().getEmail());
                orderMap.put("quantity", savedOrder.getQuantity());
                orderMap.put("shippingAddress", savedOrder.getShippingAddress());
                orderMap.put("paymentMethod", savedOrder.getPaymentMethod());
                orderMap.put("totalPrice", savedOrder.getTotalPrice());
                orderMap.put("status", savedOrder.getStatus());
                orderMap.put("orderDate", savedOrder.getOrderDate());
                orderMap.put("contact", savedOrder.getContact());

                result.add(orderMap);
            } else {
                // Handle the case where user or book is not found
                result.add(Map.of("error", "User or book not found"));
            }
        }

        return result;
    }
    // Other methods remain unchanged
    public synchronized List<Map<String, Object>> getAllOrders() {
        List<Order> allOrders = orderRepository.findAll();

        return allOrders.stream()
                .map(order -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("orderId", order.getOrderId());
                    orderMap.put("clothingId", order.getClothing().getId());
                    orderMap.put("name", order.getClothing().getName());
                    orderMap.put("price", order.getClothing().getPrice());
                    orderMap.put("image", order.getClothing().getImagePath());
                    orderMap.put("userId", order.getUser().getId());
                    orderMap.put("username", order.getUser().getUsername());
                    orderMap.put("userEmail", order.getUser().getEmail());
                    orderMap.put("quantity", order.getQuantity());
                    orderMap.put("shippingAddress", order.getShippingAddress());
                    orderMap.put("paymentMethod", order.getPaymentMethod());
                    orderMap.put("totalPrice", order.getTotalPrice());
                    orderMap.put("status", order.getStatus());
                    orderMap.put("orderDate", order.getOrderDate());
                    orderMap.put("contact", order.getContact());
                    return orderMap;
                })
                .collect(Collectors.toList());
    }
    public synchronized List<Map<String, Object>> getOrdersByUserId(Long userId) {
        List<Order> userOrders = orderRepository.findByUserId(userId);

        return userOrders.stream()
                .map(order -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("orderId", order.getOrderId());
                    orderMap.put("clothingId", order.getClothing().getId());
                    orderMap.put("name", order.getClothing().getName());
                    orderMap.put("price", order.getClothing().getPrice());
                    orderMap.put("image", order.getClothing().getImagePath());
                    orderMap.put("userId", order.getUser().getId());
                    orderMap.put("username", order.getUser().getUsername());
                    orderMap.put("userEmail", order.getUser().getEmail());
                    orderMap.put("quantity", order.getQuantity());
                    orderMap.put("shippingAddress", order.getShippingAddress());
                    orderMap.put("paymentMethod", order.getPaymentMethod());
                    orderMap.put("totalPrice", order.getTotalPrice());
                    orderMap.put("status", order.getStatus());
                    orderMap.put("orderDate", order.getOrderDate());
                    orderMap.put("contact", order.getContact());
                    return orderMap;
                })
                .collect(Collectors.toList());
    }

    public synchronized void deleteOrder(Long orderId){
        Optional<Order> userOrder = orderRepository.findById(orderId);
        if(userOrder.isPresent())   {
            orderRepository.deleteById(orderId);
        }else{
            throw new IllegalArgumentException("Cart not found with ID: " + orderId);
        }
    }

    public synchronized Map<String, Object> patchOrder(Long orderId, Map<String, Object> patchData) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            // Update fields based on the patchData
            if (patchData.containsKey("shippingAddress")) {
                order.setShippingAddress((String) patchData.get("shippingAddress"));
            }
            if (patchData.containsKey("paymentMethod")) {
                order.setPaymentMethod((String) patchData.get("paymentMethod"));
            }
            if (patchData.containsKey("quantity")) {
                int newQuantity = (int) patchData.get("quantity");
                order.setQuantity(newQuantity);

                // Recalculate total price based on the new quantity
                BigDecimal unitPrice = order.getClothing().getPrice();
                BigDecimal newTotalPrice = unitPrice.multiply(BigDecimal.valueOf(newQuantity));
                order.setTotalPrice(newTotalPrice);
            }
            if (patchData.containsKey("status")) {
                order.setStatus((boolean) patchData.get("status"));
            }
            // Add more fields to update as needed

            // Save the updated order
            Order updatedOrder = orderRepository.save(order);

            // Return the updated order details
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("orderId", updatedOrder.getOrderId());
            orderMap.put("clothingId", updatedOrder.getClothing().getId());
            orderMap.put("name", updatedOrder.getClothing().getName());
            orderMap.put("price", updatedOrder.getClothing().getPrice());
            orderMap.put("image", updatedOrder.getClothing().getImagePath());
            orderMap.put("userId", updatedOrder.getUser().getId());
            orderMap.put("username", updatedOrder.getUser().getUsername());
            orderMap.put("userEmail", updatedOrder.getUser().getEmail());
            orderMap.put("quantity", updatedOrder.getQuantity());
            orderMap.put("shippingAddress", updatedOrder.getShippingAddress());
            orderMap.put("paymentMethod", updatedOrder.getPaymentMethod());
            orderMap.put("totalPrice", updatedOrder.getTotalPrice());
            orderMap.put("status", updatedOrder.getStatus());
            orderMap.put("orderDate", updatedOrder.getOrderDate());

            return orderMap;
        } else {
            // Handle the case where the order is not found
            throw new IllegalArgumentException("Order not found with ID: " + orderId);
        }
    }
}
