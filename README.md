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
- Wrap the `App` component with `AuthContextProvider`.
- Create a `useAuthContext` custom hook to consume the hook. It return the context value, or an error if the `useContext` hook is not called inside a contextProvider
### Create custom hooks for signup, signin, and signout the user
#### `useSignup` hook: 
- It holds three states:
  - `isCancelled`: to stop updating the other states when the component is unmounted
  - `error`: to store any erros we get back from firebase auth
  - `loading`: Indicates if the the request is being sent to firebase of it's finished
- The main functionality of the hook is inside an async `signup` function.
  - it accept three parameters: email, passowrd, and a displayName.
  - Inside a `try` block, it wait for the `createUserWithEmailAndPassword` firebase function to signup the user with the provided email and password.
  - Check if I get a `userCredential` (respond) and then update the user profile using `updateProfile` with the displayName parameter. Otherwise throw an error.
  - Firebase automatically login the user, so we need to update the authContext.
  - dipatch a LOGIN action to update the user state with the `userCredential.user` it got from firebase.
  - Update the error and loading state only if `isCancelled` is false.
  - Inside a `catch` block, update the error with the error message from firebase if there is any (only if `isCancelled` is false).
- Use a cleanup function inside `useEffect` hook to set `isCancelled` to be true whenver the component is unmounted. That way whenever the component is unmounted, the error and loading state won't be updated.
- The hook returns three values inside an abject: signup function, loading, error.
### the other hooks follows a simillar pattern. 
