/*
 * @Author: Edlan
 * @Date: 2019-01-05 14:46:34
 * @Description: 模拟dispatch
 */
export function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message)
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message)
  } catch (e) {} // eslint-disable-line no-empty
}

export default async function dispatch(action) {
  if (!action.type || typeof action.type !== 'string') {
  throw new Error(
    'Actions may not have an undefined "type" property. ' +
    'Have you misspelled a constant?'
    )
  }

  const modules = action.type.split('/');
  try {
    this[modules[0]].changeLoading(action.type, true);
    await this[modules[0]][modules[1]](action.payload, action.callback);
  } catch(e) {
    warning(e);
  } finally {
    if (
      typeof this[modules[0]] === 'object' &&
      typeof this[modules[0]].changeLoading === 'function'
    ) {
      this[modules[0]].changeLoading(action.type, false);
    }
  }
}
