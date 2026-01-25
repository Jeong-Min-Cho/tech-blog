import { describe, it, expect } from 'vitest';
import { getReadingTime } from '../src/utils/readingTime';

describe('getReadingTime', () => {
  it('should return "1 min read" for short content', () => {
    const content = 'Hello world';
    expect(getReadingTime(content)).toBe('1 min read');
  });

  it('should return "1 min read" for content under 200 words', () => {
    const content = Array(150).fill('word').join(' ');
    expect(getReadingTime(content)).toBe('1 min read');
  });

  it('should return "2 min read" for content around 200-400 words', () => {
    const content = Array(250).fill('word').join(' ');
    expect(getReadingTime(content)).toBe('2 min read');
  });

  it('should return "5 min read" for content around 800-1000 words', () => {
    const content = Array(900).fill('word').join(' ');
    expect(getReadingTime(content)).toBe('5 min read');
  });

  it('should handle empty content', () => {
    expect(getReadingTime('')).toBe('1 min read');
  });

  it('should handle content with multiple spaces', () => {
    const content = 'word   word   word';
    expect(getReadingTime(content)).toBe('1 min read');
  });

  it('should handle content with newlines', () => {
    const content = Array(400).fill('word').join('\n');
    expect(getReadingTime(content)).toBe('2 min read');
  });

  it('should round up reading time', () => {
    // 201 words should be 2 min (ceil of 1.005)
    const content = Array(201).fill('word').join(' ');
    expect(getReadingTime(content)).toBe('2 min read');
  });
});
