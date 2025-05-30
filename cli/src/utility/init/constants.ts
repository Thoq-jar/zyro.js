const HOME_CUM_FILE = `import { Urethra } from 'cumshot-js';

export default function Home() {
    let count = 0;

    function viewPortfolio(url) {
        Urethra.push(url)
    }

    const style={{
        backgroundColor = '#000000',
        color = '#ffffff'
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

export {
    HOME_CUM_FILE,
    PACKAGE_JSON
}