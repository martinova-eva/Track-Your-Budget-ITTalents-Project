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
                            statisticData.push(tr);
                            console.log(tr);
                        }
                    })
                }
            })
            console.log(statisticData);
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
        addTransaction(name, date, type, amount, description, title, accountsId, owner){
            let accounts = this.getAllAccounts();
            let transaction = new Transaction(name, date, type, amount, description, title, accountsId);
            console.log(transaction);
            accounts.map(a => {
                if(a.id === accountsId){
                    if(transaction.type === "outcome" && Number(a.balance) >= Number(transaction.amount)){
                        a.balance = Number(a.balance) -  Number(transaction.amount);
                        a.transactions.push(transaction);

                    }else if(transaction.type === "income"){
                        //да добавя и преизчисление за превалутирането
                        let savingsAccount = this.checkForSavingsAccount(owner);
                        if(savingsAccount){
                            let savingsIncome = (Number(transaction.amount) * Number(savingsAccount.percentage)/100);
                           
    
                                let allSavingsAccounts = this.getAllSavingsAccounts();
                                 allSavingsAccounts.map(s => {
                                        if(s.owner === owner){
                                            s.balance =  Number(savingsAccount.balance)  + Number(savingsIncome);
                                        }
                                    })
                            localStorage.setItem('savings', JSON.stringify(allSavingsAccounts));
                            a.balance = (Number(a.balance) + ((Number(transaction.amount) - Number(savingsIncome))));
                            transaction.amount = (Number(transaction.amount) - Number(savingsIncome));
                            a.transactions.push(transaction);
                        }else{
                            a.balance = Number(a.balance) + Number(transaction.amount);
                            a.transactions.push(transaction);
                        }
                        
                    }                   
                }
                //логика за сортиране на транзакциите, за да държи винаги сортиран масива
                a.transactions.sort(function(a, b){
                    return new Date(b.date) - new Date(a.date);
                });
            });
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
        removeTransaction( transactionId, accountsId){
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
                                //тук ще има логика и с превалутирането и преизчисление в спестовния акаунт
                                a.balance = Number(a.balance) - Number(tr.amount);
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
        // removeSavingsAccount(id){
        //     let accounts = this.getAllSavingsAccounts();
        //     accounts = accounts.map(a => {
        //         if(a.id !== id){
        //             return a;
        //         }
        //     })
        //     localStorage.setItem('savings', JSON.stringify(accounts));
        // }
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
                if (c.type === "income") {
                  iconsArrOfObjects.map(i => {
                    if(i.title === c.tag){
                      c.tag = i.tag;
                    }
                  });
                  let isExist = false;
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
                  let isExist = false;
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
