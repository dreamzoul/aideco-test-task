import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalWindowClose, flightAdded, flightChanged } from '../store/flightSchedule/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AddChangeFlightWindow extends Component {
  refList = {};

  constructor(props) {
    super(props)
    this.props.model.forEach(el => {
      if (el.keyName) {
        this.refList[el.keyName] = createRef();
      };
    });
  };

  //Получить список элементов для выпадающего списка
  getMenuItemList(list) {
    if (!list) {
      return null;
    };

    return list.map((option, index) => {
      return <MenuItem
        key={index}
        value={index}>
        {option}
      </MenuItem>
    });
  };

  //Событие изменения значений полей
  valueChange = (event) => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    // this.setState(newState);
  };

  //сохранение изменений из формы
  formSubmit = () => {
    const { flightList, flight, model, newID, flightAdded, flightChanged } = this.props;
    let newFlight = flight || {};

    model.forEach(el => {
      if (el.keyName) {
        newFlight[el.keyName] = this.refList[el.keyName].current.value;
      };
    });

    if (flight) {
      //Изменение существующего 
      flightChanged(flightList, newFlight);
    } else {
      //Добавление нового
      newFlight.id = newID;
      flightAdded(flightList, newFlight);
    };
  };

  render() {
    const { isOpen, model, flight, modalWindowClose } = this.props;

    return (
      <Dialog open={isOpen} onClose={modalWindowClose}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={modalWindowClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' >
              {flight
                ? `Изменение информации о рейсе ${flight.number}`
                : 'Добавление нового рейса'}
            </Typography>
            <Button onClick={this.formSubmit} >
              {flight
                ? 'Изменить'
                : 'Добавить'}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {model.map((el, index) => {
            return {
              'string':
                <TextField
                  id='standard-name'
                  key={index}
                  placeholder='Начните вводить'
                  defaultValue={flight ? flight[el.keyName] : ''}
                  inputRef={this.refList[el.keyName]}
                  fullWidth
                  name={el.keyName}
                  onChange={this.valueChange}
                  label={el.title}
                  margin='normal'
                />,
              'time':
                <TextField
                  id='time'
                  key={index}
                  name={el.keyName}
                  inputRef={this.refList[el.keyName]}
                  onChange={this.valueChange}
                  label={el.title}
                  type='time'
                  fullWidth
                  defaultValue={flight && flight[el.keyName]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                />,
              'select':
                <Select
                  key={index}
                  value={flight/*.status  || (flight && flight.status) */}
                  inputRef={this.refList[el.keyName]}
                  name={el.keyName}
                  onChange={this.valueChange}
                  fullWidth
                >
                  {this.getMenuItemList(el.options)}
                </Select>

            }[el.type]
          })}

        </List>
      </Dialog>
    );
  };
};

function mapStateToProps(state) {

  return {
    isOpen: state.modalStatus,
    model: state.scheduleModel,
    flight: state.flightList.find(el => el.id === state.selectedFlight),
    newID: state.flightList.length,
    flightList: state.flightList
  };
};

function matchDispatchToProps(dispatch) {

  return bindActionCreators({
    modalWindowClose: modalWindowClose,
    flightAdded: flightAdded,
    flightChanged: flightChanged
  }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddChangeFlightWindow);
