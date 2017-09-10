import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import authenticationReducer from './authentication'
import hotelsReducer from './hotels'
import messagesReducer from './messages'

const reducers = {
  form: formReducer,
  routing: routerReducer,
  authentication: authenticationReducer,
  hotels: hotelsReducer,
  messages: messagesReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
