import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Countdown from 'react-countdown-now';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

import './App.css';

class App extends Component {
  state = {
   	frameRate: 100,
    timeSelected: "",
    count: Date.now(),
    valueOfPi: 0,
    hasntStarted:"true"
  }

  onSliderChange = (frameRate) => {
    this.setState({
      frameRate: frameRate,
    });
  }

  restartSimulation = () => {
    window.location.reload();
  }

  valueOfPiHandler = (valueOfPi) => {
    this.setState({ valueOfPi });
  }

  onCompleteHandler = () => {
    this.setState({ hasntStarted: "done" });
 }

  onButtonClicked = (e) => {
    if(this.state.timeSelected == "" ) {
      alert("Please enter seconds for simulation");
    } else if(this.state.timeSelected < 0) {
      alert("Invalid entry of seconds for simulation");
    } else {
      this.setState({
        count: this.state.timeSelected *1000 + Date.now(),
        frameRate: 100,
        hasntStarted: "false"
      });
    }
  }

  updateInputValue = (e) => {
    this.setState({timeSelected: e.target.value});
  }

  p5Wrapper = () => {
    return (
        <div id="piBox">
          <P5Wrapper sketch={sketch} frameRate={this.state.frameRate} valueOfPi={this.valueOfPiHandler} stop={this.state.hasntStarted}/> 
        </div>
    )
  }

  slider = () => {
    return (
        <div id="slider">
          <Slider default={this.state.frameRate} max={10000} min={0} onChange={this.onSliderChange}/>
        </div>
    )
  }

  doAgainSection = () => {
    return (
        <div className="hiddenv buttonFont" id="doAgain">
          <Button className="button" size="large" content="Do Another Simulation" primary onClick={this.restartSimulation}/>
        </div>
    )
  }

  secondsInputAreaForSimulation = () => {
    return (
        <div className="top">
          <h3 className="enterSecondsTitle">How many seconds you would like the simulation to run for:</h3>
          <Input type="number" min="0" className="secondsInput" size='large' value={this.state.timeSelected} onChange={this.updateInputValue} /><br/>
          <Button className="button buttonFont" size='medium' content='Start Simulation' primary onClick={this.onButtonClicked}/> 
        </div>
    )
  }

  render() {
    if(this.state.hasntStarted == "true") {
      return ( 
        <div>
          {this.secondsInputAreaForSimulation()}
        </div>
      );
    } else {
      return (
        <div className="application"> 
          <h2 id="valueOfPi"></h2>
        	{this.p5Wrapper()}
     	    <div id="frameRateText">
            <h3>Frame Rate:<div id="frameRate">{this.state.frameRate}</div></h3>
          </div>
          {this.slider()}
          <h3 id="counter"> Countdown: <Countdown date={this.state.count } onComplete={this.onCompleteHandler}/></h3>
          {this.doAgainSection()}
        </div>
      );
    }
  }
}
export default App;
