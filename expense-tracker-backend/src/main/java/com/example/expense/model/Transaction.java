package com.example.expense.model;

import java.time.LocalDate;

public class Transaction {
    private Long id;
    private String type; // "income" | "expense"
    private String category;
    private double amount;
    private LocalDate date;

    private static Long idCounter = 0L; // Simple ID generator

    public Transaction() {
        this.id = ++idCounter;
    }

    public Transaction(String type, double amount, String category) {
        this.type = type;
        this.amount = amount;
        this.category = category;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
} 
