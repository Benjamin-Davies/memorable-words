const apiQuery = 'http://api.datamuse.com/words?sp=%s????*';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const inputs = <HTMLFormElement>document.getElementById('inputs');
const output = <HTMLElement>document.getElementById('output');

inputs.addEventListener('submit', (e) => {
  e.preventDefault();

  const wordInput = <HTMLInputElement>document.getElementById('word');
  const word = wordInput.value;

  createAcrostic(word);
});

function createAcrostic(word: string) {
  const characters = word.toUpperCase() // Change the word to upper case
    .split(''); // Get each character
  const lines = characters.map(getLine);

  // Display at the same time
  // Promise.all(lines)
  //   .then(lineValues =>
  //     output.innerHTML = lineValues.map(line => `<li><b>${line.charAt(0)}</b>${line.slice(1)}</li>`).join('')
  //   );

  // Display as they come in (appears more responsive)
  output.innerHTML = '';
  lines.forEach(linePromise => {
    const lineElem = document.createElement('li');
    lineElem.innerHTML = '<b>?</b> Loading';
    output.appendChild(lineElem);

    linePromise.then(line =>
      lineElem.innerHTML = `<b>${line.charAt(0)}</b>${line.slice(1)}`);
  });
}

function getLine(char: string) {
  if (!letters.includes(char))
    return new Promise<string>(res => res('-'));
  
  return fetch(apiQuery.replace('%s', char))
    .then(res => res.json())
    .then((words: WordResult[]) =>
      words[rand(words.length)].word
    );
}

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

interface WordResult {
  word: string;
  score: number;
}
