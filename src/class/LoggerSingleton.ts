export class Logger {
    private static instance: Logger;
    private logs: string[];

    private constructor() {
        this.logs = [];
        console.log("Logger instance created");
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        this.logs.push(logMessage);
        console.log(logMessage);
    }

    public error(message: string): void {
        this.log(`ERROR: ${message}`);
    }

    public warn(message: string): void {
        this.log(`WARNING: ${message}`);
    }

    public info(message: string): void {
        this.log(`INFO: ${message}`);
    }

    public getLogs(): string[] {
        return [...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
        console.log("Logs cleared");
    }

    public displayAllLogs(): void {
        console.log("\n=== All Logs ===");
        this.logs.forEach(log => console.log(log));
    }

    public static demonstrateSingleton(): void {
        console.log("\n=== Singleton Logger Demonstration ===");
        
        const logger1 = Logger.getInstance();
        const logger2 = Logger.getInstance();
        
        console.log("Are both logger instances the same?", logger1 === logger2);
        
        logger1.info("This is an info message from logger1");
        logger2.warn("This is a warning from logger2");
        logger1.error("This is an error message");
        
        console.log(`Total logs: ${logger1.getLogs().length}`);
    }
}
