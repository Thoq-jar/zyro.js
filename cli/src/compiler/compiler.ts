import { parse } from "@babel/parser"
import { HOME_CUM_FILE, PREFIX_MAPPINGS } from "../utility/init/constants"
import * as t from '@babel/types';
import traverse from "@babel/traverse";
import generate from "@babel/generator"

function preprocess(source: string) {
    for (const [prefix, event] of Object.entries(PREFIX_MAPPINGS)) {
        const regex = new RegExp(`${prefix}=`, "g");
        source = source.replace(regex, `${event}=`);
    }
    console.log(source)
    return source
}

export default function compile(source: string) {
    source = preprocess(source)
    const ast = parse(source, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    })

    if (!ast) {
        console.error("Parsing failed");
        return;
    }

    traverse(ast, {
        JSXAttribute(path) {
            const attr = path.node;
            if (t.isJSXIdentifier(attr.name)) {
                const name = attr.name.name
                if (!name.startsWith("!")) return; 
                for (const [prefix, event] of Object.entries(PREFIX_MAPPINGS)) {
                    if (name.startsWith(prefix)) {
                        console.log("[DEBUG] - event found!" + prefix + " : " + event)
                        attr.name.name = event
                        break;
                    }
                }
            }
        },
        JSXElement(path) {
            
        }
    })

    const code = generate(ast, {
        compact: false,
        comments: true,
    }).code

    return code;
}
