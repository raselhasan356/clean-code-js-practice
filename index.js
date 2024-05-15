/**
 * Use meaningful and pronounceable variable names
 */

// Bad
const yymmdstr = moment().format("YYYY/MM/DD");

// Good
const currentDate = moment().format("YYYY/MM/DD");

/**
 * Use the same vocabulary for the same type of variable
 */

// Bad
getUserInfo();
getClientData();
getCustomerRecord();

// Good
getUser();

/**
 * Use searchable names
 */

// Bad
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);

// Good
// Declare them as capitalized named constants
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; // 86400000
setTimeout(blastOff, MILLISECONDS_PER_DAY);

/**
 * Use explanatory variables
 */

// Bad
const address = "One infinite loop, cupertino 98900";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);

// Good
const address = "One infinite loop, cupertino 98900";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);

/**
 * Avoid mental mapping
 */

// Bad
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach((l) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // Wait, what is 'l' for again?
  dispatchEvent(l);
});

// Good
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  dispatchEvent();
});

/**
 * Don't add unneeded context
 */

// Bad
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue",
};

function paintCar(car, color) {
  car.carColor = color;
}

// Good
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue",
};

function paintCar(car, color) {
  car.color = color;
}

/**
 * Use default parameters instead of short circuiting or conditionals
 */

// Bad
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
}

// Good
function createMicrobrewery(name = "Hipster Brew Co.") {
  //...
}

/**
 * Functions arguments, less is good
 * Use destructuring
 */

// Bad
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
createMenu("Foo", "Bar", "Baz", true);

// Good
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}
createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});

/**
 * Functions should do one thing
 */

// Bad
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// Good
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}

/**
 * Function names should say what they do
 */

// Bad
function addToDate(date, month) {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);

// Good
function addMonthToDate(month, date) {
  //...
}
const date = new Date();
addMonthToDate(1, date);

/**
 * Functions should only be one level of abstraction
 */

// Good
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach((node) => {
    // parse ...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach((token) => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}

/**
 * Remove duplicate code if possible
 */

// Good
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience,
    };

    switch (employee.type) {
      case "manager":
        data.portfolio = employee.getMBAProjects();
        break;
      case "developer":
        data.githubLink = employee.getGithubLink();
        break;
    }

    return data;
  });
}

/**
 * Set default objects with Object.assign
 */

// Good
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true,
};

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true,
    },
    config
  );

  return finalConfig;
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);

/**
 * Don't use flags as function parameters
 */

// Bad
function createFile(name, temp) {
  if (temp) {
    FileSystem.create(`./temp/${name}`);
  } else {
    FileSystem.create(name);
  }
}

// Good
function createFile(name) {
  FileSystem.create(name);
}
function createTempFile(name) {
  createFile(`./temp/${name}`);
}

/**
 * Avoid side effects part 1
 */

// Good
function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}

const name = "Rasel Hasan";
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Rasel Hasan'
console.log(newName); // ['Rasel', 'Hasan']

/**
 * Avoid side effects part 2
 */

// Bad
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};

// Good
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};

/**
 * Don't write to global functions
 */

// Bad
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter((elem) => !hash.has(elem));
};

// Good
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter((elem) => !hash.has(elem));
  }
}

/**
 * Favor functional programming over imperative programming
 */

// Good
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

const totalOutput = programmerOutput.reduce(
  (totalLines, output) => totalLines + output.linesOfCode,
  0
);

/**
 * Encapsulate conditionals
 */

// Bad
if (fsm.state === "fetching" && isEmpty(listNode)) {
  // ...
}

// Good
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}

/**
 * Avoid negative conditionals
 */

// Bad
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}

// Good
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}

/**
 * Avoid conditionals
 */

// Bad
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case "777":
        return this.getMaxAltitude() - this.getPassengerCount();
      case "Air Force One":
        return this.getMaxAltitude();
      case "Cessna":
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}

// Good
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}

/**
 * Avoid type-checking part-01
 */

// Bad
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location("texas"));
  } else {
    vehicle.drive(this.currentLocation, new Location("texas"));
  }
}

// Good
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location("texas"));
}

/**
 * Avoid type checking part-02
 */

// Bad
function combine(val1, val2) {
  if (
    (typeof val1 === "number" && typeof val2 === "number") ||
    (typeof val1 === "string" && typeof val2 === "string")
  ) {
    return val1 + val2;
  } else {
    throw new Error("Must be of type string or number");
  }
}

// Good
function combine(val1, val2) {
  return val1 + val2;
}

/**
 * Don't over-optimize
 */

// Bad
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}

// Good
for (let i = 0; i < list.length; i++) {
  // ...
}

/**
 * Use getter and setter
 */

// Good
function makeBankAccount() {
  // this one is private
  let balance = 0;

  // a 'getter', made public via the returned object below
  function getBalance() {
    return balance;
  }

  // a 'setter', made public via the returned object below
  function setBalance(amount) {
    // ... validate before updating the balance
    balance = amount;
  }

  return {
    // ...
    getBalance,
    setBalance,
  };
}

/**
 * Make objects have private members
 */

// Good
function makeEmployee(name) {
  return {
    getName() {
      return name;
    },
  };
}

const employee = makeEmployee("John Doe");
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe

/**
 * Prefer es2015/es6 classes over es5 plain functions
 */

// Good
class Animal {
  constructor(age) {
    this.age = age;
  }

  move() {
    // ...
  }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age);
    this.furColor = furColor;
  }

  liveBirth() {
    // ...
  }
}

class Human extends Mammal {
  constructor(age, furColor, languageSpoken) {
    super(age, furColor);
    this.languageSpoken = languageSpoken;
  }

  speak() {
    // ...
  }
}
