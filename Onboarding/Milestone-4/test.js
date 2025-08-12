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

//GPT generated bad function

function loadUserAndPosts(userId) {
  // Fetch the user data from the server using their ID
  fetch(`/api/users/${userId}`)
    .then((res) => {
      // If the HTTP status is not OK (e.g., 404 or 500), throw an error
      if (!res.ok) throw new Error('Failed to load user');
      // Otherwise, parse the response body as JSON
      return res.json();
    })
    .then((user) => {
      // Log the user object to the console for debugging
      console.log('User:', user);

      // Now fetch the user's posts using the user ID from the fetched data
      fetch(`/api/users/${user.id}/posts`)
        .then((res) => {
          // If posts request fails, throw an error
          if (!res.ok) throw new Error('Failed to load posts');
          // Parse the posts response as JSON
          return res.json();
        })
        .then((posts) => {
          // Log the posts array to the console
          console.log('Posts:', posts);

          // Update the page with the user's name
          document.getElementById('name').textContent = user.name;

          // Show how many posts the user has
          document.getElementById('count').textContent = posts.length;

          // Render a list of post titles as <li> elements in the 'list' element
          document.getElementById('list').innerHTML = posts
            .map((p) => `<li>${p.title}</li>`) // Convert each post into an <li> string
            .join(''); // Combine them into one string
        })
        .catch((err) => {
          // Handle any errors from loading the posts
          console.error('Error loading posts:', err);
          document.getElementById('error').textContent =
            'Could not load posts.';
        });
    })
    .catch((err) => {
      // Handle any errors from loading the user
      console.error('Error loading user:', err);
      document.getElementById('error').textContent = 'Could not load user.';
    });
}

// Call the function to start fetching data for user with ID 42
loadUserAndPosts(42);

//better function

async function betterloadUserAndPosts() {
  try {
    const userData = await fetch(`/api/users/${userId}`);
    if (!userData.ok) throw new Error('User information failed to load');
    const user = await userData.json(); //wait for userData and parse into JSON

    const userPosts = await fetch(`/api/users/${user.id}/posts`);
    if (!userPosts.ok) throw new Error('User posts failed to load');
    const posts = await userPosts.json(); //wait for userPosts and parse into JSON

    document.getElementById('name').textContent = user.name; //username into DOM name field
    document.getElementById('count').textContent = posts.length; //post length parsed into DOM count. Possibly for amount of post fields to load
    document.getElementById('list').innerHTML = posts //parse posts JSON data into list html field
      .map((p) => `<li>${p.title}</li>`) //map array object from p into html list string
      .join(''); //space between each list
  } catch (err) {
    console.error(err);
    document.getElementById('error').textContent = 'Could not load data.';
  }
}

### GPT generated bad function:

function fetchUserData(userId) {
// Make an API call to get user data
return fetch(`https://api.example.com/users/${userId}`)
.then(response => response.json()) // assumes it's always valid JSON
.then(data => {
// Assume 'data' always has 'name' and 'email'
console.log(`User: ${data.name} (${data.email})`);
return data;
});
}

# Refactor the function to improve error handling:

const fetchUserData = async (userId) => {
try {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) throw new Error("API failed to respond");


  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error("Garbled data sent from API:", err);
    return;
  }

  if (!data || !("name" in data) || !("email" in data)) { //check if data.name and data.email actually exist
  throw new Error("Name and email fields are missing");
  } else {
      console.log(`User: ${data.name} (${data.email})`);
      return data;
    }
} catch (err) {
  console.error("Fetch error:", err);
}
};

