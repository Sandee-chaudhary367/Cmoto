import { popupActionTypes } from './popup.types';

const INITIAL_STATE = {
   popupIsOpen: false,
   CarNums:null,
   Area:null,
   Society:null,
   Color:null,
   form:1
};

const popupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case popupActionTypes.OPEN_POPUP:
      return {
        popupIsOpen: true,
        CarNums:action.Payload.CarNums,
        Area:action.Payload.Area,
        Society:action.Payload.Society,
        Color:action.Payload.Color,
        form:1
      };
      case popupActionTypes.OPEN_FORM:
      return {...state,
        popupIsOpen: true,
        form:action.Payload
      };
      case popupActionTypes.CLOSE_POPUP:
      return {
        popupIsOpen:false,
        Area:null,
        Society:null,
        CarNums:null,
        Color:null,
        form:1
      };
    default:
      return state;
  }
};

export default popupReducer;