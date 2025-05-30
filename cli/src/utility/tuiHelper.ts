const RESET = "\x1b[0m";
const PURPLE = "\x1b[35m";
const RED = "\x1b[31m";
const WHITE = "\x1b[37m"; 

export class LogTree {
    private depth: number = 0;
    private isLastAtDepth: boolean[] = [];

    constructor() {}

    public enter(): this {
        this.depth++;

        if (this.depth > this.isLastAtDepth.length) {
            this.isLastAtDepth.push(false);
        } else {

        }
        return this;
    }

    public exit(): this {
        if (this.depth > 0) {
            this.depth--;

        }
        return this;
    }

    public setLast(isLast: boolean): this {
        if (this.depth > 0 && this.depth <= this.isLastAtDepth.length) {
            this.isLastAtDepth[this.depth - 1] = isLast;
        }
        return this;
    }

    public success(message: any): void {
        this.printLog(true, String(message), this.depth, this.isLastAtDepth);
    }

    public error(message: any): void {
        this.printLog(false, String(message), this.depth, this.isLastAtDepth);
    }

    public info(message: any): void {
        this.success(message); 
    }

    private printLog(
        success: boolean,
        message: string,
        depth: number,
        isLastAtDepth: readonly boolean[] 
    ): void {
        let lineOutput = "";

        for (let i = 0; i < Math.max(0, depth - 1); i++) {
            if (i < isLastAtDepth.length && isLastAtDepth[i]) {
                lineOutput += "     "; 
            } else {
                lineOutput += `${PURPLE}    │${RESET}`; 
            }
        }

        if (depth === 0) { 
            if (success) {
                lineOutput += `${PURPLE}[${PURPLE}+${PURPLE}]${RESET} `;
            } else {
                lineOutput += `${RED}[${RED}-${RED}]${RESET} `;
            }
        } else {
            const isCurrentNodeLast = depth > 0 && depth <= isLastAtDepth.length && isLastAtDepth[depth - 1];

            if (isCurrentNodeLast) {
                lineOutput += `${PURPLE}    └── ${RESET}`; 
            } else {
                lineOutput += `${PURPLE}    ├── ${RESET}`; 
            }

            if (success) {
                lineOutput += `${PURPLE}[${PURPLE}+${PURPLE}]${RESET} `;
            } else {
                lineOutput += `${RED}[${RED}-${RED}]${RESET} `;
            }
        }

        lineOutput += `${WHITE}${message}${RESET}`;
        console.log(lineOutput);
    }
}
