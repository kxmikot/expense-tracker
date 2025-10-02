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

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');

    editBtn.onclick = async () => {
        const newCategory = await showPrompt("Enter new category:", transaction.category);
        const newAmount = parseFloat(await showPrompt("Enter new amount:", transaction.amount));
        const newType = await showPrompt("Enter new type (income/expense):", transaction.type);

        if (newCategory && !isNaN(newAmount) && (newType === 'income' || newType === 'expense')) {
            const updatedTransaction = { // Create updated transaction object
                ...transaction,
                category: newCategory,
                amount: newAmount,
                type: newType
            };
            
            transactions = transactions.map(t => 
                t.id === transaction.id ? updatedTransaction : t
            );
            
            await editTransaction(transaction.id, updatedTransaction);
            
            li.textContent = `${updatedTransaction.date} | ${updatedTransaction.category} | ${updatedTransaction.amount}€`;
            
            li.className = '';
            li.classList.add(updatedTransaction.type);

            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            updateSummary();
        } else {
            showAlert("Invalid input. Please try again.");
        }

    }

    li.classList.add(transaction.type);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    list.appendChild(li);

    updateSummary();
}

async function removeTransaction (id) {
    await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: "DELETE"
    });
    updateSummary();
}

async function editTransaction (id, updatedTransaction) {
    const res = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction)
    });

    const data = await res.json();
    const index = transactions.findIndex(t => t.id === id);
    
    if (index !== -1) {
        transactions[index] = data;
    }
}

const clearAllBtn = document.getElementById('clearAllBtn'); // Get the "Clear All" button

clearAllBtn.addEventListener('click', async () => {
    if (transactions.length !== 0) {
        const confirmed = await showCustomConfirm("Are you sure you want to clear all transactions?");
        if (confirmed) {
            clearAllTransactions();
        } 
    } else {
        await showAlert("No transactions to clear.");
    }
});

async function clearAllTransactions() {
    await fetch('http://localhost:8080/api/transactions', {
        method: 'DELETE'
    });

    transactions = [];
    list.innerHTML = '';
    updateSummary();
}

function showCustomConfirm(message) { // Custom confirm function
    return new Promise ((resolve) => {
        const modal = document.getElementById('customConfirm');
        const confirmMessage = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');
        const noBtn = document.getElementById('confirmNo');

        confirmMessage.textContent = message;
        modal.style.display = 'flex';

        yesBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(true);
        }

        noBtn.onclick = () => {
            modal.style.display ='none';
            resolve(false);
        }
    });
}

function showAlert (message) { // Custom alert function
    return new Promise ((resolve) => {
        const modal = document.getElementById('customAlert');
        const alertMessage = document.getElementById('alertMessage');
        const okBtn = document.getElementById('alertOk');

        alertMessage.textContent = message;
        modal.style.display = 'flex';

        okBtn.onclick = () => {
            modal.style.display = 'none';
            resolve();
        }
    })
}

function showPrompt(message, defaultValue = '') { // Custom prompt function
    return new Promise ((resolve) => {
        const modal = document.getElementById('customPrompt');
        const promptMessage = document.getElementById('promptMessage');
        const promptInput = document.getElementById('promptInput');
        const submitBtn = document.getElementById('promptSubmit');
        const cancelBtn = document.getElementById('promptCancel');

        promptMessage.textContent = message;
        promptInput.value = defaultValue;
        modal.style.display = 'flex';

        submitBtn.onclick = () => {
            const value = promptInput.value.trim();
            modal.style.display = 'none';
            resolve(value);
        }

        cancelBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(null);
        }
    });
}

loadTransactions();