import React, { Component } from "react";
import ReactDOM from "react-dom";

import Home from "./Home/Home"

import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';

import globalStateReducer from '../../../store/reducers/globalState';
import localStateReducer  from '../../../store/reducers/localState';
import listReducer        from '../../../store/reducers/list';
import reportReducer      from '../../../store/reducers/report';

const rootReducers = combineReducers({
  globalState  : globalStateReducer,
  list         :listReducer,
  report       :reportReducer,
  localState   : localStateReducer      

}) 

const store = createStore(rootReducers);



class App extends Component {

  render() {
    
    return (
      <Home/>
    );
  }
}

export default App;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : false;