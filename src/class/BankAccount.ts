export class BankAccount {
    private balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Deposit amount must be positive");
        }
    }

    public withdraw(amount: number): void {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
            } else {
                console.log("Insufficient funds");
            }
        } else {
            console.log("Withdrawal amount must be positive");
        }
    }

    public getBalance(): number {
        return this.balance;
    }

    public displayBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}
