const extensions = {};
let currentExtension = null;
class Extension {
    constructor(config) {
        if (!config.buttonIcon)
            throw new Error("Please provide a button icon");
        this.buttonIcon = new URL(`${location.origin}/libs/imageediter/extensions/${config.buttonIcon}`);
        this.$canvas = document.querySelector("canvas");
        this.ctx = this.$canvas.getContext('2d');
        this.name = config.name;
        this.author = config.author;
        this.profile = config.profile;
        this.$section = document.querySelector("section");
        this.$settings = this.$section;
        config.settings && (this.settings = config.settings);
    }
    getExtensions() {
        return extensions;
    }
    async onload($container) {
        const $button = document.createElement("button");
        $button.innerHTML = `<img src='${this.buttonIcon}'>`;
        $container.appendChild($button);
        $button.addEventListener("click", this.select.bind(this));
        const self = this;
        this.$canvas.addEventListener("click", function (e) {
            self.imageclick(e);
        });
        this.$canvas.addEventListener("mousedown", function (e) {
            self.imagemousedown(e);
        });
        this.$canvas.addEventListener("mousemove", function (e) {
            self.imagemousemove(e);
        });
        this.$canvas.addEventListener("mouseup", function (e) {
            self.imagemouseup(e);
        });
        if (this.settings) {
            fetch(`/imageediter/extensions/${this.settings}`)
                .then((res) => {
                return res.text();
            })
                .then((data) => {
                self.settingsHtml = data;
            });
        }
        extensions[this.name] = this;
    }
    select(e) {
    	if(currentExtension && extensions[currentExtension]) extensions[currentExtension].destroy();
        currentExtension = this.name;
        var profileimg = `<img id='profile' src="${this.profile}">`;
        this.settingsHtml && (this.$settings.innerHTML = this.settingsHtml + "Created by " + this.author + profileimg);
    }
    imageclick(e) {
        console.log(extensions);
        if (this.name !== currentExtension)
            return false;
        return true;
    }
    imagemousedown(e) {
		if (this.name !== currentExtension)
			return false;
		return true;
	}
	
	imagemousemove(e) {
		if (this.name !== currentExtension)
			return false;
		return true;
	}
	
	imagemouseup(e) {
		if (this.name !== currentExtension)
			return false;
		return true;
	}
    destroy() {}
    get scale() {
        return parseInt(document.getElementById("zoomlabel").innerText);
    }
    putImageData(imgData, x, y) {
    	stack.push(imgData);
    	redoStack = [];
    	this.$canvas.width = imgData.width;
		this.$canvas.height = imgData.height;
		this.ctx.putImageData(imgData, 0, 0);
		
		const $container = document.querySelector('#canvasContainer');
		$container.style.width = this.w + 'px';
		$container.style.height = this.h + 'px';
    }
    resizeImage(width, height) {
    	
    }
    appendChild(child){
    	stack.push(child);
    	redoStack = [];
    	this.$canvas.parentElement.appendChild(child);
    }
}
export default Extension;