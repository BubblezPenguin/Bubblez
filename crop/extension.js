import Extension from '../extension.js';

const config = {
	author: "Shengkai Jiang"
	, email: "none"
	, domain: "shengkai.qoom.io"
	, name: "crop"
	, description: "Crop Image"
	, version: "0.0.1"
	, buttonIcon:'crop/buttonicon.svg'
	, settings:'crop/settings.html'
	, profile:'https://shengkai.qoom.io/imageediter/extensions/crop/penguin.gif'
};
let $div;
let ismousedown = false;
let startpos = {}

class cropExtension extends Extension {
	
	destroy() {
		if($div) $div.parentElement.removeChild($div);
		$div = undefined;
	}
	
	imagemousedown(e) {
		if(!super.imagemousedown(e)) return;
		ismousedown = true;
		if($div) $div.parentElement.removeChild($div);
		
		$div = document.createElement('div');
		$div.id = 'cropdiv';
		$div.style.width = '2px';
		$div.style.height = '2px';
		$div.style.border = 'solid 1px red';
		
		const canvasposition = this.$canvas.getBoundingClientRect()
		$div.style.position = 'absolute';
		$div.style.top = (e.clientY - canvasposition.top) + 'px';
		$div.style.left = (e.clientX - canvasposition.left) + 'px';
		startpos.x = (e.clientX - canvasposition.left)
		startpos.y = (e.clientY - canvasposition.top)
		startpos.offsetx = canvasposition.left;
		startpos.offsety = canvasposition.top;
		
		var self = this;
		$div.addEventListener('mouseup', function(e) {
			self.imagemouseup(e);
		})
		$div.addEventListener('mousedown', function(e) {
			self.imagemousedown(e);
		})
		$div.addEventListener('mousemove', function(e) {
			self.imagemousemove(e);
		})
		
		this.$canvas.parentElement.appendChild($div);
	}
	
	imagemousemove(e) {
		if(!super.imagemousemove(e)) return;
		if(!ismousedown) return;
		if(!$div) return;
		
		let x = (e.clientX - startpos.offsetx);
		let y = (e.clientY - startpos.offsety);
		let w = x - startpos.x;
		let h = y - startpos.y;
		
		$div.style.width = w  + 'px';
		$div.style.height = h + 'px';
		
		this.x = startpos.x;
		this.y = startpos.y;
		this.w = w;
		this.h = h;
	}
	
	imagemouseup(e) {
		if(!super.imagemouseup(e)) return;
		ismousedown = false;
		if(!$div) return;
		
	}
	
	imageclick(e) {
		if(!super.imageclick(e)) return;
	}
	
	select(e) {
		super.select(e);
		const cropButton = document.querySelector('#cropControls');
		const self = this;
		cropButton.addEventListener("click", function() {
			doCrop.call(self);
		});
	}
	
}

function doCrop() {
	const croppedImage = this.ctx.getImageData(this.x,this.y,this.w,this.h);
	this.putImageData(croppedImage, 0, 0);
	this.destroy();
}

const crop = new cropExtension(config);

export default crop;