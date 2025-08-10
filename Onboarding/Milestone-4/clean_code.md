# Research and summarize the following clean code principles:

## Simplicity

- Follow the keep it simple stupid mentality. The easier it is to understand than the easier it is to fix.

## Readability

- Write code so it can be understood easily from a first glance. E.g. correct indenting with variable names that follow a consistent format.

## Maintainability

- Possibly write own unit tests for code so, if people decide to add features in the future, your tests can be ran to determine if what they added breaks the original code logic.

## Consistency

- A consistent format allows not only you, but others to write code asynchronously allowing the final code snippets to merge together seamlessly. Ideal for working with global teammembers such as is the case at FocusBear.

## Efficiency

- Code is a simple as possible and only optimized if required. This helps your code hit the previous points mentioned. Overengineering simply distracts from the clean code principles.

### messy code

const aBox = {
i: 0,
box: [1,2,3,4,5],
blah: function() {
if (this.i < 5) {
console.log(aBox.box[this.i]);
this.i = this.i + 1;
}
}
};

aBox.blah();
aBox.blah();
aBox.blah();
aBox.blah();
aBox.blah();

-It's not compicated, but it is a really annoying way to print 5 elements inside an array. The object name and method does not correspond to the purpose of the function at all.

### clean code

const aBox = [1,2,3,4,5];

const printAboxElements = () => {
for (let i = 0; i < aBox.length; i++) {
console.log(aBox[i]);
}
}
printAboxElements();

# How to run ESlint and Prettier

### Basic commands:

npx eslint . --fix # Lint and auto-fix issues
npx prettier . --write # Format all files

# Code Formatting & Style Guides

## Why is code formatting important?

increases readability, helping align it with the clean code principles which have benefit as listed previously.

## What issues did the linter detect?

The linter detected:

- no-undef: A variable was used without being defined (unusedVar).
- no-redeclare: A variable (foo) was declared more than once in the same scope.
- Additional style issues such as spacing, missing semicolons, and the use of var instead of let/const.

## Did formatting the code make it easier to read?

Yes. Formatting fixed spacing, indentation, and punctuation, making the structure of the code more obvious.

# Naming Variables & Functions

### Variable and Function Naming Best Practices

- Use clear, descriptive names that indicate purpose.
- Follow consistent naming conventions (e.g., camelCase for variables/functions, PascalCase for classes).
- Avoid unnecessary abbreviations or single-letter names (except in small, clear scopes like loops).
- Use verbs for function names to describe the action performed.
- Use nouns for variables that store data or objects.
- Keep names concise but meaningful.
- Avoid repeating context that is already clear from scope.
- Avoid duplication if the actions required can be done by one function. Just split the actions required that call the previously repeated function.

### Example of unclear code names:

### Bad

let a = 5;
let b = 10;

function c(x, y) {
return x + y;
}

let d = c(a, b);

if (d > 10) {
console.log("big");
} else {
console.log("small");
}

### Good

let a = 5;
let b = 10;

function addTwoNumbers(a, n) {
return a + b;
}

let result = addTwoNumbers(a, b);

if (result > 10) {
console.log("Number is larger than 10");
} else {
console.log("Number is less than or equal too 10");
}

# Reflection

## What makes a good variable or function name?

-It must be descripting and, if possible, clearly represent what the purpose of the variable/function is. Also follow cases (e.g. camelCase) if required. The more meaning that can be conveyed the better.

## What issues can arise from poorly named variables?

-Confusion as that what the code does. Making it difficult to follow the clean code principles listed previously.
--Can result in:
---Slower dev times.
---Increased bugs due to confusion.
---Difficulty in adding to code functionality due to confusion.

## How did refactoring improve code readability?

-Increased code clarity. Even though simple, it is much easier to understand the refactored version vs the original version (due to descriptive variable and function names).

# Writing Small, Focused Functions

## Bad function (from: https://github.com/jbellue/intensify/blob/master/js/intensify.js)

function select_file(input) {
var files = input.files;
show_only("msg_box_loading");

if (FileReader && files && files.length) {
var file_reader = new FileReader();
file_reader.onload = () => {
localStorage.image = file_reader.result;
show_only("msg_box_ready");
};
file_reader.readAsDataURL(files[0]);
} else {
show_error("&#x2620; Unable to get the image");
}
}

# Refactored Functiom

- Moved built-in functions into helper functions (slightly easier to read?)
- Changed var to const

function showLoading() {
show_only("msg_box_loading");
}

function showReady() {
show_only("msg_box_ready");
}

function storeImage() {
localStorage.image = dataResult
}

function select_file(file) {
const files = input.files;
showLoading();

if (FileReader && files && files.length) {
const file_reader = new FileReader();
file_reader.onload = () => {
storeImage(reader.result);
showReady();
};
file_reader.readAsDataURL(files[0]);
} else {
show_error("&#x2620; Unable to get the image");
}
}

## Why is breaking down functions beneficial?

- Improves readability making the function easier to understand.
- Testing is also easier as the function has been modularized making writing test for each individual module relatively straightforward. Also aids debugging as well as code maintenance for the same reason.

## How did refactoring improve the structure of the code?

- Removed 3 lines of logic into their own functions (new to JS/programming hence the simplicity of the example)
- These 3 helper functions are named by their purpose, making code readability even easier.
- Code is more modular. Easy to expand on the functionality of the helper functions as it isolates any potential bugs if they do occur.

# Research the "Don't Repeat Yourself" (DRY) principle:

- Avoid duplication.
- Reduce redundancy, promote efficiency.
- Coincides with the 5 clean coding principles

# Find a section of code in your test repo with unnecessary repetition (GPT generated).

## Bad duplicated function:

myFunc();

function printFruits() {
const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
console.log('Fruit #' + (i + 1) + ': ' + fruits[i]);
}
}

function printVegetables() {
const vegetables = ['carrot', 'potato', 'broccoli'];
for (let i = 0; i < vegetables.length; i++) {
console.log('Vegetable #' + (i + 1) + ': ' + vegetables[i]);
}
}

## Refactored function by me:

const GroceryStore = {
Fruits: ['apple', 'banana', 'cherry'],
Vegetables: ['carrot', 'potato', 'broccoli'],

displayStock: function (parameter) {
let items, label;

    items = this[parameter]; //gets items from array
    label = parameter; //just parses in param name

    for (let i = 0; i < items.length; i++) {
      console.log(`${label} ` + (i + 1) + `: ` + `${items[i]}`);
    }

},
};

GroceryStore.displayStock(`Fruits`);
GroceryStore.displayStock(`Vegetables`);

const Vehicles = { ...GroceryStore, Cars: ['Suzuki', 'Mazda', 'Hyundai'] };

Vehicles.displayStock(`Cars`);

# Reflections

## What were the issues with duplicated code?

- Logic was repeated for both fruits and vegetables. No point when it can be done by a single for loop instead.
- Labels were linked with the loop they ran in. Bad practice as they should just be parameters that are parsed in when required.
- Redundant unit tests required if they were to be written.
- Can't make use of the logic anywhere else in the codebase. Given we now have a class we can create new objects with the spread operator that pull in previous logic. Allowing us to display more items with the same logic.

## How did refactoring improve maintainability?

- The original code had two identical functions for fruits and vegetables, causing duplication.
- The refactored version uses a dynamic method, displayStock(parameter), inside an object.
- This allows any category to be handled with the same loop, making it easier to add new categories and update logic in one place.
- As a result, the code is simpler, easier to expand, and faster to maintain.

# Research common refactoring techniques

# What is Refactoring?

- The process of improving a codebase's structure and readability without changing its existing logic.

## Common Refactoring Techniques according to https://www.codesee.io/learning-center/code-refactoring

1. **Red-Green-Refactor** (TDD): write a failing test, make it pass, then clean up the code.
2. **Refactoring by Abstraction**: pull common logic into reusable components or abstractions.
3. **Composing**: build functionality by combining small, focused parts.
4. **Simplifying Methods**: break down long methods into shorter, clearer ones.
5. **Moving Features Between Objects**: relocate code to more appropriate places.
6. **Preparatory Refactoring**: restructure code ahead of adding new features or making changes.

## Overly complicated function (GTP generated):

function loadUserAndPosts(userId) {
// Fetch the user data from the server using their ID
fetch(`/api/users/${userId}`)
.then(res => {
// If the HTTP status is not OK (e.g., 404 or 500), throw an error
if (!res.ok) throw new Error('Failed to load user');
// Otherwise, parse the response body as JSON
return res.json();
})
.then(user => {
// Log the user object to the console for debugging
console.log('User:', user);

      // Now fetch the user's posts using the user ID from the fetched data
      fetch(`/api/users/${user.id}/posts`)
        .then(res => {
          // If posts request fails, throw an error
          if (!res.ok) throw new Error('Failed to load posts');
          // Parse the posts response as JSON
          return res.json();
        })
        .then(posts => {
          // Log the posts array to the console
          console.log('Posts:', posts);

          // Update the page with the user's name
          document.getElementById('name').textContent = user.name;

          // Show how many posts the user has
          document.getElementById('count').textContent = posts.length;

          // Render a list of post titles as <li> elements in the 'list' element
          document.getElementById('list').innerHTML = posts
            .map(p => `<li>${p.title}</li>`) // Convert each post into an <li> string
            .join('');                       // Combine them into one string
        })
        .catch(err => {
          // Handle any errors from loading the posts
          console.error('Error loading posts:', err);
          document.getElementById('error').textContent = 'Could not load posts.';
        });
    })
    .catch(err => {
      // Handle any errors from loading the user
      console.error('Error loading user:', err);
      document.getElementById('error').textContent = 'Could not load user.';
    });

}

// Call the function to start fetching data for user with ID 42
loadUserAndPosts(42);

## Better function (re-written by me with GPT help for DOM and API handling):

async function betterloadUserAndPosts() {
try {
const userData = await fetch(`/api/users/${userId}`)
if (!userData.ok) throw new Error('User information failed to load');
const user = await userData.json(); //wait for userData and parse into JSON

const userPosts = await fetch(`/api/users/${user.id}/posts`);
if (!userPosts.ok) throw new Error('User posts failed to load');
const posts = await userPosts.json(); //wait for userPosts and parse into JSON

document.getElementById('name').textContent = user.name; //username into DOM name field
document.getElementById('count').textContent = posts.length; //post length parsed into DOM count. Possibly for amount of post fields to load
document.getElementById('list').innerHTML = posts //parse posts JSON data into list html field
.map(p => `<li>${p.title}</li>`) //map array object from p into html list string
.join(''); //space between each list
} catch (err) {
console.error(err);
document.getElementById('error').textContent = 'Could not load data.';
}
}

# Reflection

## Why is breaking down functions beneficial?

- It takes, what appears at first, something really complicated (like the function GTP generated) and breaks it down into small, easily understandable segments.
- Breaking down the above function made it understandable to a javascript beginner such as myself.

## How did refactoring improve the structure of the code?

- The nested thenables were removed, making the code easier to understand without the poor nesting.
- The single try/catch reduces the amount of error catches required in the function.
- Variable names re-written to make sense with what is actually being received by the function.
- Placing DOM functionality at the end makes the logic flow make more sense then what was initially proposed.
