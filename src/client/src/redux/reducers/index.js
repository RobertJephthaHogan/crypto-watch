import { combineReducers } from 'redux'
import userReducer from './user'
import settingsReducer from './settings'
import initialState from '../initialState'

import * as types from '../types'


const appReducers = combineReducers({
  user:  userReducer,
  settings: settingsReducer,
})


const rootReducer = (state, action) => {
  switch (action.type) {
      case types.LOGOUT_SUCCESS:
          return appReducers(
              {
                  ...initialState,
              },
              action
          )
      default:
          return appReducers(state, action)
  }
}

export default rootReducer