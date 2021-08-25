const isTooClose = require('../isTooClose');

describe('isTooClose', () => {
  it('should return false if position is not a decimal number', () => {
    const position = 16384;

    expect(isTooClose(position)).toBeFalsy();
  });

  it('should return false if position decimal number is more than 0.01', () => {
    const position = 16384.02;
    expect(isTooClose(position)).toBeFalsy();

    const position2 = 16384.1;
    expect(isTooClose(position2)).toBeFalsy();

    const position3 = 8192.012;
    expect(isTooClose(position3)).toBeFalsy();
  });

  it('should return true if position decimal number is less than 0.01', () => {
    const position = 16384.01;
    expect(isTooClose(position)).toBeTruthy();

    const position2 = 16384.001;
    expect(isTooClose(position2)).toBeTruthy();

    const position3 = 8192.02;
    expect(isTooClose(position3)).toBeFalsy();
  });
});
