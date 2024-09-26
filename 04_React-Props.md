React Basics:

1. Components in React:
   React apps are made out of components.
   A component is a piece of the UI (user interface) that has its own logic and appearance
   A component can be as small as a button, or as large as an entire page

Note: Components always start with capital letters

1. Default Export & Import
   When a module has a single thing to export, you can use default export.
   Exporting a default:

Passing Props to a Component

### Notes on Props in React

---

#### **1. What are Props?**

- **Props** (short for "properties") are a mechanism for passing data from one component to another in React.
- They allow components to be **dynamic** and **reusable** by enabling customization based on the data passed to them.

---

#### **2. How to Use Props**

Props are passed to a component in the same way you pass attributes to HTML elements.

##### Example:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Welcome name="Tejas" />;
}
```

Here, `name="Tejas"` is the prop being passed from the `App` component to the `Welcome` component.

---

#### **3. Props as an Object**

- Props are passed as an object to the receiving component.
- In the example above, `props` inside the `Welcome` component will look like:
  ```javascript
  {
    name: "Tejas";
  }
  ```

You can access the values of props using **dot notation** (`props.name`).

---

#### **4. Passing Multiple Props**

You can pass multiple props to a component by adding more attributes.

##### Example:

```javascript
function Profile(props) {
  return (
    <div>
      <h1>{props.username}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
}

function App() {
  return <Profile username="Tejas" age={23} />;
}
```

In this example, the `Profile` component receives both `username` and `age` as props.

---

#### **5. Destructuring Props**

Instead of accessing each prop using `props.name`, you can **destructure** them for cleaner code.

##### Example:

```javascript
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

function App() {
  return <Welcome name="Tejas" age={23} />;
}
```

Destructuring props simplifies the code, especially when there are many props.

---

#### **6. Props are Read-Only**

- **Props are immutable**, meaning they cannot be modified by the component receiving them.
- If you want to change a value in response to user actions, you need to use **state** (React's state management system) instead of props.

##### Example of attempting to modify props (which is not allowed):

```javascript
function Welcome(props) {
  props.name = "John"; // This is not allowed
  return <h1>Hello, {props.name}!</h1>;
}
```

---

#### **7. Default Props**

You can assign default values to props in case none are passed to the component.

##### Example:

```javascript
function Welcome({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Welcome />; // Since no name is passed, "Guest" will be displayed
}
```

---

#### **8. Prop Types Validation**

Prop types can be validated using the **PropTypes** package, helping to ensure that the correct types of data are passed.

##### Example:

```javascript
import PropTypes from "prop-types";

function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

- `PropTypes.string.isRequired`: Ensures that `name` is always passed and is a string.
- `PropTypes.number`: Specifies that `age` should be a number.

---

#### **9. Children Prop**

- **`children`** is a special prop that is used to pass **child elements** directly into a component.

##### Example:

```javascript
function Wrapper(props) {
  return <div className="wrapper">{props.children}</div>;
}

function App() {
  return (
    <Wrapper>
      <h1>Hello!</h1>
      <p>This is wrapped content.</p>
    </Wrapper>
  );
}
```

In this example, the `<h1>` and `<p>` tags are passed as `props.children` to the `Wrapper` component.

---

### Key Takeaways:

1. **Props are used to pass data** from a parent to a child component.
2. **Props are immutable** (read-only), meaning they cannot be changed within the child component.
3. **Props can be destructured** for cleaner syntax.
4. **Props can have default values** using default props.
5. Use **PropTypes** to validate the data type of props.
6. **`children` prop** allows passing nested elements to a component.

With these notes, you can handle props efficiently in React! 😄
