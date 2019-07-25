import React from 'react';
import { connect } from 'react-redux';
import { Header, FlightTable, AddChangeFlightWindow } from '.';
import { bindActionCreators } from 'redux';
import { modalStatusChange } from '../store/flightSchedule/actions';
import './MainWindow.css';

class MainWindow extends React.Component {

  render() {

    return (
      <div className='main-window'>
        <Header />
        <FlightTable />
        <AddChangeFlightWindow />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    post: state
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    modalStatusChange: modalStatusChange,
  }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(MainWindow);

