import _ from 'lodash';
import './style.less';
import img_photo from './photo.jpg';
import DATA from './data.json';
import printMe from './print.js';	


function component() {
	var frag = document.createDocumentFragment();

	var div = createEle('div');
	div.classList.add('hello');

	var span = createEle('span');
	span.innerHTML = _.join(['hello', 'webpack'], ' ');
	
	var img = new Image();
	img.src = img_photo;
	img.width = 200;
	img.style.border = '1px solid red';

	var btn = createEle('button');
	btn.innerText = 'click me';
	btn.style.color = 'blue';
	btn.onclick = printMe;


	div.appendChild(span);
	div.appendChild(img);
	div.appendChild(btn);
	frag.appendChild(div);

	console.table(DATA);
	return frag;
}

function createEle(tag) {
	return document.createElement(tag);
}

let frag = component();
document.body.appendChild(frag);

if(module.hot) {
	module.hot.accept('./print.js', function() {
		console.log('Accepting the updated printMe module!');
		document.body.removeChild(frag);
		frag = component();
		document.body.appendChild(frag);
	})
}

if(process.env.NODE_ENV !== 'production') {
	console.log('Not production');
}