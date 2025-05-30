const APP_DIR = "app";
const OUT_DIR = ".zyxi/output";

const ERROR_PAGES = {
    400: "Bad Request. The server could not understand the request due to invalid syntax.",
    401: "Unauthorized. Authentication is required and has failed or has not yet been provided.",
    403: "Forbidden. The server understood the request, but is refusing to fulfill it.",
    404: "This page could not be found.",
    500: "The server encountered an internal error.",
    502: "Bad Gateway. The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    503: "Service Unavailable. The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.",
    504: "Gateway Timeout. The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."
}

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
    <div class="error">!CODE</div>
    <div class="middle">
        <h2 class="message">!MESSAGE</h2>
    </div>
</div>`;

const HOME_CUM_FILE = `import { Flux } from 'zyro-js';

export default function Home() {
    let count = 0;

    function viewPortfolio(url) {
        Flux.push(url)
    }

    /*
    const style={{
        backgroundColor = '#000000',
        color = '#ffffff'
    }};
    babel doesnt like the color = and wants real css syntax this will be fixed once custom parser
    */

    const style = {{
      backgroundColor: '#000000';
      color: '#ffffff';
    }};

    return (
        <>
            <h1>Count: {count}</h1>
            <button !value={count}>Press me!</button>

            <button !click={viewPortfolio("thoq.dev")}>thoq.dev</button>
            <button !click={viewPortfolio("slqnt.dev")}>slqnt.dev</button>
        </>
    )
}`;

const PACKAGE_JSON = `{
  "name": "!NAME",
  "version": "1.0.0",
  "description": "my awesome new project",
  "author": "you",
  "scripts": {
    "dev": "zyxi dev"
  },
  "dependencies": {
    "zyro-js": "file:../zyro-js"
  }
}`;

const PREFIX_MAPPINGS = {
  "!click": "onClick",
  "!dblclick": "onDblClick",
  "!mousedown": "onMouseDown",
  "!mouseup": "onMouseUp",
  "!mouseover": "onMouseOver",
  "!mousemove": "onMouseMove",
  "!mouseout": "onMouseOut",
  "!mouseenter": "onMouseEnter",
  "!mouseleave": "onMouseLeave",
  "!keydown": "onKeyDown",
  "!keypress": "onKeyPress",
  "!keyup": "onKeyUp",
  "!focus": "onFocus",
  "!blur": "onBlur",
  "!change": "onChange",
  "!input": "onInput",
  "!submit": "onSubmit",
  "!reset": "onReset",
  "!scroll": "onScroll",
  "!resize": "onResize",
  "!select": "onSelect",
  "!contextmenu": "onContextMenu",
  "!load": "onLoad",
  "!unload": "onUnload",
  "!error": "onError",
  "!abort": "onAbort",
  "!drag": "onDrag",
  "!dragstart": "onDragStart",
  "!dragend": "onDragEnd",
  "!dragenter": "onDragEnter",
  "!dragleave": "onDragLeave",
  "!dragover": "onDragOver",
  "!drop": "onDrop",
  "!touchstart": "onTouchStart",
  "!touchmove": "onTouchMove",
  "!touchend": "onTouchEnd",
  "!touchcancel": "onTouchCancel",
  "!wheel": "onWheel",
  "!copy": "onCopy",
  "!cut": "onCut",
  "!paste": "onPaste",
  "!animationstart": "onAnimationStart",
  "!animationend": "onAnimationEnd",
  "!animationiteration": "onAnimationIteration",
  "!transitionend": "onTransitionEnd",
  "!pointerdown": "onPointerDown",
  "!pointerup": "onPointerUp",
  "!pointermove": "onPointerMove",
  "!pointerover": "onPointerOver",
  "!pointerout": "onPointerOut",
  "!pointerenter": "onPointerEnter",
  "!pointerleave": "onPointerLeave",
  "!gotpointercapture": "onGotPointerCapture",
  "!lostpointercapture": "onLostPointerCapture",
  "!beforeunload": "onBeforeUnload",
  "!hashchange": "onHashChange",
  "!popstate": "onPopState",
  "!storage": "onStorage",
  "!value": "value"
};

export {
    HOME_CUM_FILE,
    PACKAGE_JSON,
    PREFIX_MAPPINGS,
    APP_DIR,
    OUT_DIR,
    ERROR_HTML,
    ERROR_PAGES,
}
