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
          <select>
            <option>alphabetically</option>
            <option>by length</option>
          </select>
        </div>

        <div className='setting_container'>
          <p>Include words of the following lengths:</p>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>3</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>4</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>5</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>6</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>7</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>8</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>9</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>10</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>11</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>12</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>13</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>14</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>15</p></div>
          <div className="checkbox_wrapper"><input type='checkbox' /><p>16</p></div>
        </div>

      </section>
    );
  }
}


export default Settings;