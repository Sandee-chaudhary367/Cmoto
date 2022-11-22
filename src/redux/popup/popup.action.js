import { popupActionTypes } from './popup.types';

export const closePopup = () => ({
  type: popupActionTypes.CLOSE_POPUP
});


export const openPopup = (detailsOfClickedCar) => ({
  type: popupActionTypes.OPEN_POPUP,
  Payload:detailsOfClickedCar
});

export const openform = (FormNo) => ({
  type: popupActionTypes.OPEN_FORM,
  Payload:FormNo
});