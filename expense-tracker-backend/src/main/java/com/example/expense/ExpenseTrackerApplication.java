package com.example.expense;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.expense.model.Transaction;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}

	@PostConstruct
	public void init() {
		Transaction transaction = new Transaction("income", 1000.0, "Salary");
		transaction.setDate(java.time.LocalDate.now());
		System.out.println("Sample Transaction Created: " + transaction.getType() + ", " + transaction.getAmount() + ", " + transaction.getCategory() + ", " + transaction.getDate());
	}

}
