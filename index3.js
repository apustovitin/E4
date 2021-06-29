/* Написать функцию, которая создает пустой объект, но без прототипа. */
function createEmptyObject () {
	return {};
}
const student = createEmptyObject();
console.log(Object.getPrototypeOf(student));