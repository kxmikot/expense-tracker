# Expense Tracker

**Project Overview**  
A simple web application for tracking personal income and expenses. Built with **Java + Spring Boot** for the backend and **HTML/JavaScript** for the frontend. All data is stored in memory, making it lightweight and easy to run without a database.

---

## Key Features
- **Add Transactions** – Record income or expense with category and amount.
- **Real-Time Summary** – View total income, total expenses, and current balance instantly.
- **In-Memory Storage** – All data persists only while the server is running.
- **Minimalist UI** – Clean and strict design for better readability.

---

## Project Structure
```
expense-tracker/
│
├── expense-tracker-backend
│ └──  src/main/java/com/example/expense
│    ├── controller/TransactionController.java
│    ├── model/Transaction.java
│    └── service/TransactionService.java 
│ └──  pom.xml # Maven dependencies
│
├── frontend
│ ├── index.html # Frontend interface
│ └── style.css # Styles for list and summary
│ └── script.js # Scripts
└
```
---

## Technologies Used
- **Backend:** Java 17, Spring Boot 3, REST API
- **Frontend:** HTML, CSS, JavaScript
- **Build Tool:** Maven

---

## Getting Started

1. **Clone the repository**  
```bash
git clone <repository-url>
cd expense-tracker
cd expense-tracker-backend
```
2. **Run the backend**
```bash
mvn spring-boot:run
```