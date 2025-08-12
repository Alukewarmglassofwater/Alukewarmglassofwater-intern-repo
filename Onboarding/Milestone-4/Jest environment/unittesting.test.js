/* eslint-env node, jest */
const { GroceryStore, Vehicles } = require('./unittesting'); //load GroceryStore and Vehicles function calls

describe('displayStock', () => {
  let logSpy; //allow Jest to view console logs

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); //mock function so nothing prints but it stores output into logSpy
  });

  afterEach(() => {
    logSpy.mockRestore(); //restore logoutput to console
  });

  test('prints fruits with numbered labels', () => {
    //test name followed by shorthand function
    GroceryStore.displayStock('Fruits'); //call function as per normal
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Fruits 1: apple'); //expected output
    expect(logSpy).toHaveBeenNthCalledWith(2, 'Fruits 2: banana');
    expect(logSpy).toHaveBeenNthCalledWith(3, 'Fruits 3: cherry');
  });

  test('prints cars with numbered labels', () => {
    Vehicles.displayStock('Cars');
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Cars 1: Suzuki');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'Cars 2: Mazda');
    expect(logSpy).toHaveBeenNthCalledWith(3, 'Cars 3: Hyundai');
  });
});

const { printAboxElements, aBox } = require('./unittesting');
const { default: expect } = require('expect');

//need to spy on the console log as the function itself doesn't return anything

test('prints contents of an array', () => {
  const LogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); //anon function. mockImplementation is an APi method. Have to write it.

  printAboxElements(aBox); //runs the functions

  expect(LogSpy).toHaveBeenCalledTimes(5); //self explanatory

  expect(LogSpy.mock.calls.map(([arg]) => arg)).toEqual([1, 2, 3, 4, 5]); //look at the first arg in each log call and it should be 1, 2, 3, 4, 5

  LogSpy.mockRestore;
});
