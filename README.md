# Redux

```javascript
yarn add redux
yarn add react-redux
```

## What is Redux

## Basic concepts

- ### `Store` : holds the state (There is only one state)

- ### `Action` : state can be modified using actions

- ### `Dispatcher` : Action needs to be sent by someone (dispatching an action)

- ### `Reducer` : receives the action and modifies the state to return a new state

- ### `Subscriber` : listens for state change to update the UI (using connect)

- ### `Provider` : makes the store available to all its children elements

- ### `mapStateToProps` : this function takes state as an argument and it takes the state from the store and maps it to the props

- ### `mapDispatchToProps` : this function has dispatch as an argument and it takes the actions to be dispatched and maps it to the props

- ### `connect` : connects below

  - props created via `mapStateToProps` to the props of the component
  - actions defined via `mapDispatchToProps` to the props of the component

- ### `CombineReducers` : this is a fuction provided by redux to combine multiple reducers into a single reducer

## Flow

`Store` contains the `state` ->  
`state` can only be modified by using `actions` ->  
`actions` must be called via `reducer` to update the state ->  
the `action` reaches the `reducer` via `dispatcher` [e.g. onPress event dispatches the action]

1. `Store` needs a reducer to be able to access and modify it
2. `reducer` needs the `initial state` and `action` as arguments and updates the state based on the `type` of the action
3. `Provider` passes makes the state from the `store`, available to all the children components
4. `mapStateToProps` maps the state from the store to props
5. `mapDispatchToProps` maps the actions to be dispatched to the props
6. `connect`s the `mapStateToProps` and `mapDispatchToProps` to the props of the component
7. the `action` is triggered from event handler

```javascript
const initialState = {counter:0}

//------------------------------------(2)
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCREASE_COUNTER':
      return {counter : state.counter + 1}
    case 'DECREASE_COUNTER':
      return {counter : state.counter - 1}
  }
  return state;
}

//------------------------------------(1)
const store = createStore(reducer)

...

render(){
  return(
//------------------------------------(3)
    <Provider store = {store}>
      <CounterApp/>
    </Provider>
  )
}

...

//------------------------------------(4)
const mapStateToProps = (state) {
  return {
    counter : state.counter
  }
}
//------------------------------------(5)
const mapDispatchToProps = (dispatch) = {
  return{
    increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
    decreaseCounter: () => dispatch({type:'DECREASE_COUNTER'})
  }
}

//------------------------------------(7)
const handleIncrement () => this.increaseCounter();

...

//------------------------------------(6)
export default connect(mapStateToProps,mapDispatchToProp)(CounterApp)

```

---

## Topics covered

- ### `Private route`

Authentication `verifies you are who you say you are`, whereas Authorization `decides if you have permission to access a resource`.

`Private Route` component restricts users who do not have authorization to access certain routes, even when they have been authenticated by the system.

- ### `Charts`

---

## References

- https://reacttraining.com/react-router/web/guides/quick-start
- https://www.sitepoint.com/react-router-complete-guide/
- https://www.freecodecamp.org/news/react-router-in-5-minutes/
- https://github.com/public-apis/public-apis
- [Naming Conventions](https://github.com/unional/typescript-guidebook/blob/master/pages/default/draft/naming-conventions.md#file-naming)
- https://gist.github.com/siakaramalegos/df4620c52e829f6107c75d5c3f0ad7f5
- [Axios](http://codeheaven.io/ow-to-use-axios-as-your-http-client/)
- [typescript error soln for private route](https://stackoverflow.com/a/57451939/2739864)
- https://redux.js.org/recipes/usage-with-typescript
- https://react-redux.js.org/using-react-redux/connect-mapstate
- [Why to use thunk](https://stackoverflow.com/a/50664690/2739864)
- [using hooks](https://fettblog.eu/typescript-react/hooks/#useref)
