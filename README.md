# Finance-tracker
- Finance-tracker is a React app where users can manage/follow their transactions.
- Uses React Context and `useReducer` to manage state.
- Styled using CSS modules
- Tested with Jest and React Testing Library
## Process
### setup and components
- Create the different pages needed.
- Create simple templates for the other components needed
- setup routes for the pages with **react-router**
- setup firebase and connect the app with the firebase Authentication server.
### Create an authentication Context
- Create an AuthContext using `createContext()` inside a `AuthContext.js` file.
- In the same file create a custom context provider component named `AuthContextProvider` that provides a context value to its children.
- Define a state variable and a dispatch function using the `useReducer` hook inside `AuthContextProvider`.
- Define a reducer function that update the state depending on the action dispatched.
- Pass an object that contains the state and dispatch function as the value prop.
- Wrap the `App` component with `AuthContextProvider`
### Create custom hooks for signup, signin and signout the user
- `useSignup` hook: 
  - it holds three states
