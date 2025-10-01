const form = document.getElementById('transactionForm');
const list = document.getElementById('transactionList');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const transaction = {
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: new Date().toISOString().split('T')[0]
    };

    const res = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });

    const data = await res.json();
    addTransactionToList(data);

    form.reset();
});

let transactions = [];

function updateSummary() { 
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    totalIncomeEl.textContent = income.toFixed(2);
    totalExpenseEl.textContent = expenses.toFixed(2);
    balanceEl.textContent = (income - expenses).toFixed(2);
}

async function loadTransactions() { 
    const res = await fetch('http://localhost:8080/api/transactions');
    const transactions = await res.json();
    list.innerHTML = '';
    transactions.forEach(t => addTransactionToList(t));
    updateSummary();
}

function addTransactionToList (transaction) {
    transactions.push(transaction);

    const li = document.createElement('li');
    li.textContent = `${transaction.date} | ${transaction.category} | ${transaction.amount}€`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        transactions = transactions.filter(t => t.id !== transaction.id);
        removeTransaction(transaction.id); // Call the function to remove from backend
        li.remove();
        updateSummary();
    };

    li.classList.add(transaction.type);
    li.appendChild(deleteBtn);
    list.appendChild(li);


    updateSummary();
}

async function removeTransaction (id) {
    await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: "DELETE"
    });
    updateSummary();
}

loadTransactions();