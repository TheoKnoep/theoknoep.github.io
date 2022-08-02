
console.log(parseProjects()); 
displayProjects(); 

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
		if (typeof Projects[i].techno === 'string') {
			arrayOfTechnos.push(Projects[i].techno); 
		} else if (typeof Projects[i].techno === 'object') {
			for (let ii in Projects[i].techno) {
				arrayOfTechnos.push(Projects[i].techno[ii])
			}
		}
	}
	for (let i in Projects) {
		// arrayOfSkills.push(Projects[i].skills); 
		if (typeof Projects[i].skills === 'string') {
			arrayOfSkills.push(Projects[i].skills); 
		} else if (typeof Projects[i].skills === 'object') {
			for (let ii in Projects[i].skills) {
				arrayOfSkills.push(Projects[i].skills[ii])
			}
		}
	}
	for (let i in Projects) {
		arrayOfContexts.push(Projects[i].context); 
	}

	// count items in each categories :
	let nbOfContexts = arrayOfContexts.length; 

	// remove duplicated entries :
	arrayOfContexts = [... new Set(arrayOfContexts)]; 
	arrayOfYears = [...new Set(arrayOfYears)]; 
	arrayOfTechnos = [...new Set(arrayOfTechnos)];
	arrayOfSkills = [... new Set(arrayOfSkills)]; 

	// remove empty entries :
	arrayOfYears = removeEmptyStrings(arrayOfYears); 
	arrayOfContexts = removeEmptyStrings(arrayOfContexts); 
	arrayOfTechnos = removeEmptyStrings(arrayOfTechnos); 
	arrayOfSkills = removeEmptyStrings(arrayOfSkills); 

	// sort entries by alphabetical order : . . .

	// . . .  
	return {
		years: arrayOfYears, 
		techno: arrayOfTechnos,
		skills: arrayOfSkills,
		contexts: arrayOfContexts
	}
}


function removeEmptyStrings(array) {
	let output = []; 
	for (let i in array) {
		if (array[i] !== "") {
			output.push(array[i]); 
		}
	}
	return output; 
}

// displayProjects(); 
function displayProjects() {
	for (let i in Projects) {
		let image = Projects[i].gallery[0].src ? `<img width="300" src="${Projects[i].gallery[0].src}" alt="${Projects[i].gallery[0].alt}"/>` : ''; 
		
		let tagsTechno = ""; 
		console.log(Projects[i].techno); 
		for (let ii in Projects[i].techno) {
			tagsTechno += `<li>${Projects[i].techno[ii]}</li>`; 
		}


		let template = `<article class="project-card">
			<h2>${Projects[i].name}</h2>
			<div class="label label-year description-container__date">● ${Projects[i].year}</div>
			${image}
			<ul class="tags-techno">
				${tagsTechno}
			</ul>

		</article>`; 

		document.querySelector('#projects-container').insertAdjacentHTML('beforeend', template); 
	}
}