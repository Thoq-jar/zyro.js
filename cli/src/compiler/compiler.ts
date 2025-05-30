import { parse } from "@babel/parser"
import { HOME_CUM_FILE } from "../utility/init/constants"
import * as t from '@babel/types';
import traverse from "@babel/traverse";

export default function compile(source: string) {
    const ast = parse(source, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    })

    if (!ast) {
        console.error("Parsing failed");
        return;
    }

    traverse(ast, {
        
    })

    return ast;
}
