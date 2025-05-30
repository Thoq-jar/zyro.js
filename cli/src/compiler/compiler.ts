import { parse } from "@babel/parser"
import { PREFIX_MAPPINGS } from "../utility/constants"
import * as t from '@babel/types';
import traverse from "@babel/traverse";
import generate from "@babel/generator"

function preprocess(source: string): string {
    for(const [prefix, event] of Object.entries(PREFIX_MAPPINGS)) {
        const regex = new RegExp(`${prefix}=`, "g");
        source = source.replace(regex, `${event}=`);
    }
    source = source.replace(/style=\{\{([^}]+)\}\}/g, (_, inner) => {
        const processed = inner
            .split(',')
            .map(part => part.trim().replace(/(\w+)\s*=\s*/g, '$1: '))
            .join(', ');
        return `style={{${processed}}}`;
    });
    console.log(source)
    return source
}

function handleAttributeValue(attr: t.JSXAttribute): string {
    if(!attr) return '';

    const value = attr.value

    if(t.isStringLiteral(value)) return value.value;

    if(t.isJSXExpressionContainer(value)) {
        const expr = value.expression

        if (t.isCallExpression(expr)) {
            const code = generate(expr.callee).code;
            const args = expr.arguments.map(arg => generate(arg).code).join(', ');
            return `\${() => ${code}(${args})}`
        }

        return `\${${generate(expr).code}}`;
    }
    return '';
}

function compileToHTML(element: t.JSXElement) {
    const opening = element.openingElement
    let tagName = ''

    if(t.isJSXIdentifier(opening.name)) {
        tagName = opening.name.name
    } else if(t.isJSXMemberExpression(opening.name)) {
        tagName = `${(opening.name.object as t.JSXIdentifier).name}.${(opening.name.property as t.JSXIdentifier).name}`
    } else if(t.isJSXNamespacedName(opening.name)) {
        tagName = `${opening.name.namespace.name}:${opening.name.name.name}`
    } else {
        throw new Error("Invalid Syntax")
    }

    let htmlTag = `<${tagName}`

    for(const attr of opening.attributes) {
        if(t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
            const attrName = attr.name.name;
            const attrValue = handleAttributeValue(attr);
            htmlTag += `${attrName}="${attrValue}"`
        }
    }

    htmlTag += ">";

    for(const child of element.children) {
        if(t.isJSXText(child)) {
            htmlTag += child.value;
        } else if(t.isJSXExpressionContainer(child)) {
            htmlTag += `\${${generate(child.expression).code}}`
        } else if(t.isJSXElement(child)) {
            htmlTag += compileToHTML(child)
        }
    }
}

export default function compile(source: string) {
    source = preprocess(source)
    const ast = parse(source, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    })

    if(!ast) {
        console.error("Parsing failed");
        return;
    }

    traverse(ast, {
        JSXAttribute(path) {
            const attr = path.node;
            if(t.isJSXIdentifier(attr.name)) {
                const name = attr.name.name
                if(!name.startsWith("!")) return; 
                for(const [prefix, event] of Object.entries(PREFIX_MAPPINGS)) {
                    if(name.startsWith(prefix)) {
                        console.log("[DEBUG] - event found!" + prefix + " : " + event)
                        attr.name.name = event
                        break;
                    }
                }
            }
        },
        JSXElement(path) {
            compileToHTML(path.node)
        }
    })

    const code = generate(ast, {
        compact: false,
        comments: true,
    }).code

    return code;
}
