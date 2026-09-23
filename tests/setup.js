import '@testing-library/jest-dom/vitest';

// jsdom has no canvas implementation, and every Canvas component reaches for a
// 2D context on mount. A recording stub keeps them renderable without pulling
// in the native `canvas` package.
HTMLCanvasElement.prototype.getContext = function getContext() {
  const noop = () => {};
  return new Proxy(
    {
      canvas: this,
      measureText: () => ({ width: 0 }),
      createLinearGradient: () => ({ addColorStop: noop }),
      createRadialGradient: () => ({ addColorStop: noop }),
      createPattern: () => null,
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    },
    { get: (target, key) => (key in target ? target[key] : noop) },
  );
};

globalThis.requestAnimationFrame ??= (cb) => setTimeout(() => cb(Date.now()), 0);
globalThis.cancelAnimationFrame ??= (id) => clearTimeout(id);
