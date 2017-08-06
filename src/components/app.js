import React, { Component } from 'react';
import * as actions from '../actions'

import Header from './header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        </div>
    );
  }
}
