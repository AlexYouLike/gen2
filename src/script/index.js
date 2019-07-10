import _ from 'lodash';
import '../styles/appStyles.scss';
import mixitup from 'mixitup';
import catalog from '../json/catalogData.json';

// TO DO: nothing in the function seems to work
function component() {
    const elem = document.createElement('h1');
    const btn  = document.createElement('button');

    elem.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;

    elem.appendChild(btn);


    return elem;
}
// TO DO: ignore and debug upper function later

var containerEl = document.querySelector('.container');
var mixer = mixitup(containerEl);

console.log(mixitup);
console.log('yooooooo');
console.log(catalog);

document.body.appendChild(component());
