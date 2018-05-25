import {data} from './data/utils';
import './list.css';

// 懒加载
function loadable(name, url) {

}

export const list = () => {
    const {menu} = data();
    const oUl = document.createElement('ul');

    menu.map((item) => {
        let oLi = document.createElement('li');

        oLi.setAttribute('class', 'menu-li');
        oLi.innerHTML = item.name;

        oUl.setAttribute('class', 'menu-ul');
        oUl.appendChild(oLi);

        oLi.onclick = e => import(/* webpackChunkName: "asd" */ './main/' + item.url).then(module => {
            var content = module.default;
            content();
        });
    });

    return oUl;
};