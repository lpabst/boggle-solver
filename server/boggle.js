var app = require('./index.js');
var db = app.get('db');
const wordList = require('./dictionary.js');
const list = wordList.list;

var dictionary = {
  length9: {},
  length12: {},
  length16: {},
};

// Creates a more efficient dictionary
for (var i in list){
  let word = list[i];
  let letters1To3 = word.substring(0,3);
  let letters4To6 = word.substring(3,6);
  let letters7To9 = word.substring(6,9);

  if (word.length <= 9){
    if (!dictionary.length9[letters1To3]){
      dictionary.length9[letters1To3] = [];
    }
    dictionary.length9[letters1To3].push(word);
  }else if (word.length <= 12){
    if (!dictionary.length12[letters1To3]){
      dictionary.length12[letters1To3] = {};
    }
    if (!dictionary.length12[letters1To3][letters4To6]){
      dictionary.length12[letters1To3][letters4To6] = [];
    }
    dictionary.length12[letters1To3][letters4To6].push(word);
  }else if (word.length <= 16){
    if (!dictionary.length16[letters1To3]){
      dictionary.length16[letters1To3] = {};
    }
    if (!dictionary.length16[letters1To3][letters4To6]){
      dictionary.length16[letters1To3][letters4To6] = {};
    }
    if (!dictionary.length16[letters1To3][letters4To6][letters7To9]){
      dictionary.length16[letters1To3][letters4To6][letters7To9] = [];
    }
    dictionary.length16[letters1To3][letters4To6][letters7To9].push(word);
  }
  
}

let words = [];

let combinationCount = 0;
let wordCheckCount = 0;
let debugCount = 0;

function isWord(str){
  // wordCheckCount++;
  // combinationCount++;
  
  let letters1To3 = str.substring(0,3);
  let letters4To6 = str.substring(3,6);
  let letters7To9 = str.substring(6,9);
  // If our dictionary doesn't have a list for those first three letters, that means we have no words that start with those letters
  // If it does have one, check if our full str is included in there as a word or not
  if (str.length <= 7){
    if (dictionary.length9[letters1To3] && dictionary.length9[letters1To3].includes(str)){
      return true;
    }else{
      return false;
    }
  }
  else if (str.length <= 10){
    if (dictionary.length12[letters1To3] && dictionary.length12[letters1To3][letters4To6] && dictionary.length12[letters1To3][letters4To6].includes(str)){
      return true;
    }else{
      return false;
    }
  }
  else if (str.length <= 16){
    if (dictionary.length16[letters1To3] && dictionary.length16[letters1To3][letters4To6] && dictionary.length16[letters1To3][letters4To6][letters7To9] && dictionary.length16[letters1To3][letters4To6][letters7To9].includes(str)){
      return true;
    }else{
      return false;
    }
  }
}

function findWordsUtil(board, visited, i, j, str){
  visited[i][j] = true;
  str = str + board[i][j];

  if (str.length > 2 && !words.includes(str) && isWord(str)){
    words.push(str);
  }else if (str.length > 2){
    // combinationCount++;
  }

  for (let row = i-1; row <= i+1 && row <= 3; row++){
    for (let col = j-1; col <= j+1 && col <= 3; col++){
      if (str.length < 10 && row >= 0 && col >= 0 && !visited[row][col]){
        findWordsUtil(board, visited, row, col, str);
      }
    }
  }

  str = str.substring(0, str.length - 1);
  visited[i][j] = false;
}

function findWords(board){
  let ms1 = new Date();
  ms1 = ms1.getTime();

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
  // console.log(wordCheckCount + ' dictionary lookups');
  // console.log(combinationCount + ' letter combinations of 3 letters or more');
  let ms2 = new Date();
  ms2 = ms2.getTime();
  console.log(ms2-ms1 + ' Milliseconds to compute');
  return words;
}

module.exports = {
  findWords
};
