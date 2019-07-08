import _ from 'lodash';
import './styles/appStyles.scss';

function component() {
    const elem = document.createElement('h1');
    const btn  = document.createElement('button');

    elem.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;

    elem.appendChild(btn);

    return elem;
}

document.body.appendChild(component());
