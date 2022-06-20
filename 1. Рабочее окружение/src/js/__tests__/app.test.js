import demo from '../app';
test('some test', () => {
    const expectedVar = "some var"
    expect(demo(expectedVar)).toEqual(expectedVar);
})