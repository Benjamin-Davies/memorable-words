const inputs = document.forms.namedItem('inputs');
const output = document.getElementById('output');

const elements = [' ', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Uub', 'Uut', 'Uuq', 'Uup', 'Uuh', 'Uus', 'Uuo'];

inputs.addEventListener('submit', ev => {
  ev.preventDefault();

  const word = inputs.elements.namedItem('word').value;
  output.innerHTML = elementify(word.toLowerCase()) || '?';
});

const elementMap = {};
for (const element of elements) {
  elementMap[element.toLowerCase()] = element;
}
const maxLen = elements.reduce((max, elem) => Math.max(elem.length, max), 0);

/**
 * @param {string} word 
 */
function elementify(word) {
  if (word.length === 0) {
    return ''
  }

  for (let i = maxLen; i > 0; i--) {
    const start = word.slice(0, i);

    if (elementMap.hasOwnProperty(start)) {
      const rest = elementify(word.slice(i));
      if (typeof rest !== 'undefined') {
        const capital = elementMap[start];
        return `<span><sup>${elements.indexOf(capital)}</sup>${capital}</span>${rest}`;
      }
    }
  }
}
