const map = {};

if (map['someKey'] == null || map['someKey'] == undefined) {
	map['someKey'] = []; // Initial value
}

const array = map['someKey'];

array.push('newValue1');
array.push('newValue2');



// Slightly shorter
if (!map['someKey']) map['someKey'] = [];

const array = map['someKey'];

array.push('newValue1');
array.push('newValue2');



// Even shorter but a bit hard to read
const array = (map['someKey'] = (map['someKey'] ?? []));

array.push('newValue1');
array.push('newValue2');


// Shortest and easiest to read
const array = (map['someKey'] ??= []);

array.push('newValue1');
array.push('newValue2');