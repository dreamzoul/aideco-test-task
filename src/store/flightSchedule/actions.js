import * as types from './actionTypes';

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
export function flightAdded(currentList, flight) {
    const flightList = [...currentList, flight];

    return { type: types.FLIGHT_ADDED, flightList }
};

//Изменение информации о рейсе 
export function flightChanged(currentList, flight) {
    const indexOfFlight = currentList.findIndex(el => el.id === flight.id);
    let flightList = currentList;
    flightList[indexOfFlight] = flight;

    return { type: types.FLIGHT_CHANGED, flightList }
};

//Удаление рейса из списка
export function flightDeleted(currentList, id) {
    const indexOfFlight = currentList.findIndex(el => el.id === id);
    let flightList = currentList;
    flightList.splice(indexOfFlight, 1);

    return { type: types.FLIGHT_DELETED, flightList }
};

//выбран конкретный рейс
export function setFilters(filter) {
    return { type: types.SET_FILTER, filter }
}
