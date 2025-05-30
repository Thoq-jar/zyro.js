const APP_DIR = "app";
const OUT_DIR = ".cumshot/output";

const HOME_CUM_FILE = `import { Urethra } from 'cumshot-js';

export default function Home() {
    let count = 0;

    function viewPortfolio(url) {
        Urethra.push(url)
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
  "description": "provice a description",
  "author": "you",
  "scripts": {
    "dev": "tip dev"
  },
  "dependencies": {
    "cumshot-js": "file:../cumshot-js"
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
}