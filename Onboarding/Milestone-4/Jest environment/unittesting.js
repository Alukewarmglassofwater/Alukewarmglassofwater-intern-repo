/* eslint-env node */

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

const aBox = [1, 2, 3, 4, 5];

const printAboxElements = () => {
  for (let i = 0; i < aBox.length; i++) {
    console.log(aBox[i]);
  }
};
printAboxElements();

module.exports = { GroceryStore, Vehicles, printAboxElements, aBox };
