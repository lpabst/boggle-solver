# Boggle-Solver

Type in the letters that appear on your boggle board, and this app will search through a dictionary of over 450,000 words to find all of the matches in the boggle board.

I've used a recursive algorithm to check every possible combination of Boggle cubes (12,029,640 combinations), and any combination 3 letters or longer is checked against a 450,000 word dictionary to see if it's a word or not.

I've organized the dictionary into a trie data structure. The first split is based on word length; 5 letters or smaller, 6-8 letters, 9-11 letters, and 12-16 letters. Based on word length, further splits are made: 
    -For words 5 letters or less, they are organized into separate arrays based on the first 2 letters of the word, so there is an array for words that start with 'aa', another one for words that start with 'ab', 'ac', 'ad', etc...
    -For words 6-8 letters long, they are split up into separate objects based on the first 2 letters of each word, then split into separate arrays based on the 3rd and 4th letter of each word. So inside the 'aa' object there is an 'aa' array, an 'ab' array and so forth. So words that start with 'aaaa' would end up in the 'aa object and inside the 'aa' array. Words that start with 'aaab' would end up inside the 'aa' object as well, but in the 'ab' array, etc...
    -For words 9-11 letters long, it's the same idea, but 3 levels deep.
    -For words 12-16 letters long, it's the same idea, but 4 levels deep.

Searching the entire Boggle board takes about 7.5 seconds (on my laptop) with the current data structure and algorithm. Check out server/info.txt to see some of the test results

