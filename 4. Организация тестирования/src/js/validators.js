export function isValidInn(value) {
    return value.length >= 10 && value.length <= 12;
}