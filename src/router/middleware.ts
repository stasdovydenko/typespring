export function Middleware<T extends { new(...args: any[]): {} }>(mw: Function[]) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            __middleware = mw;
        }
    };
}