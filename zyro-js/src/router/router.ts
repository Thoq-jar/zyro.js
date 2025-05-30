const ERROR_HTML = `<style>
    html {
        background-color: #000;
        color: #fff;
        height: 100vh;
    }

    .error-main {
        height: 98vh;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji";
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .error {
        display: inline-block;
        margin: 0 20px 0 0;
        padding: 0 23px 0 0;
        font-size: 24px;
        font-weight: 500;
        vertical-align: top;
        line-height: 49px;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
    }

    .middle {
        display: inline-block;
        margin: 0;
    }

    .message {
        font-size: 14px;
        font-weight: 400;
        line-height: 49px;
        margin: 0;
    }
</style>

<div class="error-main">
    <div class="error">404</div>
    <div class="middle">
        <h2 class="message">This page could not be found.</h2>
    </div>
</div>`;

class Flux {
    private routes: Map<string, () => string> = new Map();
    private outlet: HTMLElement | null = null;

    constructor() {
        window.addEventListener('popstate', this.handleLocationChange.bind(this));
    }

    register(path: string, contentCallback: () => string): void {
        this.routes.set(path, contentCallback);
    }

    setOutlet(element: HTMLElement): void {
        this.outlet = element;
        this.handleLocationChange();
    }

    push(url: string): void {
        if (window.location.pathname === url) {
            return;
        }

        history.pushState({}, '', url);
        this.handleLocationChange();
    }

    private handleLocationChange(): void {
        if(!this.outlet) {
            console.warn("Urethra router outlet not set. Call setOutlet(element).");
            return;
        }

        const path = window.location.pathname;
        const contentCallback = this.routes.get(path);

        if(contentCallback) {
            this.outlet.innerHTML = contentCallback();
        } else {
            this.outlet.innerHTML = ERROR_HTML;
            console.warn(`No route registered for path: ${path}`);
        }
    }
}

export default new Flux();
