import {data} from "./data/utils";
import './index.scss';

function component() {
    const {title, subtitle, author} = data(),
        element = document.createElement('div'),
        oTitle = document.createElement('h2'),
        oSub = document.createElement('p'),
        oAuthor = document.createElement('p');

    oTitle.innerHTML = title;

    oSub.innerHTML = subtitle;
    oSub.setAttribute('class', 'container__subtitle');

    oAuthor.innerHTML = _.join(['作者：', author], '');
    oAuthor.setAttribute('class', 'container__author');

    element.setAttribute('class', 'container');

    element.appendChild(oTitle);
    element.appendChild(oAuthor);
    element.appendChild(oSub);

    return element;
}

document.body.appendChild(component());


