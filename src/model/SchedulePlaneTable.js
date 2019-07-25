export default () => {
  return [
    {
      title: 'Номер',
      keyName: 'number',
      type: 'string'
    },
    {
      title: 'Город вылета',
      keyName: 'cityOfDeparture',
      type: 'string',
      isFilter: true
    },
    {
      title: 'Город прилета',
      keyName: 'cityOfArrival',
      type: 'string',
      isFilter: true
    },
    {
      title: 'Тип самолета',
      keyName: 'typeofPlane',
      type: 'string'
    },
    {
      title: 'Время',
      keyName: 'time',
      type: 'time'
    },
    {
      title: 'Фактическое время',
      keyName: 'actualTime',
      type: 'time'
    },
    {
      title: 'Статус',
      keyName: 'status',
      type: 'select',
      options: ['не указано', 'вылетел', 'приземлился', 'идет посадка', 'задержан'],
      isFilter: true
    }
  ];
};