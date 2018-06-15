export function RestController<T extends { new(...args: any[]): {} }>(url?: string) {
    if (!url) url = '/';
    if (url.substring(0, 1) !== '/') url = `/${url}`;
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            __controller = true;
            __baseUrl = url;
        }
    };
}