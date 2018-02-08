var app = require('./index.js');
var db = app.get('db');
const dictionary = require('./dictionary.js');

var subDictionary = {};

// Creates a more efficient dictionary organized by first 3 letters of each word.
for (var letter in dictionary){
  for (var i in dictionary[letter]){
    let word = dictionary[letter][i];
    let firstThree = word.substring(0,3);
    if (!subDictionary[firstThree]){
      subDictionary[firstThree] = [];
    }
    subDictionary[firstThree].push(word);
  }
}

let words = [];

let combinationCount = 0;
let wordCheckCount = 0;

function isWord(str){
  wordCheckCount++;
  combinationCount++;
  let firstThree = str.substring(0,3);
  // If our subDictionary doesn't have a list for those first three letters, that means we have no words that start with those letters
  // If it does have one, check if our full str is included in there as a word or not
  if (subDictionary[firstThree] && subDictionary[firstThree].includes(str)){
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
  }else if (str.length > 2){
    combinationCount++;
  }

  for (let row = i-1; row <= i+1 && row <= 3; row++){
    for (let col = j-1; col <= j+1 && col <= 3; col++){
      if (str.length < 12 && row >= 0 && col >= 0 && !visited[row][col]){
        findWordsUtil(board, visited, row, col, str);
      }
    }
  }

  str = str.substring(0, str.length - 1);
  visited[i][j] = false;
}

function findWords(board){
  words = [];
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
  console.log(wordCheckCount + ' dictionary lookups');
  console.log(combinationCount + ' letter combinations of 3 letters or more');
  return words;
}

module.exports = {
  findWords
};
