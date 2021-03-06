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
      organizeBy: 'by length',
      include: {
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: false,
        14: false,
        15: false,
        16: false,
      },
    }

    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.updateOrganization = this.updateOrganization.bind(this);
    this.updateInclusions = this.updateInclusions.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.submitBoard = this.submitBoard.bind(this);
  }

  // Opens/closes the settings modal
  toggleSettingsModal(){
    this.setState({
      showSettingsModal: !this.state.showSettingsModal
    })
  }

  // closes the settings modal
  closeSettingsModal(){
    this.setState({
      showSettingsModal: false
    })
  }

  // Updates the organization value on state. This function is passes as a prop to the settings modal component
  updateOrganization(newVal){
    this.setState({
      organizeBy: newVal
    })
  }

  // Updates the inclusions object on state. This function is passes as a prop to the settings modal component. 
  // Only words with the lengths listed as 'true' in this object will be included in the results.
  updateInclusions(target, newVal){
    let include = this.state.include;
    include[target] = newVal;
    this.setState({include});
  }

  // Updates the board inputs as you type. Also checks that the user only types letters into the board, and only 
  // one letter per space. Automatically makes the letters lowercase. Also auto focuses the next input as the user types.
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

  /* 
    Checks that all of the spaces are filled in. If not, it alerts the user. If so, it adds the loading gif, and submits 
    the board to the back end, along with the inclusions object. The back end will figure out all of the word 
    combinations that are contained in the dictionary, include only results with lenths listed as 'true' in the inclusions
    object, and then send it back to the front end. This function then adds up the total point value of the results, then
    calls the organizeResults() function to organize the results according to the setting the user has specified in the 
    settings modal. Lastly it removes the loading gif from the screen and updates state with the results and the point total
  */
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
    axios.post('/api/getWords', {board: this.state.board, include: this.state.include} )
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

        matches = this.organizeResults(matches);

        this.setState({
          matches: matches,
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

  // This function is called by the submitBoard() function once it gets results from the back end. this function organizes the 
  // results alphabetically, and ALSO by length if the user has selected that setting.
  organizeResults(arr){
    arr = arr.sort();
    if (this.state.organizeBy === 'by length'){
      let sorting = true;
      while (sorting){
        sorting = false;
        for (var i = 0; i < arr.length-1; i++){
          if (arr[i].length < arr[i+1].length){
            let temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
            sorting = true;
          }
        }
      }
    }
    return arr;
  }

  render() {
    return (
      <div className="home">

        { this.state.loading ?
            <img src={loadingGif} className="loading_gif" alt='loading' />
          : null
        }

        <div className='toggle_settings'>
          <button className="toggle_settings_btn" onClick={this.toggleSettingsModal} >Settings</button>
        </div>

        { this.state.showSettingsModal ?
            <Settings close={this.closeSettingsModal} include={this.state.include} organizeBy={this.state.organizeBy} updateOrganization={this.updateOrganization} updateInclusions={this.updateInclusions} />
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