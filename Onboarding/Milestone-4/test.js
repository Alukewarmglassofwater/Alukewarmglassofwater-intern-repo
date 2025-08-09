const aBox = [1, 2, 3, 4, 5];

const printAboxElements = () => {
  for (let i = 0; i < aBox.length; i++) {
    console.log(aBox[i]);
  }
};
printAboxElements();


# Test code that should trigger ESlint
var foo = "bar"; // should be const, wrong quotes, missing semicolon

function myFunc() {
  // extra spaces everywhere
  console.log(foo); // missing semicolon, spacing issues
  let unusedVar = 42; // extra spaces, unused variable
  if (true) {
    console.log("yes");
  } // no space after if, missing semicolon
}

myFunc();
