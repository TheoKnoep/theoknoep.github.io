class App {
    constructor() {
        
    }

    async main() {
        let api = new Api('./data/projects.json'); 
        let data = await api.get();
        console.log(data); 

        const dataProjects = data.map(project => new Project(project)); 

        console.log(dataProjects); 
        
        dataProjects.forEach(project => {
            const templateCard = new ProjectExpandedCard(project); 
            templateCard.render(); 
        });
    }
}

const app = new App(); 
app.main(); 