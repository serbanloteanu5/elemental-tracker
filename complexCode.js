// Filename: complexCode.js
// Content: Complex code showcasing a digital banking system

// Importing necessary modules
const readline = require('readline');

// Creating a class for Bank Account
class BankAccount {
  constructor(accountNumber, accountHolder, balance) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient balance.");
    } else {
      this.balance -= amount;
      console.log(`Withdrawn ${amount} from Account ${this.accountNumber}.`);
    }
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount} to Account ${this.accountNumber}.`);
  }

  getBalance() {
    console.log(`Account ${this.accountNumber} balance: ${this.balance}`);
  }
}

// Creating a class for Bank Customer
class BankCustomer {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
    console.log(`Account ${account.accountNumber} added to Customer ${this.name}.`);
  }

  getAccount(accountNumber) {
    const account = this.accounts.find((acc) => acc.accountNumber === accountNumber);
    if (account) {
      return account;
    } else {
      console.log(`Account ${accountNumber} not found.`);
    }
  }
}

// Creating a class for Bank
class Bank {
  constructor() {
    this.customers = [];
  }

  addCustomer(customer) {
    this.customers.push(customer);
    console.log(`Customer ${customer.name} added to the bank.`);
  }

  getCustomer(name) {
    const customer = this.customers.find((cust) => cust.name === name);
    if (customer) {
      return customer;
    } else {
      console.log(`Customer ${name} not found.`);
    }
  }
}

// Creating instances of the Bank, Customer, and Accounts
const bank = new Bank();

const customer1 = new BankCustomer("John");
const customer2 = new BankCustomer("Jane");

bank.addCustomer(customer1);
bank.addCustomer(customer2);

const account1 = new BankAccount("1001", "John Doe", 1000);
const account2 = new BankAccount("1002", "Jane Doe", 2000);

customer1.addAccount(account1);
customer2.addAccount(account2);

// User interaction loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the Digital Bank!");

rl.question("Enter your name: ", (name) => {
  const customer = bank.getCustomer(name);
  if (customer) {
    console.log(`Welcome back, ${name}!`);
    console.log("Select an account: ");
    for (let i = 0; i < customer.accounts.length; i++) {
      const account = customer.accounts[i];
      console.log(`${i + 1}. Account ${account.accountNumber}`);
    }
    rl.question("Enter account number: ", (accountNumber) => {
      const account = customer.getAccount(accountNumber);
      if (account) {
        console.log(`Selected Account ${account.accountNumber}, Holder: ${account.accountHolder}`);
        console.log("Choose an action: ");
        console.log("1. Withdraw");
        console.log("2. Deposit");
        console.log("3. Get Balance");

        rl.question("Enter action number: ", (action) => {
          switch (action) {
            case "1":
              rl.question("Enter amount to withdraw: ", (amount) => {
                account.withdraw(parseFloat(amount));
                rl.close();
              });
              break;
            case "2":
              rl.question("Enter amount to deposit: ", (amount) => {
                account.deposit(parseFloat(amount));
                rl.close();
              });
              break;
            case "3":
              account.getBalance();
              rl.close();
              break;
            default:
              console.log("Invalid action.");
              rl.close();
              break;
          }
        });
      } else {
        rl.close();
      }
    });
  } else {
    console.log(`Customer ${name} not found.`);
    rl.close();
  }
});