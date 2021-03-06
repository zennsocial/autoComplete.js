let resultsList;

// Gets the user's input value
const getInput = selector => (typeof selector === "string" ? document.querySelector(selector) : selector());

// Creats the results list HTML tag
const createResultsList = renderResults => {
	resultsList = document.createElement("ul");
	resultsList.setAttribute("id", "autoComplete_results_list");
	renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
};

// Hightlight matching values
const highlight = value => `<span class="autoComplete_highlighted">${value}</span>`;

// Adding matching results to the list
const addResultsToList = (dataSrc, dataKey) => {
	dataSrc.forEach((event, record) => {
		const result = document.createElement("li");
		const resultValue = dataSrc[record].source[dataKey] || dataSrc[record].source;
		result.setAttribute("autoComplete-data", resultValue);
		result.setAttribute("class", "autoComplete_result");
		result.innerHTML = dataSrc[record].match || dataSrc[record];
		resultsList.appendChild(result);
	});
};

// Clears the list of results
const clearResults = () => (resultsList.innerHTML = "");

// Gets user selection
const getSelection = (field, callback, resultsValues, dataKey) => {
	const results = resultsList.querySelectorAll(".autoComplete_result");
	results.forEach(selection => {
		selection.addEventListener("mousedown", event => {
			// Callback function invoked on user selection
			callback({
				query: getInput(field).value,
				results: resultsValues.map(record => record.source),
				selection: resultsValues.find(value => {
					const resValue = value.source[dataKey] || value.source;
					return resValue === event.target.closest(".autoComplete_result")
						.getAttribute("autoComplete-data");
				}).source
			});
			// Clear Results after selection is made
			clearResults();
		});
	});
};

export const autoCompleteView = {
	getInput,
	createResultsList,
	highlight,
	addResultsToList,
	getSelection,
	clearResults
};