
console.log(parseProjects()); 

/**
 * read all the projects meta and return a de-duplicated list of values
 */
function parseProjects() {
	let arrayOfYears = []; 
	let arrayOfTechnos = []; 
	let arrayOfSkills = []; 
	let arrayOfContexts = []; 

	for (let i in Projects) {
		arrayOfYears.push(Projects[i].year); 
	}
	for (let i in Projects) {
		arrayOfTechnos.push(Projects[i].techno); 
	}
	for (let i in Projects) {
		arrayOfSkills.push(Projects[i].skills); 
	}
	for (let i in Projects) {
		arrayOfContexts.push(Projects[i].context); 
	}

	// . . .  
	return {
		years: arrayOfYears, 
		techno: arrayOfTechnos,
		skills: arrayOfSkills,
		contexts: arrayOfContexts
	}
}