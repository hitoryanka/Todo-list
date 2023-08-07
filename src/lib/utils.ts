// BUG Amount of rows don't get less when content deleted (it gets on a new render though)
export function calculateRows(target: EventTarget & HTMLTextAreaElement) {
  if (target.scrollHeight > target.clientHeight) {
    target.rows *= target.scrollHeight / target.clientHeight;
  }
}
