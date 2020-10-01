import Extension from '../extension.js';

const config = {
	author: "Shengkai Jiang"
	, email: "shengkai555@gmail.com"
	, domain: "shengkai.qoom.io"
	, name: "blur"
	, description: "blur an image"
	, version: "0.0.1"
	, buttonIcon:'blur/buttonicon.svg'
	, settings:'blur/settings.html'
	, profile:'https://shengkai.qoom.io/imageediter/extensions/shapes/penguin.gif'
};

const radius = 5;
const sigma = radius/3;

function G(x,y){
	const c = 1/(2*Math.PI*sigma**2),
	ex = -1*(x**2 + y**2)/(2*sigma**2),
	e = Math.exp(ex);
	return c*e
}

class blurExtension extends Extension {

	
	imageclick(e) {
		if(!super.imageclick(e)) return;
		// this.$canvas.style.filter = 'blur(20px)';
		const ctx = this.$canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
        const newImageData = new ImageData(imageData.width, imageData.height);
        const width = imageData.width;
        const start = performance.now();
        const blur = [];
        let sum = 0;
        for(var row = -radius; row <= radius; row += 1) {
        	var Row = [];
	        for(var cell = -radius; cell <= radius; cell += 1) {
	        	var gv = G(cell, row);
	        	sum += gv;
	        	Row.push(gv);
	        }
	        blur.push(Row);
        }
        console.log(blur);
        
        const w = blur
        const rw = blur
        const gw = blur
        const bw = blur
        // const count = (2*radius + 1)**2;
        const count = sum;
        const rcount = count;
        const gcount = count;
        const bcount = count;
        for(let i = 0; i < imageData.data.length; i += 4) {
        	var red = 0;
        	var green = 0;
        	var blue = 0;
        	var alpha = 0;
        	
        	var r = (width*radius + radius)*4;
        	if(i < r) {
        		alpha = 0;
        	} else if(i >= imageData.data.length - r) {
        		alpha = 0;
        	} else {
        	
	        	for(var row = -radius; row <= radius; row += 1) {
	        		for(var cell = -radius; cell <= radius; cell += 1) {
	        			
	        			const j4 = (row*width + cell)*4;
	        			const dx = cell + radius;
	        			const dy = row + radius;
	        			red += rw[dx][dy]*imageData.data[i + j4];
	        			green += gw[dx][dy]*imageData.data[i + j4 + 1];
	        			blue += bw[dx][dy]*imageData.data[i + j4 + 2];
	        			alpha += w[dx][dy]*imageData.data[i + j4 + 3];
	        		}
	        	}
        		
        		red /= rcount;
        		green /= gcount;
        		blue /= bcount;
        		alpha /= count;
        	}
        	newImageData.data[i] = parseInt(red);
        	newImageData.data[i + 1] = parseInt(green);
        	newImageData.data[i + 2] = parseInt(blue);
        	newImageData.data[i + 3] = imageData.data[i+3];
        	
        	// imageData.data[i] = Math.round(255 - imageData.data[i]);
        }
        const end = performance.now();
        console.log((end - start)/1000);
        console.log(imageData.data.length);
        
        this.putImageData(newImageData, 0, 0);
	}
	
	select(e) {
		super.select(e);
		
	}
	
}

const blur = new blurExtension(config);

export default blur;