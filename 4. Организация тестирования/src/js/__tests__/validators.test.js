import {isValidInn} from '../validators';

test('should be false if inn length less then 10', () => {
    const result = isValidInn('');

    expect(result).toBe(false);
});


test('should be false if inn length more then 10', () => {
    const result = isValidInn('fdfasdfsadadfasdfasdfasdfadfa');

    expect(result).toBe(false);
});

test('should be false if inn length is 10', () => {
    const result = isValidInn('1234567890');

    expect(result).toBe(true);
});