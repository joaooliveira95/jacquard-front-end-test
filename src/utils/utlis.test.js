import { validateUsername, validatePassword, formatDate } from './utils';

describe('validateUsername', () => {
  it('should return true for a valid email address', () => {
    const result = validateUsername('test@example.com');
    expect(result).toBe(true);
  });

  it('should return an error for an invalid email format', () => {
    const result = validateUsername('invalid-email');
    expect(result).toBe('Invalid email address format!');
  });

  it('should return an error for a username longer than 128 characters', () => {
    const longUsername = 'a'.repeat(129) + '@example.com';
    const result = validateUsername(longUsername);
    expect(result).toBe(`Username before '@' cannot exceed 128 characters!`);
  });

  it('should return an error for a domain extension longer than 6 characters', () => {
    const result = validateUsername('test@domain.toolong');
    expect(result).toBe(`Username after last '.' cannot exceed 6 characters!`);
  });
});

describe('validatePassword', () => {
  it('should return true for a valid password', () => {
    const result = validatePassword('Password123');
    expect(result).toBe(true);
  });

  it('should return an error for a password without a capital letter', () => {
    const result = validatePassword('password123');
    expect(result).toBe('Password must be alphanumeric, contain at least one number, one capital letter, and be 8-128 characters long.');
  });

  it('should return an error for a password without a number', () => {
    const result = validatePassword('Password');
    expect(result).toBe('Password must be alphanumeric, contain at least one number, one capital letter, and be 8-128 characters long.');
  });

  it('should return an error for a password shorter than 8 characters', () => {
    const result = validatePassword('Pass1');
    expect(result).toBe('Password must be alphanumeric, contain at least one number, one capital letter, and be 8-128 characters long.');
  });

  it('should return an error for a password longer than 128 characters', () => {
    const longPassword = 'P'.repeat(129) + '1';
    const result = validatePassword(longPassword);
    expect(result).toBe('Password must be alphanumeric, contain at least one number, one capital letter, and be 8-128 characters long.');
  });
});

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2020-08-06T00:00:00.000Z');
    const result = formatDate(date);
    expect(result).toBe('6 August 2020');
  });

  it('should format another date correctly', () => {
    const date = new Date('2021-12-25T00:00:00.000Z');
    const result = formatDate(date);
    expect(result).toBe('25 December 2021');
  });
});
