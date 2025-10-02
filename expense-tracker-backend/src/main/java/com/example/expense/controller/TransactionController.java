package com.example.expense.controller;

import org.springframework.web.bind.annotation.*;

import com.example.expense.model.Transaction;
import com.example.expense.service.TransactionService;

import java.util.List;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        boolean removed = transactionService.deleteTransaction(id);
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> editTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        Transaction updatedTransaction = transactionService.editTransaction(id, transaction);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
