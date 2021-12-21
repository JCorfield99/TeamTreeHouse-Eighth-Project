const employeeDirectory = document.getElementById('employees');
const url = "https://randomuser.me/api/?results=12";

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

fetchData(url)
    .then(data => {
        const employeeData = data.results;
        createUserCard(employeeData);
    });

function createUserCard(employees) {
    employees.forEach(employee => {
        employeeDirectory.innerHTML += `
            <div class="employee">
                <div class="employee-card">
                    <img src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
                    <div class="card-information">
                        <h2>${employee.name.first} ${employee.name.last}</h2>
                        <p>${employee.email}</p>
                        <p>${employee.location.city}</p>
                    </div>
                </div>
                <div class="employee-modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
                        <h2>${employee.name.first} ${employee.name.last}</h2>
                        <p>${employee.email}</p>
                        <p>${employee.location.city}</p>
                        <p>${employee.cell}</p>
                        <p>${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p>Birthday: ${employee.dob.date}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

employeeDirectory.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".employee-card");
    const cardModal = clickedCard.nextElementSibling;
    cardModal.style.display = "block";
});