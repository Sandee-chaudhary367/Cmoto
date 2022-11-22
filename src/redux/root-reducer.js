import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import popupReducer from './popup/popup.reducer';

export default combineReducers({
  user: userReducer,
  popup:popupReducer
});