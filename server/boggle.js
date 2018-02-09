var app = require('./index.js');
var db = app.get('db');
const wordList = require('./dictionary.js');
const list = wordList.list;

var dictionary = {
  length5: {},
  length8: {},
  length11: {},
  length16: {},
};

// Creates a more efficient dictionary, creates subDictionaries based on length, then again based on the first letters of each word
for (let i = 0; i < list.length; i++){
  let word = list[i];
  let letters1To2 = word.substring(0,2);
  let letters3To4 = word.substring(2,4);
  let letters5To6 = word.substring(4,6);
  let letters7To8 = word.substring(6,8);

  if (word.length <= 5){
    if (!dictionary.length5[letters1To2]){
      dictionary.length5[letters1To2] = [];
    }
    dictionary.length5[letters1To2].push(word);
  }else if (word.length <= 8){
    if (!dictionary.length8[letters1To2]){
      dictionary.length8[letters1To2] = {};
    }
    if (!dictionary.length8[letters1To2][letters3To4]){
      dictionary.length8[letters1To2][letters3To4] = [];
    }
    dictionary.length8[letters1To2][letters3To4].push(word);
  }else if (word.length <= 11){
    if (!dictionary.length11[letters1To2]){
      dictionary.length11[letters1To2] = {};
    }
    if (!dictionary.length11[letters1To2][letters3To4]){
      dictionary.length11[letters1To2][letters3To4] = {};
    }
    if (!dictionary.length11[letters1To2][letters3To4][letters5To6]){
      dictionary.length11[letters1To2][letters3To4][letters5To6] = [];
    }
    dictionary.length11[letters1To2][letters3To4][letters5To6].push(word);
  }else if (word.length <= 16){
    if (!dictionary.length16[letters1To2]){
      dictionary.length16[letters1To2] = {};
    }
    if (!dictionary.length16[letters1To2][letters3To4]){
      dictionary.length16[letters1To2][letters3To4] = {};
    }
    if (!dictionary.length16[letters1To2][letters3To4][letters5To6]){
      dictionary.length16[letters1To2][letters3To4][letters5To6] = {};
    }
    if (!dictionary.length16[letters1To2][letters3To4][letters5To6][letters7To8]){
      dictionary.length16[letters1To2][letters3To4][letters5To6][letters7To8] = [];
    }
    dictionary.length16[letters1To2][letters3To4][letters5To6][letters7To8].push(word);
  }
  
}

let words = [];
let includeLengths = {};

let wordCheckCount = 0;
let debugCount = 0;

// Looks in our dictionary to see if a string of letters is contained in there somewhere
function isWord(str){
  wordCheckCount++;
  
  let letters1To2 = str.substring(0,2);
  let letters3To4 = str.substring(2,4);
  let letters5To6 = str.substring(4,6);
  let letters7To8 = str.substring(6,8);
  
  if (str.length <= 5){
    if (dictionary.length5[letters1To2] && dictionary.length5[letters1To2].includes(str)){
      return true;
    }else{
      return false;
    }
  }
  else if (str.length <= 8){
    if (dictionary.length8[letters1To2] && dictionary.length8[letters1To2][letters3To4] && dictionary.length8[letters1To2][letters3To4].includes(str)){
      return true;
    }else{
      return false;
    }
  }
  else if (str.length <= 11){
    if (dictionary.length11[letters1To2] && dictionary.length11[letters1To2][letters3To4] && dictionary.length11[letters1To2][letters3To4][letters5To6] && dictionary.length11[letters1To2][letters3To4][letters5To6].includes(str)){
      return true;
    }else{
      return false;
    }
  }
  else if (str.length <= 16){
    if (dictionary.length16[letters1To2] && dictionary.length16[letters1To2][letters3To4] && dictionary.length16[letters1To2][letters3To4][letters5To6] && dictionary.length16[letters1To2][letters3To4][letters5To6][letters7To8] && dictionary.length16[letters1To2][letters3To4][letters5To6][letters7To8].includes(str)){
      return true;
    }else{
      return false;
    }
  }
}

function findWordsUtil(board, visited, i, j, str){
  visited[i][j] = true;
  str = str + board[i][j];

  if (str.length > 2 && !words.includes(str) && isWord(str) && includeLengths[str.length]){
    words.push(str);
  }

  for (let row = i-1; row <= i+1 && row <= 3; row++){
    for (let col = j-1; col <= j+1 && col <= 3; col++){
      if (str.length < 16 && row >= 0 && col >= 0 && !visited[row][col]){
        findWordsUtil(board, visited, row, col, str);
      }
    }
  }

  str = str.substring(0, str.length - 1);
  visited[i][j] = false;
}

function findWords(board, include){
  let ms1 = new Date();
  ms1 = ms1.getTime();

  words = [];
  includeLengths = include;
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
  let ms2 = new Date();
  ms2 = ms2.getTime();
  console.log(ms2-ms1 + ' Milliseconds to compute');
  return words;
}

module.exports = {
  findWords
};
