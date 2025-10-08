# Expense Tracker 💶

**Project Overview**  
A simple web application for tracking personal income and expenses. Built with **Java + Spring Boot** for the backend and **HTML/JavaScript** for the frontend. All data is stored in memory, making it lightweight and easy to run without a database.

---

## Key Features 🥇
- **Add Transactions** – Record income or expense with category and amount.
- **Real-Time Summary** – View total income, total expenses, and current balance instantly.
- **In-File Storage** – All data persists in db file.
- **Minimalist UI** – Clean and strict design for better readability.

---

## Project Structure 📂
```
expense-tracker/
│
├── expense-tracker-backend
│ └──  src/main/java/com/example/expense
│    ├── controller/TransactionController.java
│    ├── model/Transaction.java
│    ├── repository/TransactionRepository.java   
│    └── service/TransactionService.java 
│ └──  pom.xml # Maven dependencies
│
├── frontend
│ ├── index.html # Frontend interface
│ ├── style.css # Styles for list and summary
│ └── script.js # Scripts
└
```
---

## Technologies Used ⚛️
- **Backend:** Java 17, Spring Boot 3, REST API, H2
- **Frontend:** HTML, CSS, JavaScript
- **Build Tool:** Maven

---

## Getting Started 🏃‍♀️‍➡️

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
3. **Open the frontend**
Open *frontend/index.html* in a browser.
4. **Access the API**
Frontend communicates with backend at http://localhost:8080/api/transactions.

---

## Future Improvements 🕒
+ Add persistent storage (SQLite, H2, or PostgreSQL) ✅
+ Implement transaction deletion and editing ✅
+ Enhance UI with charts and filters for better visualization ❌

---

## Screenshot 👁‍🗨
<img width="2813" height="1454" alt="Image" src="https://github.com/user-attachments/assets/3d0a8138-4964-4e13-9bcf-dae13ada71c0" />