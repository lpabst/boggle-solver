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
      </section>
    );
  }
}


export default Settings;