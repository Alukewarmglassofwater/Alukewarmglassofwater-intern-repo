const aBox = [1, 2, 3, 4, 5];

const printAboxElements = () => {
  for (let i = 0; i < aBox.length; i++) {
    console.log(aBox[i]);
  }
};
printAboxElements();

// Test code that should trigger ESlint
var foo = 'bar'; // should be const, wrong quotes, missing semicolon

function myFunc() {
  // extra spaces everywhere
  console.log(foo); // missing semicolon, spacing issues
  let unusedVar = 42; // extra spaces, unused variable
  if (true) {
    console.log('yes');
  } // no space after if, missing semicolon
}

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

// Using the functions
// printFruits();
// printVegetables();

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
