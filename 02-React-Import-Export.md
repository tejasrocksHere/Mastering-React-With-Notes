Sure! Here's a simple cheat sheet for **import** and **export** in React, covering the most common usage scenarios.

### 1. **Default Export & Import**

When a module has a single thing to export, you can use `default export`.

#### Exporting a default:

```javascript
// ShowImage.jsx
function ShowImage() {
  return <img src="https://i.imgur.com/MK3eW3A.jpg" alt="Katherine Johnson" />;
}

export default ShowImage; // Default export
```

#### Importing a default:

```javascript
// App.jsx
import ShowImage from "./ShowImage"; // Importing the default export

function App() {
  return (
    <>
      <ShowImage />
    </>
  );
}

export default App;
```

### 2. **Named Export & Import**

When you want to export multiple things from a module, use **named exports**.

#### Exporting multiple named items:

```javascript
// utils.js
export function add(a, b) {
  return a + b;
}

export const greeting = "Hello World!";
```

#### Importing named exports:

```javascript
// App.jsx
import { add, greeting } from "./utils"; // Importing named exports

console.log(add(2, 3)); // 5
console.log(greeting); // 'Hello World!'
```

### 3. **Combining Default and Named Exports**

You can have both default and named exports in the same file.

#### Exporting a default and named items:

```javascript
// MyComponent.jsx
export default function MyComponent() {
  return <div>I'm the default export!</div>;
}

export const HELPER_TEXT = "This is a helper constant.";
```

#### Importing a default and named items:

```javascript
// App.jsx
import MyComponent, { HELPER_TEXT } from "./MyComponent";

function App() {
  return (
    <>
      <MyComponent />
      <p>{HELPER_TEXT}</p>
    </>
  );
}

export default App;
```

### 4. **Renaming Imports or Exports**

You can rename imports or exports using the `as` keyword.

#### Renaming while exporting:

```javascript
// utils.js
function subtract(a, b) {
  return a - b;
}

export { subtract as minus }; // Renaming during export
```

#### Renaming while importing:

```javascript
// App.jsx
import { minus } from "./utils"; // Renaming during import

console.log(minus(5, 2)); // 3
```

### 5. **Export All from a Module**

You can export everything from one module to another.

#### Re-exporting everything:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

#### Importing and re-exporting:

```javascript
// utils.js
export * from "./math"; // Re-export everything from math.js
```

#### Importing from re-exported file:

```javascript
// App.jsx
import { add, subtract } from "./utils";

console.log(add(3, 2)); // 5
console.log(subtract(5, 1)); // 4
```

---

### Summary:

- **Default Export/Import:**
  - Export: `export default ...`
  - Import: `import Name from '...'`
- **Named Export/Import:**

  - Export: `export { ... }` or `export const ...`
  - Import: `import { ... } from '...'`

- **Combining Default and Named:** You can have both in the same file.
- **Renaming:** Use `as` to rename during export or import.
- **Export All:** Use `export * from '...'` to re-export everything from another module.

With these examples, you can easily handle imports and exports in React! 😄
