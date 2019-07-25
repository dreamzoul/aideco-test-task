import * as types from './actionTypes';
import flightList from '../../services';
import { SchedulePlaneTable } from '../../model';

const initialState = {
  flightList: flightList(),
  scheduleModel: SchedulePlaneTable(),
  selectedFlight: null,
  modalStatus: false,
  currentFilter: {}
};

export default function reduce(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case types.FLIGHT_LIST_CHANGE:
      let newFlightList = [...[], ...state.flightList];
      const indexOfFlight = state.flightList.findIndex(el => el.id === action.flight.id);
      if (indexOfFlight === -1) {
        newFlightList.push(action.flight);
      } else {
        newFlightList[indexOfFlight] = action.flight;
      }
      return { ...state, flightList: newFlightList, selectedFlight: null, modalStatus: false };

    case types.MODAL_STATUS_CHANGE:
      if (state.modalStatus) {
        return { ...state, modalStatus: !state.modalStatus, selectedFlight: null };
      } else {
        return { ...state, modalStatus: !state.modalStatus };
      }

    case types.FLIGHT_SELECTED:
      return { ...state, selectedFlight: action.flight, modalStatus: true };

    case types.SET_FILTER:
      return { ...{}, ...state, currentFilter: action.filter };

    default:
      return state;
  };
};
