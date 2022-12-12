export function addEventListener(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.addEventListener &&
    typeof target.addEventListener === "function"
  ) {
    target.addEventListener(event, handler, capture);
  }
}

export function removeEventListener(
  target: Window | HTMLElement,
  event: string,
  handler: EventListenerOrEventListenerObject,
  capture = false
) {
  if (
    target.addEventListener &&
    typeof target.addEventListener === "function"
  ) {
    target.removeEventListener(event, handler, capture);
  }
}
