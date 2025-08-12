# Research common code smells and how they impact code quality.

- Code smells are source code characteristics that are markers for potentially deeper issues in the code itself.

# Find or write code examples that demonstrate the following code smells:

## Magic Numbers & Strings

### Bad (all are GTP generated. Attempting to refactor myself)

```js
if (plan === 'PRO') price = 19.99;
setTimeout(retry, 5000);
if (status === '200') handleOk();
```

### Good

```js
const planPRO = 'PRO';
const proPlanPrice = 19.99;
const RETRY_MS = 5000;
const HTTP_OK = 200;

if (plan === planPRO) price = proPlanPrice;
setTimeout(retry, RETRY_MS);
if (status === HTTP_OK) handleOK();
```

## Long Functions

### Bad

```js
function processCart(cart, taxRate, email, receiptElId) {
  // validation
  if (!Array.isArray(cart) || cart.length === 0) {
    alert('Empty cart');
    return;
  }
  if (typeof taxRate !== 'number') taxRate = 0.1;
  if (!email) email = 'guest@example.com';

  // calculation
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    subtotal += item.price * item.qty;
  }
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  // formatting (receipt)
  let lines = [];
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    lines.push(
      `${i + 1}. ${item.name} x${item.qty} = $${(item.price * item.qty).toFixed(2)}`,
    );
  }
  lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
  lines.push(`Tax: $${tax.toFixed(2)}`);
  lines.push(`Total: $${total.toFixed(2)}`);

  // side effects: log, DOM, storage, network
  console.log('Charging', email, 'total', total);
  const el = document.getElementById(receiptElId);
  if (el) el.textContent = lines.join('\n');
  localStorage.setItem('lastReceipt', lines.join('\n'));
  fetch('/api/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, total, items: cart }),
  });

  return { subtotal, tax, total };
}
```

### Good

```js
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100; //helper for rounding

function validate(cart, taxRate, email) {
  if (!Array.isArray(cart) || cart.length === 0) {
    alert('Empty cart');
    return null; // stop early
  }
  const safeRate = typeof taxRate === 'number' ? taxRate : 0.1;
  const safeEmail = email || 'guest@example.com';
  return { cart, taxRate: safeRate, email: safeEmail };
}

function calculate(cart, taxRate) {
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
  const tax = round2(subtotal * taxRate);
  const total = round2(subtotal + tax);
  return { subtotal, tax, total };
}

function genReceipt(cart, totals) {
  const lines = cart.map(
    (it, i) =>
      `${i + 1}. ${it.name} x${it.qty} = $${round2(it.price * it.qty).toFixed(2)}`,
  );
  lines.push(`Subtotal: $${totals.subtotal.toFixed(2)}`);
  lines.push(`Tax: $${totals.tax.toFixed(2)}`);
  lines.push(`Total: $${totals.total.toFixed(2)}`);
  return lines;
}

function sendToUser(lines, email, total, receiptElId, cart) {
  console.log('Charging', email, 'total', total);
  const el = document.getElementById(receiptElId);
  if (el) el.textContent = lines.join('\n');
  localStorage.setItem('lastReceipt', lines.join('\n'));
  fetch('/api/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, total, items: cart }),
  });
}

// Like .main in assembly, a function to call the other functions
function processCart(cart, taxRate, email, receiptElId) {
  const v = validate(cart, taxRate, email);
  if (!v) return; // early exit
  const totals = calculate(v.cart, v.taxRate);
  const lines = genReceipt(v.cart, totals);
  sendToUser(lines, v.email, totals.total, receiptElId, v.cart);
  return totals;
}
```

## Duplicate Code

### Bad

```js
function formatUserSummary(user) {
  // First time
  const fullName = `${user.first} ${user.last}`;
  const line1 = `${fullName} <${user.email}>`;

  // Later: the same logic repeated (duplicate)
  const fullNameAgain = `${user.first} ${user.last}`; // duplicate
  const line2 = `${fullNameAgain} — id: ${user.id}`;

  return `${line1}\n${line2}`;
}
```

### Good

```js
function formatUserSummary(user) {
  const fullName = `${user.first} ${user.last}`;
  const line1 = `${fullName} <${user.email}>\n ID: ${user.id},`;

  return `${line1}`;
}
```

## Large Classes (God Objects)

### Bad

```js
class AppManager {
  constructor(db, mailer, cache) {
    this.db = db;
    this.mailer = mailer;
    this.cache = cache;
  }

  // Auth responsibility
  async login(email, pwd) {
    /* verify pwd, issue token */ return { userId: 123, token: 'abc' };
  }

  // Data access responsibility
  getUser(userId) {
    return this.db.query('SELECT * FROM users WHERE id=?', [userId]);
  }
  saveUser(user) {
    return this.db.exec('UPDATE users SET ? WHERE id=?', [user, user.id]);
  }

  // Rendering/UI responsibility
  renderProfile(user) {
    return `<h1>${user.name}</h1><p>${user.email}</p>`;
  }

  // Email responsibility
  sendWelcomeEmail(user) {
    return this.mailer.send(user.email, 'Welcome!', 'Hi there');
  }

  // Caching responsibility
  cacheGet(key) {
    return this.cache.get(key);
  }
  cacheSet(key, val) {
    this.cache.set(key, val);
  }
}
```

### Good

```js
// auth.js
async function login(email, pwd) {
  /* verify pwd, issue token */ return { userId: 123 };
}

// users.js
async function getUser(db, id) {
  return db.query('SELECT * FROM users WHERE id=?', [id]);
}
async function saveUser(db, user) {
  return db.exec('UPDATE users SET ? WHERE id=?', [user, user.id]);
}

// view.js
function renderProfile(user) {
  return `<h1>${user.name}</h1><p>${user.email}</p>`;
}

// mail.js
function sendWelcomeEmail(mailer, user) {
  return mailer.send(user.email, 'Welcome!', 'Hi there');
}

// Function to call everything else
async function main(db, mailer, email, pwd) {
  const { userId } = await login(email, pwd); // auth
  const user = await getUser(db, userId); // fetch user
  const html = renderProfile(user); // render
  console.log(html);
  await sendWelcomeEmail(mailer, user); // email
}
```

## Deeply Nested Conditionals

### Bad

```js
// BAD: deeply nested and hard to follow
function canCheckout(user, cart, payment) {
  if (user) {
    if (user.verified) {
      if (cart) {
        if (Array.isArray(cart.items)) {
          if (cart.items.length > 0) {
            if (!cart.locked) {
              if (payment) {
                if (payment.method === 'card') {
                  if (payment.card) {
                    if (payment.card.valid) {
                      return 'OK';
                    } else {
                      return 'NO: invalid card';
                    }
                  } else {
                    return 'NO: no card details';
                  }
                } else {
                  if (payment.method === 'paypal') {
                    if (payment.approved) {
                      return 'OK';
                    } else {
                      return 'NO: PayPal not approved';
                    }
                  } else {
                    return 'NO: method not supported';
                  }
                }
              } else {
                return 'NO: missing payment';
              }
            } else {
              return 'NO: cart locked';
            }
          } else {
            return 'NO: empty cart';
          }
        } else {
          return 'NO: items missing';
        }
      } else {
        return 'NO: no cart';
      }
    } else {
      return 'NO: user not verified';
    }
  } else {
    return 'NO: no user';
  }
}
```

### Good

```js
function canCheckout(user, cart, payment) {
  if (!user) return 'NO: no user';
  if (!user.verified) return 'NO: invalid card';
  if (!cart) return 'NO: no cart';

  if (!Array.isArray(cart.items)) return 'NO: items missing';
  if (cart.items.length <= 0) return 'NO: empty cart';
  if (!cart.locked) return 'NO: cart clocked';

  if (!payment) return 'NO: missing payment';
  if (payment.method === 'card') {
    if (!payment.card.valid) return 'NO: invalid card';
  }

  if (payment.method === 'paypal') {
    if (!payment.approved) {
      return 'NO: PayPal not approved';
    } else {
      return 'OK';
    }
  }
}
```

## Commented-Out Code

### Bad

```js
function addComment(text, user) {
  // const now = new Date().toISOString();   // legacy timestamp
  // const hashed = hash(text);              // old experiment
  // sendEmail(user.email, text);            // not this function's job
  // fetch('/audit', { method: 'POST', body: JSON.stringify({ user, text }) }); // unrelated side effect

  return `${user.name}: ${text.trim()}`;
}
```

### Good

```js
function addComment(text, user) {
  return `${user.name}: ${text.trim()}`;
}
```

## Inconsistent Naming

### Bad

```js
function p(u, x, y) {
  let USER_name = u.nm; // same concept, different style
  let user_count = x; // x? count of what?
  const MAX = y || 10; // MAX of what?
  let id = u.ID; // odd casing
  let res = []; // result of what?

  for (let i = 0; i < user_count && i < MAX; i++) {
    res.push(`${USER_name}-${id}-${i}`);
  }
  return res.join('_');
}
```

### Good

```js
const maxUsers = 10;

function printUserData(user, count, maxUsers) {
  const name = user.name;
  const id = user.ID;
  const userCap = max || 10;
  const out = [];
  for (let i = 0; i < user_count && i < MAX; i++) {
    res.push(`${USER_name}-${id}-${i}`);
  }
  return res.join('_');
}
```

# Reflections

# What code smells did you find in your code?

- I used GTP to generate code smells based on the 7 examples so I could practice refactoring them. As a result I found all 7:

- Magic numbers/strings: e.g., 5000, 'PRO', 3 hardcoded.
- Long functions: validation + calculation + IO in one place (checkout, processCart).
- Duplicate code: repeated full-name formatting, repeated receipt lines.
- God object tendencies: one class handling auth, data, email, rendering.
- Deeply nested conditionals: multiple if layers for simple checks.
- Commented-out code: legacy lines left in functions.
- Inconsistent/unclear naming: u.nm, x, y, USER_name, mixed casing.

# How did refactoring improve the readability and maintainability of the code?

- Allows for an easier understanding of what the code does via all variables having descriptive names for what they represent
- Breaking a large multi-step function/class into single-purpose multistep functions made it significantly easier to understand what logic was occuring throughout the code. ALso allows for easy debugging since each functional step is now seperated in the code.
- Allows you to individually turn code secitons on and off by being able to individually call functions. Useful for debugging.

# How can avoiding code smells make future debugging easier?

- Smaller, focused functions mean a smaller search area when something breaks.
- Less duplication, so fixing one thing doesn’t secretly break three others.
<<<<<<< HEAD
- Pure functions are easy to test, so logic issue get caught earlier.
- Some test text.
- Another test.
=======
- Pure functions are easy to test, so logic issue get caught earlier. Sample text. Some more sample text. Made even more changes. More text changes. Even more text changes. Another changeeeeeeeeeeeeee.
>>>>>>> e21cf103bcad973ecd9e4803492c2f93fbc2f8e7
