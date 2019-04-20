// NOTES on Javascript 'this' is a personal reference file to look up whenever
// confused about the behavior of 'this'.

// Functions create a 'this' reference on declaration
function printResults(){
	console.log(this.results)
}

// Arrow functions don't create a 'this' reference, but use the one of their
// lexical scope
const printResultsArrow = () => {
  console.log(this.results)
}

const results = [1,2,3,4,5,6,7]

const obj = {
  results: ['a', 'b', 'c', 'd', 'e']
}

// IMPORTANT: The actual object 'this' in a function is determined by the call site
// of the function, not by where the function is declared!

printResults(); // [1, 2, 3, 4, 5, 6, 7]

//By using .call() method we provide the value of the 'this' as a first argument
printResults.call(obj); // ["a", "b", "c", "d", "e"]

// An arrow function doesn't create a 'this', so it always uses the 'this' of
// it's container lexical scope
printResultsArrow(); // [1, 2, 3, 4, 5, 6, 7]

// Applying call won't work on an arrow function, as it doesn't have it's own 'this'
// reference.
printResultsArrow.call(obj); // [1, 2, 3, 4, 5, 6, 7] Still the global results


const obj2 = {
  results: ['!','@','#','$','%'],
  obj: obj
}

// 'this' will refer to the last object of a chain.
printResults.call(obj2); // ["!", "@", "#", "$", "%"]
printResults.call(obj2.obj); // ["a", "b", "c", "d", "e"]

// With the bind() method we can bind the this to whatever object we choose when
// creating a function.
const boundPrint = printResults.bind(obj2);
boundPrint(); //["!", "@", "#", "$", "%"]
