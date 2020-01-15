// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import 'moment/locale/custom'  // without this line it didn't work
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

  getMinuteDifferent = () =>{
    const { time } = this.props;
    const currentTime  =  moment(time);
    const duration = moment.duration(moment().diff(currentTime));
    const mins = duration.asMinutes();
    let color  = "";
    switch(true){
      case mins < 5 :
        color = "#27ae60";
        break;
      case mins < 10 :
        color = "#e67e22";
        break;
      case mins > 10 :
        color ="#c0392b";
        break;  
          
    }
    return color;
  }

  render() {
    const { time, hideAgo, style } = this.props;
    const color = this.getMinuteDifferent();
    return (
      <Text style={[style,{color : color}]}>
        {moment(time).locale('custom').fromNow(hideAgo)}
      </Text>
    );
  }
}
