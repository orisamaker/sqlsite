let db;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the SQLite file asynchronously
        const response = await fetch('database.sqlite'); // Replace with the actual path to your SQLite file
        if (!response.ok) {
            throw new Error(`Failed to fetch database: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();

        // Initialize SQL.js with the fetched SQLite file
        const SQL = await initSqlJs({
            locateFile: filename => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm-debug.wasm' // location of .wasm file
        });

        // Create a new database with the fetched data
        db = new SQL.Database(new Uint8Array(buffer));
        console.log(db);

    } catch (error) {
        console.error('Error fetching or initializing SQLite:', error);
    }
});
/*
const exercises = [
{
description: 'Exercise 1 Description',
expectedQuery: 'SELECT * FROM students',
id: '1',
},
{
description: 'Exercise 2 Description',
expectedQuery: 'SELECT first_name FROM students',
id: '2',
},
{
description: 'Exercise 3 Description',
expectedQuery: 'SELECT count(*) FROM students',
id: '3',
},
// Add more exercises as needed
];
*/




function generateExerciseHTML(exercise) {
// Define a variable to hold the status icon based on the success of the exercise
const statusIcon = exercise.success ? '✅' : (exercise.attempted ? '❌' : ''); // Assuming you have both success and attempted flags

// Define the HTML for the exercise including the status icon container
return `
<div id="${exercise.id}" class="exercise-item" onclick="toggleExercise(${exercise.id})">
    <h3>Exercise ${exercise.id} ${statusIcon}</h3> <!-- Include the status icon here -->
    <p>${exercise.description}</p>
</div>
`;
}
// Function to render exercises
function renderExercises() {
    const exerciseList = document.querySelector('.exercise-list');
//    exerciseList.innerHTML = exercises.map(generateExerciseHTML).join('');
}


let currentExerciseIndex = 0;


// Function to clear the existing table content
function clearTable(i) {
    //const resultTable = document.getElementById("resultTable-");
    const resultTable = document.getElementById("resultTable-"+i);
    resultTable.innerHTML = ''; // Clear the content
}


function updateExerciseStatus(exerciseId, success) {
const exerciseElement = document.getElementById(exerciseId);
if (exerciseElement) {
// Assuming you have some logic here to update the exercise status display, for example:
const statusIcon = success ? '✅' : '❌';
exerciseElement.innerHTML += ` ${statusIcon}`; // Append the status icon to the exercise element
} else {
//console.error('Exercise element not found:', exerciseId);
}
}

// Define executeQuery in the global scope
//  async function executeQuery() {
//const sqlQuery = document.getElementById('sqlQuery').value;

async function executeQuery(i) {

exerciseId = i;

const sqlQuery = document.getElementById('exercise-'+i).value;

//console.log(sqlQuery);

try {
const sqlResult = db.exec(sqlQuery);
const actualValues = sqlResult[0].values;

console.log(sqlResult);

clearTable(i);

        // Create a table body
        const tableBody = document.createElement("tbody");

        // Create a table header row
        const tableHeader = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const columns = sqlResult[0].columns;

        columns.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column;
            headerRow.appendChild(th);
        });
        tableHeader.appendChild(headerRow);

        // Add the header to the table
        const resultTable = document.getElementById("resultTable-"+i);
        resultTable.appendChild(tableHeader);

        // Add the actual values to the table body
        actualValues.forEach(rowData => {
            const tr = document.createElement("tr");
            rowData.forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        // Add the table body to the table
        resultTable.appendChild(tableBody);

// Now check the expected query and compare the results
const exercise = exercises.find(ex => ex.id === exerciseId.toString()); // Dynamically find the exercise based on exerciseId
const expectedResult = await executeExpectedQuery(exercise.expectedQuery);
const differences = deepArrayCompare(actualValues, expectedResult);

//const exercise = exercises[currentExerciseIndex];
//const expectedQuery = exercise.expectedQuery;
//const expectedResult = await executeExpectedQuery(expectedQuery);

//const differences = deepArrayCompare(actualValues, expectedResult);

if (differences.length === 0) {
    exercise.attempted = true;
    exercise.success = true;
    // Call updateExerciseStatus with true if the query execution was successful
    alert(`Success! You've hit the correct query for ${exercise.description}.`);
    //toggleNextExercise(true);
    //clearTable();
    //currentExerciseIndex = currentExerciseIndex + 1;
    // Move to the next exercise
    //currentExerciseIndex++;

    console.log(currentExerciseIndex);

    if (currentExerciseIndex < exercises.length) {
        showExercise();
        //console.log(showExercise());
    } else {
        alert('Congratulations! You have completed all exercises.');
        
    }
    
    //updateExerciseStatus(exercise.id, true);;

} else {
    exercise.attempted = true;
    exercise.success = false;
    alert(`Oops! The result set doesn't match the expected result for ${exercise.description}.`);
    //updateExerciseStatus(exercise.id, false);
}


} catch (error) {
console.error('Error executing query:', error);
document.getElementById('resultTable'+currentExercise).innerText = `Error: ${error.message}`;
}
}

// Function to execute a query and get the result
async function executeExpectedQuery(query) {
return new Promise((resolve, reject) => {
try {
    // Execute the query
    const result = db.exec(query);

    // Extract values from the result
    const values = result[0].values;

    resolve(values);
} catch (error) {
    reject(error);
}
});
}

// Function to recursively compare arrays
function deepArrayCompare(arr1, arr2) {
if (arr1.length !== arr2.length) {
return ['Different number of rows'];
}

let differences = [];

for (let i = 0; i < arr1.length; i++) {
if (arr1[i].length !== arr2[i].length) {
    differences.push(`Different number of columns in row ${i + 1}`);
} else {
    for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
            differences.push(`Mismatch in value at row ${i + 1}, column ${j + 1}`);
        }
    }
}
}

return differences;
}

let currentExercise = 1;


function toggleExercise(exerciseNumber) {
const exerciseItems = document.querySelectorAll('.exercise-item');

exerciseItems.forEach((item, index) => {
if (index + 1 === exerciseNumber) {
    item.classList.add('active');
} else {
    item.classList.remove('active');
}
});
}


function toggleNextExercise(successful) {
if (successful) {
const exerciseItems = document.querySelectorAll('.exercise-item');

if (currentExercise <= exerciseItems.length) {
    
    currentExercise++;

    exerciseItems.forEach((item, index) => {
        item.classList.toggle('active', index + 1 === currentExercise);
    });

    //currentExercise++;

    // Optionally, you can reset the counter when it reaches the last exercise
    // if (currentExercise > exerciseItems.length) {
    //     currentExercise = 1;
    // }
}
}
}





function showExercise() {
const exercise = exercises[currentExerciseIndex];
const exerciseElement = document.getElementById(exercise.id);

console.log(currentExerciseIndex);

if (exerciseElement) {
exercises.forEach((ex) => {
    const exElement = document.getElementById(ex.id);
    if (exElement) {
        exElement.classList.add('hidden');
    }
});

exerciseElement.classList.remove('hidden');
document.getElementById('sqlQuery').value = '';
//clearTable();
} else {
console.error('Exercise element not found:', exercise.id);
}
}


document.addEventListener('DOMContentLoaded', () => {
currentExerciseIndex = 0;
renderExercises();
// Toggle the first exercise as active when the page is loaded
toggleExercise(1);
});
