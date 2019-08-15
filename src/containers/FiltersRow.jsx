import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilters } from '../store/flightSchedule/actions';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class FiltersRow extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  //Получить список элементов для выпадающего списка
  getMenuItemList(list) {
    if (!list) {
      return null;
    }

    return list.map((option, index) => {
      return <MenuItem key={index}
        value={index}>
        {option}
      </MenuItem>
    })
  };

  //применение фильтров
  applyFilter = (event) => {
    let newFilter = this.props.filter;
    newFilter[event.target.name] = event.target.value;
    this.setState(
      { ...newFilter },
      () => { this.props.setFilters(newFilter) }
    );
  };

  render() {
    const { model, filter } = this.props;

    return (
      <TableRow>
        {model.map((el, index) => {
          if (!el.isFilter) {
            return <TableCell
              key={index}
              align='center'>
              Фильтер не доступен
              </TableCell>;
          } else {

            return {
              'string':
                <TableCell
                  key={index}
                  align='center'>
                  <TextField
                    id='standard-name'
                    placeholder='Начните вводить'
                    defaultValue={filter[el.keyName] || ''}
                    type="search"
                    name={el.keyName}
                    fullWidth
                    label={el.title}
                    onChange={this.applyFilter}
                    margin='none'
                  />
                </TableCell>,
              'time':
                <TableCell
                  key={index}
                  align='center'>
                  <TextField
                    id='time'
                    label={el.title}
                    type='time'
                    name={el.keyName}
                    defaultValue={filter[el.keyName] || ''}
                    onChange={this.applyFilter}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                  />
                </TableCell>,
              'select':
                <TableCell
                  key={index}
                  align='center'>
                  <Select
                    value={filter[el.keyName] || 0}
                    onChange={this.applyFilter}
                    name={el.keyName}
                  >
                    {this.getMenuItemList(el.options)}
                  </Select>
                </TableCell>
            }[el.type]
          }
        })}
      </TableRow>
    );
  }
};

function mapStateToProps(state) {
  return {
    model: state.scheduleModel,
    filter: state.currentFilter
  };
};

function matchDispatchToProps(dispatch) {

  return bindActionCreators({
    setFilters: setFilters
  }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(FiltersRow);
