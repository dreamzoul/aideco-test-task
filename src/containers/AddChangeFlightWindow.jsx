import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalStatusChange, flightListChange } from '../store/flightSchedule/actions';
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

class AddChangeFlightWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props.flight };
  }

  //Получить список элементов для выпадающего списка
  getMenuItemList(list) {
    if (!list) {
      return null;
    }

    return list.map((option, index) => {
      return <MenuItem value={index}>{option}</MenuItem>
    })
  };

  //Событие изменения значений полей
  valueChange = (event) => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  //сохранение изменений из формы
  formSubmit = () => {
    let newFlight = {};
    if (this.props.flight) {
      newFlight = {
        ...this.props.flight,
        ...this.state
      };
    } else {
      newFlight = { id: this.props.newID, ...this.state };
    }
    this.props.flightListChange(newFlight);
  }

  render() {
    const { isOpen, model, flight, modalStatusChange } = this.props;
    const { status } = this.state;

    return (
      <Dialog fullScreen open={isOpen} onClose={modalStatusChange}>
        <AppBar position='inherit'>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={modalStatusChange} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' >
              {flight
                ? `Изменение информации о рейсе ${flight.number}`
                : 'Добавление нового рейса'}
            </Typography>
            <Button color='second' onClick={this.formSubmit} >
              {flight
                ? 'Изменить'
                : 'Добавить'}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {model.map(el => {
            return {
              'string':
                <TextField
                  id='standard-name'
                  placeholder='Начните вводить'
                  defaultValue={flight ? flight[el.keyName] : ''}
                  fullWidth
                  name={el.keyName}
                  onChange={this.valueChange}
                  label={el.title}
                  margin='normal'
                />,
              'time':
                <TextField
                  id='time'
                  name={el.keyName}
                  onChange={this.valueChange}
                  label={el.title}
                  type='time'
                  fullWidth
                  defaultValue={flight ? flight[el.keyName] : '07:30'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                />,
              'select':
                <Select
                  value={status || (flight && flight.status)}
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
  }
};

function mapStateToProps(state) {

  return {
    isOpen: state.modalStatus,
    model: state.scheduleModel,
    flight: state.flightList.find(el => el.id === state.selectedFlight),
    newID: state.flightList.length
  };
};
function matchDispatchToProps(dispatch) {

  return bindActionCreators({
    modalStatusChange: modalStatusChange,
    flightListChange: flightListChange
  }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddChangeFlightWindow);
