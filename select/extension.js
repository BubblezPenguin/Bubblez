import Extension from "../extension.js";
const config = {
    author: "Tong Miao",
    email: "tonymiaotong@tioft.tech",
    domain: "tongmiao.cloud",
    name: "select",
    description: "This extension will provide a selection of the image as a array of indices for the R value of the image data",
    version: "0.0.1",
    buttonIcon: "select/buttonicon.svg",
};
class SelectExtension extends Extension {
    async onload(container) {
        await super.onload(container);
    }
    select(e) {
        super.select(e);
        console.log("select");
    }
    imageclick(e) {
        if (!super.imageclick) {
            return false;
        }
        console.log(super.getExtensions());
        return true;
    }
}
export default new SelectExtension(config);
