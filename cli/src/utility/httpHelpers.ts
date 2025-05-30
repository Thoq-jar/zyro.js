import { ERROR_HTML } from "./constants";

interface ErrorPage {
    code: number,
    message: string
}

export function formatError({
    code,
    message
}: ErrorPage) {
    return ERROR_HTML
        .replace(/!CODE/g, code.toString())
        .replace(/!MESSAGE/g, message);
}
