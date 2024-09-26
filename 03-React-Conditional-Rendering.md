### React Conditional Rendering Cheat Sheet

Conditional rendering in React is used to render different UI elements or components based on certain conditions, just like conditions in JavaScript. Here are several ways to handle conditional rendering in React:

---

### 1. **Using `if` statement**

The `if` statement is a basic way to conditionally render components, but it cannot be used directly inside JSX.

```jsx
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}
```

---

### 2. **Using `if...else` inside JSX**

To conditionally render components inside JSX, you need to wrap the logic inside a function.

```jsx
function App() {
  const isLoggedIn = true;

  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}</div>
  );
}
```

---

### 3. **Using `Ternary Operator` in JSX**

The ternary operator is a concise way to render elements based on a condition within JSX.

```jsx
function App() {
  const isLoggedIn = true;

  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}</div>
  );
}
```

---

### 4. **Using `Logical && (AND) Operator`**

This approach is used when you only want to render something if the condition is `true`.

```jsx
function App() {
  const isLoggedIn = true;

  return <div>{isLoggedIn && <h1>Welcome back!</h1>}</div>;
}
```

---

### 5. **Using `Logical || (OR) Operator`**

This method works when you want to display something as a fallback if the condition is `false`.

```jsx
function App() {
  const user = null;

  return (
    <div>
      <h1>{user || "Guest"}</h1>{" "}
      {/* If user is null, 'Guest' will be rendered */}
    </div>
  );
}
```

---

### 6. **Using `Switch` for Multiple Conditions**

For complex conditions, `switch` statements can be used in the same way as JavaScript.

```jsx
function App() {
  const status = "loading"; // Example status: 'loading', 'error', 'success'

  switch (status) {
    case "loading":
      return <h1>Loading...</h1>;
    case "error":
      return <h1>Error occurred!</h1>;
    case "success":
      return <h1>Data loaded successfully!</h1>;
    default:
      return <h1>Unknown status</h1>;
  }
}
```

---

### 7. **Using Immediately Invoked Function Expression (IIFE)**

Sometimes you might want to use more complex logic that doesn't fit into ternary or short-circuit operations.

```jsx
function App() {
  const status = "loading"; // Example status

  return (
    <div>
      {(() => {
        switch (status) {
          case "loading":
            return <h1>Loading...</h1>;
          case "error":
            return <h1>Error!</h1>;
          case "success":
            return <h1>Success!</h1>;
          default:
            return null;
        }
      })()}
    </div>
  );
}
```

---

### 8. **Component-Level Conditional Rendering**

Break the UI into separate components and conditionally render them based on props.

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome Back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

function App() {
  return <Greeting isLoggedIn={true} />;
}
```

---

### 9. **Using `Null` for Rendering Nothing**

You can return `null` to render nothing (but the component lifecycle methods will still be triggered).

```jsx
function Greeting({ isLoggedIn }) {
  if (!isLoggedIn) {
    return null;
  }
  return <h1>Welcome Back!</h1>;
}
```

---

### 10. **Conditional Rendering in JSX with `&&` and `? :` in Nested Conditions**

You can combine multiple conditions to handle more complex scenarios.

```jsx
function App() {
  const isAdmin = false;
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? (
        isAdmin ? (
          <h1>Welcome, Admin</h1>
        ) : (
          <h1>Welcome, User</h1>
        )
      ) : (
        <h1>Please Sign In</h1>
      )}
    </div>
  );
}
```

---

This cheat sheet covers the most common patterns for conditional rendering in React. Choose the best one depending on your use case and code readability!
