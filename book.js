// Event listener for form submission
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const studentName = document.getElementById('student-name').value; // Get the student's name from the input
    const teacherName = document.getElementById('teacher-name').value; // Get the teacher's name from the input
    const appointmentDate = document.getElementById('appointment-date').value; // Get the appointment date from the input
    const appointmentTime = document.getElementById('appointment-time').value; // Get the appointment time from the input

    // Create an appointment object to hold the appointment details
    const appointment = {
        studentName,
        teacherName,
        appointmentDate,
        appointmentTime
    };

    // Save appointment to local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || []; // Retrieve existing appointments or initialize an empty array
    appointments.push(appointment); // Add the new appointment to the array
    localStorage.setItem('appointments', JSON.stringify(appointments)); // Save the updated appointments array back to local storage

    // Reset the form fields for the next entry
    document.getElementById('appointment-form').reset();
    alert('Appointment booked successfully!'); // Show success message
});

// Function to book appointment to Firestore (this part may need to be called at a different event)
document.getElementById('book-appointment-button').addEventListener('click', async () => {
    const email = document.getElementById('appointment-email').value; // Get the user's email
    const date = document.getElementById('appointment-date').value; // Get the appointment date
    const time = document.getElementById('appointment-time').value; // Get the appointment time
    const teacherName = document.getElementById('teacher-name').value; // Get the teacher's name
    const studentName = document.getElementById('student-name').value; // Get the student's name

    try {
        // Add appointment to Firestore database
        await db.collection('appointments').add({
            email: email,
            appointmentDate: date,
            appointmentTime: time,
            teacherName: teacherName,
            studentName: studentName,
            status: 'Pending' // Initialize status of the appointment
        });

        // Display success message
        document.getElementById('booking-message').innerText = 'Appointment booked successfully!';
    } catch (error) {
        console.error('Error booking appointment:', error); // Log the error to the console
        // Display error message to the user
        document.getElementById('booking-message').innerText = `Error: ${error.message}`;
    }
});

// Function to send an email notification
function sendEmail() {
    const userEmail = document.getElementById('emailInput').value; // Get the user's email from the input

    // Send userEmail to backend for processing (using fetch or AJAX)
    fetch('/send-email', {
        method: 'POST', // Specify the request method
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ email: userEmail }), // Send the email as JSON
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        alert(data.message); // Display success/failure message from server response
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors to the console
    });
}
