/**
 * 柯里化：柯里化（Currying），又称部分求值（Partial Evaluation），是把接受多个参数的函数
 * 				变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且
 * 			 返回结果的新函数的技术。
 * 作用：1. 参数复用
 * 			2. 提前返回
 * 			3. 延迟计算/运行
 * @param {Func} fn  用来柯里化（curry）的函数。
 */
// export default function curry(fn) {
// 	const _argLen = fn.length; // fn的形参个数
// 	const slice = Array.prototype.slice;

// 	return function wrap() {
// 		let _args = slice.call(arguments); // 参数集转换成真正的数组

// 		function act() {
// 			_args = _args.concat(slice.call(arguments)); // 串接参数
// 			if (_args.length === _argLen) {
// 				return fn.apply(null, _args);
// 			}
// 			return arguments.callee; // 参数还没达到形参个数，返回参数所在的函数（继续串接）
// 		}
// 		if (_args.length === _argLen) { // 如果curry(fn)传入的参数和fn形参参数个数一致，则直接执行fn
// 			return fn.apply(null, _args);
// 		}

// 		act.toString = function () {
// 			return fn.toString();
// 		}
// 		return act;
// 	}
// }

const curry = fn => {
  const len = fn.length;
  const judge = (...args1) => args1.length >= len ?
    fn(...args1) : (...args2) => judge(...[...args1, ...args2]);
  return judge;
}

export default curry;