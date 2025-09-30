package com.example.expense.service;

import org.springframework.stereotype.Service;

import com.example.expense.model.Transaction;

import java.util.List;

@Service
public class TransactionService {
    private final List<Transaction> transactions = new java.util.ArrayList<>();

    public List<Transaction> getAllTransactions() {
        return transactions;
    }

    public Transaction addTransaction(Transaction transaction) {
        transactions.add(transaction);
        return transaction;
    }
}
