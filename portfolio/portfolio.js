
// console.log(parseProjects()); 


window.addEventListener('DOMContentLoaded', () => {
	displayProjects(); 
	displayCalendarIcon(); 
	displayFilters(); 
})

/**
 * Read all the projects meta and return a de-duplicated list of values
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

/**
 * Create the DOM structure for displaying the Projects on the page
 */ 
function displayProjects() {
	for (let i in Projects) {
		let image = Projects[i].gallery[0].src ? `<img width="300" src="${Projects[i].gallery[0].src}" alt="${Projects[i].gallery[0].alt}"/>` : ''; 
		
		let tagsTechno = ""; 
		// console.log(Projects[i].techno); 
		for (let ii in Projects[i].techno) {
			tagsTechno += `<li>${Projects[i].techno[ii]}</li>`; 
		}

		let template = `
					<article class="project-card" data-context="${Projects[i].context}" data-year="${Projects[i].year}" data-skills="${Projects[i].skills}" data-techno="${Projects[i].techno}" id="project-${i}">
						<h3>${Projects[i].name}</h3>
						<div class="project-container">
							<div class="screenshot-container">
								${image}
							</div>
							<div class="description-container">
								<div class="tags-container">
									${tagsTechno}
								</div>
								${Projects[i].description}
							</div>
						</div>
					</article>`; 

		document.querySelector('#projects-container').insertAdjacentHTML('beforeend', template); 
	}
}


/**
 * Create the DOM elements of the filter 
 */
const displayFilters = function() {
	let data = parseProjects(); 

	const listOfSelects = ["skills", "techno", "contexts", "years"]; 
	let filtersBody = ""; 

	listOfSelects.forEach(item => {
		filtersBody += createDOMfilter(item, data[item]); 
	})
	document.querySelector('#filters-container').innerHTML = '<form id="filters-form">' + filtersBody + '</form>'; 
}

const createDOMfilter = function(name, data) {
	const readAbleName = {
		"years": "Année", 
		"contexts": "Contexte", 
		"skills": "Compétence mobilisée", 
		"techno": "Technologie utilisée"
	}
	let selectYearOptions = '<option value="">--</option>'; 
	data.forEach(item => {
		let newInsert = `<option value="${item}">${item}</option>`; 
		selectYearOptions += newInsert; 
	})
	return selectYear = `<div class="select-group">
		<label for="${name}-select">${readAbleName[name]}</label>
		<select name="${name}" id="${name}-select">
			${selectYearOptions}
		</select>
	</div>`; 
}



const getSelectedFilters = function() {
	let stuff = document.querySelectorAll('#filters-form select');
	console.log(stuff); 
	let output = []; 
	stuff.forEach(item => {
		// console.log("name : ", item.name); 
		// console.log("value : ", item.value); 
		let name = item.name; 
		let value = item.value; 
		output.push( {name, value} ); 
	})
	return output; 
}


const filter = {
	"year": "2021", 
	"skills": "", 
	"techno": "",
	"context": "France-Sélection"
}
function filterProjects(filter) {
	return Projects.filter(project => {
		if (project.year === filter.year) {
			return true; 
		}
		return false; 
	})
}

console.log("projets de 2021 : ", filterProjects(filter)); 

const calendarIconSVG = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`; 
const displayCalendarIcon = function() {
	let stuff = Array.from(document.querySelectorAll(".description-container__date")); 
	stuff.forEach(node => {
		node.innerHTML = calendarIconSVG + '&nbsp;' + node.textContent; 

	})
	return 'done'; 
}; 