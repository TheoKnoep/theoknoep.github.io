class Api {
    constructor(src) {
        this._src = src; 
    }

    async get() {
        let res = await fetch(this._src); 
        let data = await res.json(); 

        return data; 
    }
}