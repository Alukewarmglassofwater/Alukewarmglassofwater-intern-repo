# Research and summarize the following clean code principles:

# Simplicity
-Follow the keep it simple stupid mentality. The easier it is to understand than the easier it is to fix.

# Readability
Write code so it can be understood easily from a first glance. E.g. correct indenting with variable names that follow a consistent format.

# Maintainability
-Possibly write own unit tests for code so, if people decide to add features in the future, your tests can be ran to determine if what they added breaks the original code logic. 

# Consistency
-A consistent format allows not only you, but others to write code asynchronously allowing the final code snippets to merge together seamlessly. Ideal for working with global teammembers such as is the case at FocusBear.

# Efficiency
-Code is a simple as possible and only optimized if required. This helps your code hit the previous points mentioned. Overengineering simply distracts from the clean code principles. 


# messy code

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

# clean code


const aBox = [1,2,3,4,5];

const printAboxElements = () => {
    for (let i = 0; i < aBox.length; i++) {
        console.log(aBox[i]);
    }
}
printAboxElements();





