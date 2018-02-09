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

/* 
  Creates a more efficient dictionary: creates subDictionaries based on length, then again based on the first letters of each word.
  Words of length 5 or less are organized into arrays by the first 2 letters of the word. 
  Words of length 6-8 are organized into objects based on the first 2 letters of the word, then into arrays by the 3rd/4th letters.
  Words of length 9-11 is the same idea, but 3 levels deep.
  Words of length 12-16 is the same idea, but 4 levels deep.
  **This function runs when the server starts, so by the time the user makes a call to the back end, this is all organized already so
  it won't slow down the time it take to get the user their results.
*/
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

// Looks in our dictionary to see if a string of letters is contained in there somewhere. Drills down into the objects and arrays based
// on length to check for the words.
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

/* 
  Recursive function that checks every single combination of Boggle cubes. Takes in the board object, visited object, new position (i & j)
  and the current str (combination of characters formed by the Boggle cubes we've already visited). Adds the new letter(position) to the str,
  and marks that letter/cube as 'visited' so we don't revisit the same cubes. It checks if this word has a length that we are trying to include
  in our results. If so, it then checks if the new word is 3 letters or longer, if so, it then checks to see if we already have that word 
  in our results, if not, checks the dictionary to see if it's a word. If so, it adds it to the results (words array). After that, it checks all
  of the cubes around our current cube, and for each one that hasn't been visited yet, calls the function again with each cube as the new
  position (i & j). After it drills all the way down into all of the combinations for each cube, at the end it marks that cube as 'not visited'
  so that starting with a different cube this cube will be available again.
*/
function findWordsUtil(board, visited, i, j, str){
  visited[i][j] = true;
  str = str + board[i][j];

  if (includeLengths[str.length] && str.length > 2 && !words.includes(str) && isWord(str)){
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

// Creates a date at the beginning and end of the function to find how long it took to run the function.
// Resets the words array to [] for each call, and sets the includeLengths object based on what is received from the front end.
// Starts a blank string, and for each cube on the board calls findWordsUtil() to find all of the word combinations that start with that letter
// At the end, it logs how many dictionary lookups occured, as well as how long it took to complete, then returns the words array to the front end.
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
