

function getDoveInstance(name) {
    if(!this.instance) {
        this.instance = new Dove();
    }
    return this.instance;
}


function Dove() {
    this.instance = null;
};



// inject windiw instance
window._dove_ = getDoveInstance();