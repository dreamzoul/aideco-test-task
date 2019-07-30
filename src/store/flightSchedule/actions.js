import * as types from './actionTypes';
import getState from './reducer';

let currentState = { ...{}, ...getState() };

//Открыть модальное окно
export function modalWindowOpen() {
    return { type: types.MODAL_WINDOW_OPEN }
}

//Закрыть модальное окно
export function modalWindowClose() {
    return { type: types.MODAL_WINDOW_CLOSE }
}

//Выбрать конкретный рейс
export function flightSelected(id) {
    return { type: types.FLIGHT_SELECTED, id }
}

//Добавление нового рейса
export function flightAdded(flight) {
    let flightList = [...[], ...currentState.flightList, flight];

    return { type: types.FLIGHT_ADDED, flightList }
};

//Изменение информации о рейсе 
export function flightChanged(flight) {
    const indexOfFlight = currentState.flightList.findIndex(el => el.id === flight.id);
    let flightList = [...[], ...currentState.flightList];
    flightList[indexOfFlight] = flight;

    return { type: types.FLIGHT_CHANGED, flightList }
};

//Удаление рейса из списка
export function flightDeleted(list, id) {
    // console.log(id, currentState.flightList);

    // const indexOfFlight = currentState.flightList.findIndex(el => el.id === id);
    // let flightList = [...[], ...list];
    // flightList.splice(indexOfFlight, 1);
    // console.log(id, currentState.flightList, flightList);


    // return { type: types.FLIGHT_DELETED, flightList }
};

//выбран конкретный рейс
export function setFilters(filter) {
    return { type: types.SET_FILTER, filter }
}
