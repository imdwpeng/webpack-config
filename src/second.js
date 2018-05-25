import getName from './name.js';
import './index.scss';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join([getName(), 'This is second bundle'], ': ');
    return element;
}

var element = component();
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./name.js', function () {
        console.log('getName模块更新');
        document.body.removeChild(element);

        element = component();
        document.body.appendChild(element);
    })
}

