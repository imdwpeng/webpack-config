import {list} from './list';
import './main.css';

function main() {
    const element = document.createElement('div'),
        oMenu = document.createElement('aside'),
        oMain = document.createElement('main');

    oMenu.setAttribute('class', 'menu-box');
    oMain.setAttribute('class', 'main-box');
    oMain.id = 'main';

    oMenu.appendChild(list());

    element.appendChild(oMenu);
    element.appendChild(oMain);

    return element;
}

document.body.appendChild(main());