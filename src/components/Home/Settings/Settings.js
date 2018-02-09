import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {

  constructor(props){
    super(props);

    this.state = {

    }

  }

  componentDidMount(){
    
  }

  render() {
    return (
      <section className='settings'>
        
        <p onClick={this.props.close} className="settings_close" >X</p>

        <div className='setting_container'>
          <p>Organize results</p>
          <select value={this.props.organizeBy} onChange={(e) => this.props.updateOrganization(e.target.value)}>
            <option>alphabetically</option>
            <option>by length</option>
          </select>
        </div>

        <div className='setting_container'>
          <p>Include words of the following lengths:</p>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('3', e.target.checked)} checked={this.props.include['3']} type='checkbox' /><p>3</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('4', e.target.checked)} checked={this.props.include['4']} type='checkbox' /><p>4</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('5', e.target.checked)} checked={this.props.include['5']} type='checkbox' /><p>5</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('6', e.target.checked)} checked={this.props.include['6']} type='checkbox' /><p>6</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('7', e.target.checked)} checked={this.props.include['7']} type='checkbox' /><p>7</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('8', e.target.checked)} checked={this.props.include['8']} type='checkbox' /><p>8</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('9', e.target.checked)} checked={this.props.include['9']} type='checkbox' /><p>9</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('10', e.target.checked)} checked={this.props.include['10']} type='checkbox' /><p>10</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('11', e.target.checked)} checked={this.props.include['11']} type='checkbox' /><p>11</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('12', e.target.checked)} checked={this.props.include['12']} type='checkbox' /><p>12</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('13', e.target.checked)} checked={this.props.include['13']} type='checkbox' /><p>13</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('14', e.target.checked)} checked={this.props.include['14']} type='checkbox' /><p>14</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('15', e.target.checked)} checked={this.props.include['15']} type='checkbox' /><p>15</p></div>
          <div className="checkbox_wrapper"><input onChange={(e) => this.props.updateInclusions('16', e.target.checked)} checked={this.props.include['16']} type='checkbox' /><p>16</p></div>
        </div>

      </section>
    );
  }
}


export default Settings;