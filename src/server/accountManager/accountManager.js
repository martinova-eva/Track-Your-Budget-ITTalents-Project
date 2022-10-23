import { v4 as uuidV4 } from 'uuid'
export let accountManager = (function(){
    class Account{
        constructor(ownerId,name, currency, balance, transactions = []){
            this.id = uuidV4(); 
            this.ownerId = ownerId;
            this.name = name;
            this.currency = currency; 
            this.balance = balance;
            this.transactions = transactions;
        }
    }
    class SavingsAccount{
        constructor(id, name, ownerId, target, balance, percentage){
            this.id = uuidV4(); 
            this.name = name;
            this.ownerId = ownerId;
            this.balance = balance;
            this.target = target;
            this.percentage = percentage;
        }
    }
    class Transaction{
        constructor(id, date, type, amount, description, accountsId){
            this.id = uuidV4(); 
            this.date = date;
            this.type = type;
            this.amount = amount;
            this.description = description;
            this.accountsId = accountsId;
        }
    }
    
    class AccountManager {
            
        constructor() {
            this.accounts = [];
            this.savingsAccounts = []
           
            if(localStorage.getItem('accounts')){
                this.accounts = JSON.parse(localStorage.getItem('accounts'));
            }
            if(localStorage.getItem('savings')){
                this.savingsAccounts = JSON.parse(localStorage.getItem('savings'));
            }
        }
        getAllAccounts() {
            return JSON.parse(localStorage.getItem('accounts')) || [];
        }
        
        addAccount(id, nameOfAccount, ownerId, transactions, currency, balance) {
            let accounts = this.getAllAccounts();
            //ownerId,name, currency, balance, transactions = []
            let newAccount = new Account(id, nameOfAccount, ownerId, transactions, currency, balance)
            accounts.push(newAccount);
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        removeAccount(id){
            let accounts = this.getAllAccounts();
            accounts = accounts.map(a => {
                if(a.id !== id){
                    return a;
                }
            })
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        addTransaction( date, type, amount, description, accountsId, ownerId){
            let accounts = this.getAllAccounts();
            let transaction = new Transaction( date, type, amount, description, accountsId);
            accounts = accounts.map(a => {
                if(a.id === accountsId){
                    if(transaction.type === "outcome" && a.balance >= transaction.amount){
                        a.balance -= transaction.amount;
                        a.transactions.push(transaction);
    
                    }else if(transaction.type === "income"){
                        //ако този клиент има спестовна сметка със заложен процент , премести % в спестовната сметка
                        let savingsAccount = this.checkForSavingsAccount(ownerId);
                        if(savingsAccount){
                            let currentIncome = transaction.amount * savingsAccount.percentage
                            savingsAccount.balance += currentIncome;
    
                           let allSavingsAccount = this.getAllSavingsAccounts();
                           allSavingsAccount = allSavingsAccount.map(s => {
                            if(s.ownerId === ownerId){
                                s.balance = savingsAccount.balance;
                            }
                            })
                            //localStorage.setItem('savings', JSON.stringify(savings));
                            a.balance += (transaction.amount - currentIncome);
                            a.transactions.push(transaction);
                        }else{
                            a.balance += transaction.amount;
                            a.transactions.push(transaction);
                        }
                        
                    }else{
                        alert('You dont`t have enough money for this transaction');
                    }
                   
                }
            })
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        removeTransaction( transactionId, accountsId){
            let accounts = this.getAllAccounts();
            accounts = accounts.map(a => {
                if(a.id === accountsId){
                    a.transactions = a.transactions.map(tr => {
                        if(tr.id === transactionId){
                            if(tr.type === "outcome"){
                                a.balance += tr.amount;
                            }else{
                                a.balance -= tr.amount; 
                            }
                        }
                    })
                }else{
                    return a;
                }
            })
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    
    
        getAllSavingsAccounts() {
            return JSON.parse(localStorage.getItem('savings')) || [];
        }
        checkForSavingsAccount(ownerId){
            let accounts = this.getAllSavingsAccounts();
            let existSavingsAccount = accounts.find(accounts => accounts.ownerId === ownerId);
            return existSavingsAccount;
        }
        createSavingsAccount(id, nameOfAccount, ownerId, target, balance, percentage) {
            let savings = this.getAllSavingsAccounts();
            let newAccount = new SavingsAccount(id, nameOfAccount, ownerId, target, balance, percentage)
            savings.push(newAccount);
            localStorage.setItem('savings', JSON.stringify(savings));
        }
        removeSavingsAccount(id){
            let accounts = this.getAllSavingsAccounts();
            accounts = accounts.map(a => {
                if(a.id !== id){
                    return a;
                }
            })
            localStorage.setItem('savings', JSON.stringify(accounts));
        }
    }
    return new AccountManager()

})()
