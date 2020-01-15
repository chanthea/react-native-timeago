// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import 'moment/locale/custom'  // without this line it didn't work
moment.locale('custom')
export default class TimeAgo extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean
  };
  state: { timer: null | number } = { timer: null };

  static defaultProps = {
    hideAgo: false,
    interval: 60000
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo } = this.props;
    return (
      <Text {...this.props}>
        {moment(time).locale('custom').fromNow(hideAgo)}
      </Text>
    );
  }
}
