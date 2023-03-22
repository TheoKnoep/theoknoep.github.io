class Card {
    constructor(project) {
        this._data = project; 
        this.$wrapper = document.querySelector('#app-container'); 
    }

    get data() {
        return this._data; 
    } 

}


class ProjectExpandedCard extends Card {
    constructor(project) {
        super()
    }

    render() {
        const html = `<article class="project-card" data-context="${this.data.context}" data-year="${this.data.year}" data-skills="${this.data.skills.join(', ')}" data-techno="HTML/CSS,PHP" id="">
                        <h3>${this.data.name}</h3>
                        <div class="project-container">
                            <div class="screenshot-container">
                            ${ this.renderImages() }
                            </div>
                        <div class="description-container">
                            <div class="tags-container">
                                <li>HTML/CSS</li>
                                <li>PHP</li>
                            </div>
                        ${ this.data.description }
                    </article>`; 
        this.$wrapper.insertAdjacentHTML('beforeend', html);  
    }

    renderImages() {
        let listOfImages = ''; 
        this.data.gallery.forEach(img => {
            listOfImages += `<img width="300" src="${img.src}" alt="${img.alt}">`
        }); 
        return listOfImages; 
    }
}



class ProjectSmallCard {
    constructor(project) {
        this._data = project; 
        this.$wrapper = document.querySelector('#app-container'); 
    }

    get data() {
        return this._data; 
    }

    render() {
        html = `<p>${this.data.name }`; 
    }
}