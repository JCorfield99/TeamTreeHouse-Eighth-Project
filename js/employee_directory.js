const employeeDirectory = document.getElementById('employees');

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('There was a problem: ', error))
}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => createUserCard(data.results));

function createUserCard(employees) {
    employees.forEach(employee => {
        employeeDirectory.innerHTML += `
            <div class="employee_card">
                <img src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
                <h2>${employee.name.first} ${employee.name.last}</h2>
                <p>${employee.email}</p>
                <p>${employee.location.city}</p>
            </div>
        `;
    });
}