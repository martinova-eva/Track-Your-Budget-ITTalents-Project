import { ConstructionRounded } from '@mui/icons-material';
import moment from 'moment/moment';
import { v4 as uuidV4 } from 'uuid';
import { iconsArrOfObjects } from '../../components/categoryCreator/icons';
import { possibleIncomeArr } from '../../components/categoryCreator/listOfAllIncomes';
import { possibleOutcomeArr } from '../../components/categoryCreator/listOfAllOutcomes';

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
        constructor( name, date, type, amount, description = '', title, accountsId){
            this.name = name;
            this.id = uuidV4(); 
            this.date = date;
            this.type = type;
            this.amount = amount;
            this.description = description;
            this.title = title;
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
    class StatisticObject{
        constructor(name, value){
            this.name = name;
            this.value = value;
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
        checkAccountBalance(accountId, owner){
            let userAccounts = this.getAllUserAccounts(owner);
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
                   transaction = [...a.transactions];
                }
            })
            return transaction;
        }
        showLastFiveTransactionsForAccount(accountId){
            let allAccounts = this.getAllAccounts();
            let transaction = [];
            allAccounts.map(a => {
                if(a.id === accountId){
                    transaction = a.transactions.slice(0,5);
                }
            })
            return transaction;
        }
        showStatistics(accountId){
            let allAccounts = this.getAllAccounts();
            let statisticData = [];
            allAccounts.map(a => {
                if(a.id === accountId){
                    a.transactions.map(tr => {
            
                        const transactionType = statisticData.find(item => item.name === tr.name);

                        if(transactionType){
                            transactionType.value =Number(transactionType.value) + Number(tr.amount);
                        }else{
                            statisticData.push(new StatisticObject(tr.name, tr.amount))
                        }
                    })
                }
            })
            return statisticData;
        }
        showStatisticsByTransactionType(accountId, type){
            let allAccounts = this.getAllAccounts();
            let statisticData = [];
            allAccounts.map(a => {
                if(a.id === accountId){
                    a.transactions.map(tr => {
                        if(tr.type === type){
                            const transactionType = statisticData.find(item => item.name === tr.name);

                            if(transactionType){
                                transactionType.value =Number(transactionType.value) + Number(tr.amount);
                            }else{
                                statisticData.push(new StatisticObject(tr.name, tr.amount))
                            }
                        }
                        
                    })
                }
            })
            return statisticData;
        }
        showStatisticsByDateRangeForChart(arrOfTransactions){
            let statisticData = [];
            arrOfTransactions.map(tr => {
                
                    const transactionType = statisticData.find(item => item.name === tr.name);

                    if(transactionType){
                        transactionType.value =Number(transactionType.value) + Number(tr.amount);
                    }else{
                        statisticData.push(new StatisticObject(tr.name, tr.amount))
                    }
                
                
            })
            return statisticData;
        }
        showStatisticsByDateRange(accountId, range){
            let allAccounts = this.getAllAccounts();
            let statisticData = [];
            allAccounts.map(a => {
                if(a.id === accountId){
                    a.transactions.map(tr => {
                        let isBetween = moment(tr.date).isBetween(new Date(range[0]), new Date(range[1]),  'days', "[]");
                        if(isBetween){
                            let date;
                            let arrOfDate = tr.date.split('.');
                            date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
                            tr.date = date;
                            statisticData.push(tr);
                        }
                    })
                }
            })
            return statisticData;
        }

        addAccount(id, nameOfAccount, owner, transactions, currency, balance) {
            let accounts = this.getAllAccounts();
            let newAccount = new Account(id, nameOfAccount, owner, transactions, currency, balance)
            accounts.push(newAccount);
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        removeAccount(id){
            let accounts = this.getAllAccounts();
            let index = accounts.indexOf(id)
            accounts.splice(index,1)
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        transferFunds(transferId, recipientId){
            let accounts = this.getAllAccounts();
            if(transferId !== recipientId){
                let nameOfTransferAccount;
                let transferAmount;
                let transferCurrency;
                accounts.map(a => {
                    if(a.id === transferId){
                        nameOfTransferAccount = a.name;
                        transferAmount = Number(a.balance);
                        transferCurrency = a.currency;
                    }
                })
                if(transferAmount > 0){
                    accounts.map(a => {
                        if(a.id === recipientId){
                            if(transferCurrency === "BGN" && ( a.currency === "USD"|| a.currency === "EUR")){ 
                                transferAmount *= 0.51;
                            }else if(transferCurrency === "USD" && a.currency === "BGN"){ 
                                transferAmount *= 1.94;
                            }else if(transferCurrency === "USD" && a.currency === "EUR"){ 
                                transferAmount *= 0.99;
                            }else if(transferCurrency === "EUR" && a.currency === "BGN"){ 
                                transferAmount *= 1.96;
                            }else if(transferCurrency === "EUR" && a.currency === "USD"){ 
                                transferAmount *= 1.01;
                            }

                        a.transactions.push(new Transaction(`Transfer form ${nameOfTransferAccount}`, new Date(), transferAmount), "", recipientId)
                        }
                    })
                }
            }
           localStorage.setItem('accounts', JSON.stringify(accounts)); 
        }
        addTransaction(name, date, type, amount, description, title, accountsId, owner){
            let accounts = this.getAllAccounts();
            let transaction = new Transaction(name, date, type, amount, description, title, accountsId);
            accounts.map(a => {
                if(a.id === accountsId){
                    if(transaction.type === "outcome" && Number(a.balance) >= Number(transaction.amount)){
                        a.balance = Number(a.balance) -  Number(transaction.amount);
                        a.transactions.push(transaction);

                    }else if(transaction.type === "income"){
                        let savingsAccount = this.checkForSavingsAccount(owner);
                        if(savingsAccount){
                            let savingsIncome = 0;
                                if(a.currency === savingsAccount.currency){
                                    savingsIncome = (Number(transaction.amount) * Number(savingsAccount.percentage)/100);
                                }else if(a.currency === "EUR" &&  savingsAccount.currency === "BGN"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*1.96;
                                }else if(a.currency === "EUR" &&  savingsAccount.currency === "USD"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*1.01;
                                }else if(a.currency === "BGN" &&  savingsAccount.currency === "USD"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*0.51;
                                }else if(a.currency === "BGN" &&  savingsAccount.currency === "EUR"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*0.51;
                                }else if(a.currency === "USD" &&  savingsAccount.currency === "EUR"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*0.99;
                                }else if(a.currency === "USD" &&  savingsAccount.currency === "BGN"){
                                    savingsIncome = ((Number(transaction.amount) * Number(savingsAccount.percentage)/100))*1.94;
                                }

                                let allSavingsAccounts = this.getAllSavingsAccounts();
                                 allSavingsAccounts.map(s => {
                                        if(s.owner === owner){
                                            s.balance = (Number(savingsAccount.balance)  + Number(savingsIncome)).toFixed(2);
                                        }
                                    });
                            localStorage.setItem('savings', JSON.stringify(allSavingsAccounts));
                            
                            transaction.amount = (Number(transaction.amount) - (Number(transaction.amount)*(savingsAccount.percentage/100)));
                            a.balance = (Number(a.balance) + (Number(transaction.amount)));

                            a.transactions.push(transaction);
                        }else{
                            a.balance = Number(a.balance) + Number(transaction.amount);
                            a.transactions.push(transaction);
                        }
                        
                    }                   
                }
                a.transactions.sort(function(a, b){
                    return new Date(b.date) - new Date(a.date);
                });
            });
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        removeTransaction( transactionId, accountsId, owner){
            let accounts = this.getAllAccounts();
            accounts.map(a => {
                
                if(a.id === accountsId){
                    let indexOfTransaction;
                    a.transactions.map((tr, i) => {
                        
                        if(tr.id === transactionId){
                            indexOfTransaction = i;
                            if(tr.type === "outcome"){
                                a.balance = Number(a.balance) + Number(tr.amount);
                            }else{
                                let savingsAccount = this.checkForSavingsAccount(owner);
                                if(savingsAccount){
                                    let ratio = (Number(savingsAccount.percentage))/100;
                                  
                                    if(a.currency === savingsAccount.currency){
                                        savingsAccount.balance = Number(savingsAccount.balance)- Number(tr.amount)*ratio;

                                    }else if(a.currency === "EUR" &&  savingsAccount.currency === "BGN"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*1.96;

                                    }else if(a.currency === "EUR" &&  savingsAccount.currency === "USD"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*1.01;

                                    }else if(a.currency === "BGN" &&  savingsAccount.currency === "USD"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*0.51;

                                    }else if(a.currency === "BGN" &&  savingsAccount.currency === "EUR"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*0.51;

                                    }else if(a.currency === "USD" &&  savingsAccount.currency === "EUR"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*0.99;

                                    }else if(a.currency === "USD" &&  savingsAccount.currency === "BGN"){
                                        savingsAccount.balance = Number(savingsAccount.balance)- (Number(tr.amount)*ratio)*1.94;
                                    }
                                    let allSavingsAccounts = this.getAllSavingsAccounts();
                                    allSavingsAccounts.map(s => {
                                        if(s.owner === owner){
                                            s.balance =  (savingsAccount.balance).toFixed(2);
                                        }
                                    });
                                    localStorage.setItem('savings', JSON.stringify(allSavingsAccounts));
                                }
                                    a.balance = (Number(a.balance) - Number(tr.amount)).toFixed(2);
                                
                            }
                        }
                    })
                    a.transactions.splice(indexOfTransaction, 1);
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
            let index = accounts.indexOf(id)
            accounts.splice(index,1)
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
            customCategories.map(c => {
                let isExist = false;
                if (c.type === "income") {
                        iconsArrOfObjects.map(i => {
                            if(i.title === c.tag){
                            c.tag = i.tag;
                            }
                        });
                        
                        possibleIncomeArr.map(e => {
                            if(e.id === c.id){
                                isExist = true;
                            }
                        })
                        if(!isExist){
                            possibleIncomeArr.push(c);
                        }
                    
                } else {
                        iconsArrOfObjects.map(i => {
                            if(i.title === c.tag){
                            c.tag = i.tag;
                            }
                        });
                        
                        possibleOutcomeArr.map(e => {
                            if(e.id === c.id){
                                isExist = true;
                            }
                        })
                        if(!isExist){
                            possibleOutcomeArr.push(c);
                        }
                    
                }
              })
        }
        getAccountCurrency(accountId){
            let currency = ''
            let accounts = this.getAllAccounts()
            accounts.map(ac => {
                if(ac.id === accountId){
                    currency =  ac.currency;
                }
            })
            return currency;
        }
        getFormatedTransactions(AccountId){
            let accounts = this.getAllAccounts();
            let transactions = [];
            accounts.map(a => {
                if (a.id === AccountId) {
                    a.transactions.map(tr => {
                        let date;
                        let arrOfDate = tr.date.split('.');
                        date = arrOfDate[1] + "." + arrOfDate[0] + '.' + arrOfDate[2];
                        tr.date = date;
                    })
                    transactions = [...a.transactions];
                }
            });
            return transactions;
        }
   
        getAccountName(AccountId){
            let accountName = '';
            let accounts = this.getAllAccounts();
            accounts.map(a => {
                if (a.id === AccountId) {
                     accountName = a.name;
                }
               
            });
            return accountName;
        }
        getAccountsForTransfer(accountId){
            let accounts = this.getAllAccounts()
            let filteredAccounts = [];
            accounts.map(ac => {
                if(ac.id !== accountId){
                    filteredAccounts.push(ac)
                }
            })
            return(filteredAccounts);
        }
        
    
    }
    return new AccountManager()

})()
