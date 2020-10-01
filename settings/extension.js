import Extension from '../extension.js';

const config = {
	author: "Jenny Liu"
	, email: "yajingjenny@gmail.com"
	, domain: "jenny.qoom.io"
	, name: "Settings"
	, description: "This extension will allow a user to get info about the image"
	, version: "0.0.1"
	, buttonIcon:'settings/buttonicon.svg'
	, settings:'settings/settings.html'
};

function undo(){
	alert('undo')
}
function redo(){
	alert('redo')
}
class settingsExtension extends Extension {

	
	imageclick(e) {
		if(!super.imageclick(e)) return;
	}
	
	destroy() {
		super.destroy();
		window.removeEventlistener('undo', undo)
		window.removeEventListener('redo', redo)
	}
	
	select(e) {
		super.select(e);
		document.getElementById('heightInput').value = image.height;
		document.getElementById('widthInput').value = image.width;
		window.addEventListener('undo', undo)
		window.addEventListener('redo', redo)
	}
	
}

function makeCopy (){
	
}
	


const settings = new settingsExtension(config);

export default settings;