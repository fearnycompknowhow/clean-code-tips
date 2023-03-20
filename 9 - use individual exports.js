// Use reportService.js and import from utilityService.js


export function fn1() {}
export function fn2() {}
export function fn3() {}

export default {
	fn1,
	fn2,
	fn3
}


// Import it elsewhere
import { fn1, fn2, fn3 } from '';
import service from '';

service.fn1;
service.fn2;
service.fn3;