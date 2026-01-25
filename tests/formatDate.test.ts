import { describe, it, expect } from 'vitest';
import { formatDate, formatDateShort, formatDateISO } from '../src/utils/formatDate';

describe('formatDate', () => {
  it('should format date in long format', () => {
    const date = new Date('2024-06-15');
    expect(formatDate(date)).toBe('June 15, 2024');
  });

  it('should format date with single digit day', () => {
    const date = new Date('2024-01-05');
    expect(formatDate(date)).toBe('January 5, 2024');
  });

  it('should handle different months', () => {
    expect(formatDate(new Date('2024-03-15'))).toBe('March 15, 2024');
    expect(formatDate(new Date('2024-12-25'))).toBe('December 25, 2024');
  });
});

describe('formatDateShort', () => {
  it('should format date in short format', () => {
    const date = new Date('2024-06-15');
    expect(formatDateShort(date)).toBe('Jun 15, 2024');
  });

  it('should format date with single digit day', () => {
    const date = new Date('2024-01-05');
    expect(formatDateShort(date)).toBe('Jan 5, 2024');
  });

  it('should handle different months', () => {
    expect(formatDateShort(new Date('2024-03-15'))).toBe('Mar 15, 2024');
    expect(formatDateShort(new Date('2024-12-25'))).toBe('Dec 25, 2024');
  });
});

describe('formatDateISO', () => {
  it('should format date as ISO string (YYYY-MM-DD)', () => {
    const date = new Date('2024-06-15T12:00:00Z');
    expect(formatDateISO(date)).toBe('2024-06-15');
  });

  it('should pad single digit month and day', () => {
    const date = new Date('2024-01-05T12:00:00Z');
    expect(formatDateISO(date)).toBe('2024-01-05');
  });

  it('should handle end of year', () => {
    const date = new Date('2024-12-31T12:00:00Z');
    expect(formatDateISO(date)).toBe('2024-12-31');
  });

  it('should handle beginning of year', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    expect(formatDateISO(date)).toBe('2024-01-01');
  });
});
