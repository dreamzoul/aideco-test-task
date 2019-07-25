import * as types from './actionTypes';

//Добавление нового рейса
export function flightListChange(flight) {
    return { type: types.FLIGHT_LIST_CHANGE, flight }
};

//Открыть / закрыть модальное окно
export function modalStatusChange() {
    return { type: types.MODAL_STATUS_CHANGE }
}

//выбран конкретный рейс
export function flightSelected(flight) {
    return { type: types.FLIGHT_SELECTED, flight }
}

//выбран конкретный рейс
export function setFilters(filter) {
    return { type: types.SET_FILTER, filter }
}
