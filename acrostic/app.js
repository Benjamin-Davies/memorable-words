"use strict";
var apiQuery = 'https://api.datamuse.com/words?sp=%s????*';
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var inputs = document.getElementById('inputs');
var output = document.getElementById('output');
inputs.addEventListener('submit', function (e) {
    e.preventDefault();
    var wordInput = document.getElementById('word');
    var word = wordInput.value;
    createAcrostic(word);
});
function createAcrostic(word) {
    var characters = word.toUpperCase() // Change the word to upper case
        .split(''); // Get each character
    var lines = characters.map(getLine);
    // Display at the same time
    // Promise.all(lines)
    //   .then(lineValues =>
    //     output.innerHTML = lineValues.map(line => `<li><b>${line.charAt(0)}</b>${line.slice(1)}</li>`).join('')
    //   );
    // Display as they come in (appears more responsive)
    output.innerHTML = '';
    lines.forEach(function (linePromise) {
        var lineElem = document.createElement('li');
        lineElem.innerHTML = '<b>?</b> Loading';
        output.appendChild(lineElem);
        linePromise.then(function (line) {
            return lineElem.innerHTML = "<b>" + line.charAt(0) + "</b>" + line.slice(1);
        });
    });
}
function getLine(char) {
    if (!letters.includes(char))
        return new Promise(function (res) { return res('-'); });
    return fetch(apiQuery.replace('%s', char))
        .then(function (res) { return res.json(); })
        .then(function (words) {
        return words[rand(words.length)].word;
    });
}
function rand(max) {
    return Math.floor(Math.random() * max);
}
