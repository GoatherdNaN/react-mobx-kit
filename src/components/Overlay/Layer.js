import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 层组件
 */

export default class Layer extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  el;

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}
