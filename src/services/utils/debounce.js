export function debounce(callback, timeout = 1500) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(args), timeout);
  };
}