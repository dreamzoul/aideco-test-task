import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalWindowOpen } from '../store/flightSchedule/actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

class Header extends Component {

  render() {

    return (
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <Typography variant='h6'>
            Таблица рейсов самолетов
          </Typography>
          <Button
            color='inherit'
            onClick={this.props.modalWindowOpen} >
            <AddCircleOutline />
            Добавить рейс
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    modalWindowOpen: modalWindowOpen,
  }, dispatch)
};

export default connect(null, matchDispatchToProps)(Header);
