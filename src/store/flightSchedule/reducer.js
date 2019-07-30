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

    case types.MODAL_WINDOW_OPEN:
      return { ...state, modalStatus: true };

    case types.MODAL_WINDOW_CLOSE:
      return { ...state, modalStatus: false, selectedFlight: null };

    case types.FLIGHT_SELECTED:
      return { ...state, modalStatus: true, selectedFlight: action.id };

    case types.FLIGHT_ADDED:
    case types.FLIGHT_CHANGED:
    // case types.FLIGHT_DELETED:
      return { ...state, modalStatus: false, selectedFlight: null, flightList: action.flightList };

    case types.SET_FILTER:
      return { ...state, currentFilter: action.filter };

    default:
      return state;
  };
};

export function getState() {
  return initialState;
};
