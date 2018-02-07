var app = require('./index.js');
var db = app.get('db');
const dictionary = require('./dictionary.js');

let words = [];

function isWord(str){
  let firstLetter = str.substring(0,1);
  if (dictionary[firstLetter].includes(str)){
    return true;
  }else{
    return false;
  }
}

function findWordsUtil(board, visited, i, j, str){
  visited[i][j] = true;
  str = str + board[i][j];

  if (str.length > 2 && !words.includes(str) && isWord(str)){
    words.push(str);
  }

  for (let row = i-1; row <= i+1 && row <= 3; row++){
    for (let col = j-1; col <= j+1 && col <= 3; col++){
      if (str.length < 8 && row >= 0 && col >= 0 && !visited[row][col]){
        findWordsUtil(board, visited, row, col, str);
      }
    }
  }

  str = str.substring(0, str.length - 1);
  visited[i][j] = false;
}

function findWords(board){
  let visited = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];
  let str = '';
  for (let i = 0; i <= 3; i++){
    for (let j = 0; j <= 3; j++){
      findWordsUtil(board, visited, i, j, str);
    }
  }
  // console.log(words);
  return words;
}

module.exports = {
  findWords
};
