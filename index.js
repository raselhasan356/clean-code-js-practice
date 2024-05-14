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
