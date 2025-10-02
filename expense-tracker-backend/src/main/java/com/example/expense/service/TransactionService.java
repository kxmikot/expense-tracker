package com.example.expense.service;

import org.springframework.stereotype.Service;

import com.example.expense.model.Transaction;

import java.util.List;
import java.util.Iterator;

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

    public boolean deleteTransaction(Long id) {
        Iterator<Transaction> iterator = transactions.iterator();
        while (iterator.hasNext()) {
            Transaction transaction = iterator.next();
            if (transaction.getId().equals(id)) {
                iterator.remove();
                return true;
            } 
        }
        return false;
    } 

    public Transaction editTransaction (Long id, Transaction updTransaction) {
        for (Transaction transaction : transactions) {
            if (transaction.getId().equals(id)) {
                transaction.setType(updTransaction.getType());
                transaction.setAmount(updTransaction.getAmount());
                transaction.setCategory(updTransaction.getCategory());
                return transaction;
            }
        }
        return null;
    }

    public boolean clearAllTransactions() {
        transactions.clear();
        return true;
    }
}
