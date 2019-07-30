import React from 'react';
import { connect } from 'react-redux';
import { Header, FlightTable, AddChangeFlightWindow } from '.';
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

export default connect(mapStateToProps)(MainWindow);
