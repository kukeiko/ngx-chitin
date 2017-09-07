export function randomHash(length = 7) : string {
    return Math.random().toString(36).substr(2, Math.max(length, 0));
}
