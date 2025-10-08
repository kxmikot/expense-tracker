package com.example.expense.service;

import com.example.expense.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expense.model.Transaction;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public Transaction addTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        repository.deleteById(id);
    } 

    public Transaction editTransaction (Long id, Transaction updTransaction) {
        return repository.findById(id).map(t -> {
            t.setCategory(updTransaction.getCategory());
            t.setType(updTransaction.getType());
            t.setAmount(updTransaction.getAmount());
            t.setDate(updTransaction.getDate());
            return repository.save(t);
        }).orElse(null);
    }

    public void clearAllTransactions() {
        repository.deleteAll();
    }
}
