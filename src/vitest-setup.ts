import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('zustand');

/**
 * Mock global localStorage object
 */
{
  const localStorageMock: Storage = (() => {
    let storage: Record<string, string> = {};

    const setItem = vi.fn((key: string, value: string) => {
      storage[key] = value || '';
    });
    const getItem = vi.fn((key: string) => {
      return key in storage ? storage[key] : null;
    });
    const removeItem = vi.fn((key: string) => {
      delete storage[key];
    });
    const clear = vi.fn(() => {
      storage = {};
    });
    const key = vi.fn((i: number) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    });

    return {
      setItem,
      getItem,
      removeItem,
      clear,
      key,
      get length() {
        return Object.keys(storage).length;
      },
    };
  })();

  vi.stubGlobal('localStorage', localStorageMock);
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
