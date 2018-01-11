import { Component } from 'react';
import { is } from 'immutable';

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.color = ['#2CA51A', '#0BBEFE', '#EA6C6B', '#F8B853', '#8AAAF6', '#4F76D1', '#C1DFFF', '#F7F7F7'];
    this.fontSize = 12;
    this.fontColor = '#999999';
    this.gridColor = '#E9E9E9';
    this.emphasisColor = '#108EE9';
    this.titleColor = '#4A4A4A';
    this.titleSize = 14;
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps === null ? {} : nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState === null ? {} : nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }
}
