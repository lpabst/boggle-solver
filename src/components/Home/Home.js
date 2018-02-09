import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

import loadingGif from './../../media/loading.gif';

import Settings from './Settings/Settings.js';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettingsModal: false,
      matches: [],
      board: [
        ['', '', '', ''], 
        ['', '', '', ''], 
        ['', '', '', ''], 
        ['', '', '', '']
      ],
      loading: false,
      resultsScore: 0,
    }

    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.submitBoard = this.submitBoard.bind(this);
  }

  toggleSettingsModal(){
    this.setState({
      showSettingsModal: !this.state.showSettingsModal
    })
  }

  closeSettingsModal(){
    this.setState({
      showSettingsModal: false
    })
  }

  updateBoard(i, j, e) {
    let board = [...this.state.board];
    // If they backspaced so it's empty, OR they typed in just one letter, do this stuff
    if (!e.target.value || (e.target.value.match(/[a-z]/i) && e.target.value.length < 2)){

      board[i][j] = e.target.value.toLowerCase();
      this.setState({ board }); 
      
      let inputs = document.getElementsByTagName('input');
      let activeElement = document.activeElement;
      for (var m = 0; m < inputs.length; m++){
        // If they typed something in so it's not empty, and we aren't on the last input, focus the next input
        if (e.target.value && m < inputs.length-1 && inputs[m] === activeElement){
          return inputs[m+1].focus();
        }
      }
      
    }
  }

  submitBoard() {

    let filledIn = true;
    let board = [...this.state.board];

    for (let i = 0; i < board.length; i++){
      for (let j = 0; j < board[i].length; j++){
        if (!board[i][j]){
          filledIn = false;
        }
      }
    }

    // Warn the user of empty spaces
    if (!filledIn){
      return this.setState({
        matches: ['Board has empty spaces, so no results were returned']
      })
    }

    this.setState({loading: true});

    // If all spaces are filled in, get the word matches from the back end and count up the points
    axios.post('/api/getWords', this.state.board)
      .then(res => {
        let matches = res.data;
        let sum = 0;
        let scoring = {
          3: 1,
          4: 1,
          5: 2,
          6: 3,
          7: 5,
          longer: 11,
        }

        for (var i in matches){
          let length = matches[i].length;
          if (scoring[length]){
            sum += scoring[length];
          }else{
            sum += 11
          }
        }

        this.setState({
          matches: res.data,
          loading: false,
          resultsScore: sum
        })
      })
      .catch( err => {
        this.setState({
          matches: ['Error'],
          loading: false
        })
      })
  }

  handleKeyDown(e){

  }

  render() {
    return (
      <div className="home">

        {
          this.state.loading ?
            <img src={loadingGif} className="loading_gif" alt='loading' />
          : null
        }

        <div className='toggle_settings'>
          <button className="toggle_settings_btn" onClick={this.toggleSettingsModal} >Settings</button>
        </div>

        {
          this.state.showSettingsModal ?
            <Settings close={this.closeSettingsModal} />
          : null
        }

        <h2>Boggle Word Finder</h2>

        <div className='board'>
          <div className='row'>
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(0, 0, e)} value={this.state.board[0][0]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(0, 1, e)} value={this.state.board[0][1]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(0, 2, e)} value={this.state.board[0][2]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(0, 3, e)} value={this.state.board[0][3]} />
          </div>
          <div className='row'>
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(1, 0, e)} value={this.state.board[1][0]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(1, 1, e)} value={this.state.board[1][1]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(1, 2, e)} value={this.state.board[1][2]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(1, 3, e)} value={this.state.board[1][3]} />
          </div>
          <div className='row'>
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(2, 0, e)} value={this.state.board[2][0]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(2, 1, e)} value={this.state.board[2][1]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(2, 2, e)} value={this.state.board[2][2]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(2, 3, e)} value={this.state.board[2][3]} />
          </div>
          <div className='row'>
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(3, 0, e)} value={this.state.board[3][0]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(3, 1, e)} value={this.state.board[3][1]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(3, 2, e)} value={this.state.board[3][2]} />
            <input onKeyDown={this.handleKeyDown} onChange={(e) => this.updateBoard(3, 3, e)} value={this.state.board[3][3]} />
          </div>

          <button onClick={this.submitBoard} >Submit</button>
        </div>
        
        <div className='results_box'>
          <p>Results ({this.state.resultsScore} points)</p>
          <div className='results' value={this.state.matches} >
            {
              this.state.matches.map( (item, i) => {
                return <p key={i}>{item}</p>
              })
            }
          </div>
        </div>

      </div>
    );
  }
}


export default Home;