// Function to display appointments from local storage
function displayAppointments() {
    // Retrieve appointments from local storage, or initialize as an empty array
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let tableBody = document.getElementById('appointments-list');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Loop through each appointment and create a table row
    appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.studentName}</td>
            <td>${appointment.teacherName}</td>
            <td>${appointment.appointmentDate}</td>
            <td>${appointment.appointmentTime}</td>
            <td>${appointment.status}</td>
            <td>
                <button onclick="approveAppointment(${index})">Approve</button>
                <button onclick="deleteAppointment(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row); // Add the row to the table body
    });
}

// Function to approve an appointment
function approveAppointment(index) {
    // Retrieve current appointments from local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    // Update the status of the specified appointment to "Approved"
    appointments[index].status = 'Approved';
    // Save the updated appointments back to local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));
    // Refresh the displayed appointments
    displayAppointments();
}

// Function to delete an appointment
function deleteAppointment(index) {
    // Retrieve current appointments from local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    // Remove the specified appointment from the array
    appointments.splice(index, 1);
    // Save the updated appointments back to local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));
    // Refresh the displayed appointments
    displayAppointments();
}

// Call the displayAppointments function when the script loads to show current appointments
displayAppointments();
