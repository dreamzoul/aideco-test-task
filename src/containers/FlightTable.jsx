import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { flightSelected, flightDeleted } from '../store/flightSchedule/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import CreateRounded from '@material-ui/icons/CreateRounded';
import { FiltersRow } from '.';

class FlightTable extends Component {

  getTableCell = (el, index, row, list) => {
    const { flightSelected } = this.props;

    switch (el.type) {
      case 'select':
        return el.options[row[el.keyName]]

      case 'control-buttons':
        return <div>
          <IconButton
            onClick={() => { flightSelected(row.id) }}>
            <CreateRounded color='primary' />
          </IconButton>
          <IconButton
            onClick={() => { flightDeleted(list, row.id) }}>
            <DeleteRounded color='error' />
          </IconButton>
        </div>

      default:
        return row[el.keyName]
    };
  }

  render() {
    const { list, model } = this.props;

    return (
      <Paper>
        <Typography variant='h5' align='left' >
          {`Количество найденых рейсов: ${list.length}`}
        </Typography>
        <Table >
          <TableHead>

            <FiltersRow />

            <TableRow>
              {model.map((el, index) => {

                return <TableCell key={index} align='center'>{el.title}</TableCell>
              })}
            </TableRow>

          </TableHead>
          <TableBody>

            {list.map(row => (
              <TableRow
                key={row.id}
              >
                {model.map((el, index) => {
                  return <TableCell
                    key={index}
                    align='center'>
                    {this.getTableCell(el, index, row, list)}
                  </TableCell>

                })}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
};

//Для корректного сравнения приведение сравниваемого значения к строке и возведение в верхний регистр
function toUpperStr(str) {

  return str.toString().toUpperCase();
}

//Основная функция сортировки исходного объекта в соотвествии с заданными фильтрами
function filterTheList(list, filters) {
  const filterKeys = Object.keys(filters);
  let result = list;

  filterKeys.forEach(filterName => {
    const matchString = toUpperStr(filters[filterName]);

    //если в качетве фильтра передается дефолтное значение статуса рейса не применять фильтр
    if (filterName === 'status' && matchString === '0') {
      return null;
    };

    result = result.filter(listElement => {
      const sourceString = toUpperStr(listElement[filterName]);

      return sourceString.indexOf(matchString) !== -1;
    });
  });

  return result;
};

function mapStateToProps(state) {
  return {
    list: filterTheList(state.flightList, state.currentFilter),
    model: state.scheduleModel,
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    flightSelected: flightSelected,
    flightDeleted: flightDeleted
  }, dispatch);
};


export default connect(mapStateToProps, matchDispatchToProps)(FlightTable);

