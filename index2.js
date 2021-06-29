/* Написать функцию, которая принимает в качестве аргументов строку и объект, 
а затем проверяет есть ли у переданного объекта свойство с данным именем. 
Функция должна возвращать true или false. */
const person = {
	city: "Moscow";
}
const student = Object.create(person);
student.ownCity = "Piter";
function isKeyInObject (string, object) {
	return string in object;
}
console.log(isKeyInObject("ownCity",student));