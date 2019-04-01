/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

const awaitPortal = containerId => Comp => class AwaitPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: null,
    };

    this.watchReady = this.watchReady.bind(this);
  }

  watchReady() {
    const portal = document.getElementById(containerId);
    if (portal) {
      this.setState({ portal });
    } else {
      setTimeout(() => this.watchReady(), 100);
    }
  }

  componentDidMount() {
    this.watchReady();
  }

  render() {
    return <Comp {...this.props} {...this.state} />;
  }
};

export default awaitPortal;
