import { v4 as uuidV4 } from 'uuid'
export let accountManager = (function(){
    class Account{
        constructor(owner,name, currency, balance, transactions = []){
            this.id = uuidV4(); 
            this.owner = owner;
            this.name = name;
            this.currency = currency; 
            this.balance = balance;
            this.transactions = transactions;
        }
    }
    class SavingsAccount{
        constructor(owner, name, currency,  target, balance, percentage, icon){
            this.id = uuidV4();
            this.owner = owner; 
            this.name = name;
            this.currency = currency; 
            this.balance = balance;
            this.target = target;
            this.percentage = percentage;
            this.icon = icon;
        }
    }
    class Transaction{
        constructor( date, type, amount, description = '', accountsId){
            this.id = uuidV4(); 
            this.date = date;
            this.type = type;
            this.amount = amount;
            this.description = description;
            this.accountsId = accountsId;
        }
    }
    class Category {
        constructor(owner, title, type, tag){
            this.title = title;
            this.id = uuidV4();
            this.type = type;
            this.tag = tag;
            this.owner = owner;
        }
    }
    
    class AccountManager {
            
        constructor() {
            this.accounts = [];
            this.savingsAccounts = [];
            this.customCategories = [];
           
            if(localStorage.getItem('accounts')){
                this.accounts = JSON.parse(localStorage.getItem('accounts'));
            }
            if(localStorage.getItem('savings')){
                this.savingsAccounts = JSON.parse(localStorage.getItem('savings'));
            }
            if(localStorage.getItem('categories')){
                this.customCategories = JSON.parse(localStorage.getItem('categories'));
            }
        }
        getAllAccounts() {
            return JSON.parse(localStorage.getItem('accounts')) || [];
        }
        getAllUserAccounts(owner){
            let allAccounts = this.getAllAccounts();
            let userAccounts = [];
            allAccounts.map(a => {
                if(a.owner === owner){
                    userAccounts.push(a);
                }
            })
            return userAccounts;
        }
        checkAccountBalance(accountId){
            let userAccounts = this.getAllUserAccounts();
            let balance = 0;
            userAccounts.map(a => {
                if(a.id === accountId){
                    balance = a.balance;
                }
            })
            return balance;
        }
        showAllTransactionForThisAccount(accountId){
            let allAccounts = this.getAllAccounts();
            let transaction = [];
            allAccounts.map(a => {
                if(a.id === accountId){
                    transaction = [...a.transaction];
                }
            })
        }
        addAccount(id, nameOfAccount, owner, transactions, currency, balance) {
            let accounts = this.getAllAccounts();
            let newAccount = new Account(id, nameOfAccount, owner, transactions, currency, balance)
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
        addTransaction( date, type, amount, description, accountsId, owner){
            let accounts = this.getAllAccounts();
            let transaction = new Transaction( date, type, amount, description, accountsId);
            accounts = accounts.map(a => {
                if(a.id === accountsId){
                    if(transaction.type === "outcome" && a.balance >= transaction.amount){
                        a.balance -= transaction.amount;
                        a.transactions.push(transaction);
    
                    }else if(transaction.type === "income"){
                        //ако този клиент има спестовна сметка със заложен процент , премести % в спестовната сметка
                        let savingsAccount = this.checkForSavingsAccount(owner);
                        if(savingsAccount){
                            let currentIncome = transaction.amount * savingsAccount.percentage
                            savingsAccount.balance += currentIncome;
    
                                let allSavingsAccount = this.getAllSavingsAccounts();
                                allSavingsAccount = allSavingsAccount.map(s => {
                                    if(s.owner === owner){
                                        s.balance = savingsAccount.balance;
                                    }
                                    })
                            //localStorage.setItem('savings', JSON.stringify(savings));
                            a.balance += (transaction.amount - currentIncome);
                            a.transactions.push(transaction);
                        }else{
                            a.transactions.push(transaction);

                            a.balance += transaction.amount;
                            a.transactions.push(transaction);
                        }
                        
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
        checkForSavingsAccount(owner){
            let accounts = this.getAllSavingsAccounts();
            let existSavingsAccount = accounts.find(accounts => accounts.owner === owner);
            return existSavingsAccount;
        }
        
        createSavingsAccount(owner, name, currency,  target, balance, percentage, icon) {
            let savings = this.getAllSavingsAccounts();
            let newAccount = new SavingsAccount(owner, name, currency,  target, balance, percentage, icon)
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
        getAllCategories() {
            return JSON.parse(localStorage.getItem('categories')) || [];
        }
        addCustomCategory(owner, title, type, tag){
            let allCategories = this.getAllCategories();
            let newCategory = new Category(owner, title, type, tag);
            allCategories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(allCategories));
        }
        checkForUserCustomCategories(owner){
            let allCategories = this.getAllCategories();
            let customCategories = []
            allCategories.map(c => {
                if(c.owner === owner){
                    customCategories.push(c);
                }
            })
            return customCategories;
        }
    }
    return new AccountManager()

})()
