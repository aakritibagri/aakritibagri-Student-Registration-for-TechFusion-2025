document.addEventListener("DOMContentLoaded", function () {
    const courseSelect = document.getElementById("course");
    const availableEvents = document.getElementById("available-events");
    const form = document.getElementById("registrationForm");
    const messageContainer = document.createElement("div");
    messageContainer.style.marginTop = "20px";
    messageContainer.style.fontSize = "16px";
    messageContainer.style.color = "green";
    form.appendChild(messageContainer);

    // Fetch XML data
    fetch('data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");

            // Populate Course dropdown
            const courses = xml.getElementsByTagName("course");
            courseSelect.innerHTML = '<option value="">Select Course</option>';
            Array.from(courses).forEach(course => {
                const option = document.createElement("option");
                option.value = course.getAttribute("id");
                option.textContent = course.textContent;
                courseSelect.appendChild(option);
            });

            // Populate Events list with checkboxes
            const events = xml.getElementsByTagName("event");
            Array.from(events).forEach(event => {
                const div = document.createElement("div");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = event.getAttribute("id");
                checkbox.value = event.textContent;
                checkbox.className = "event-checkbox";

                const label = document.createElement("label");
                label.htmlFor = event.getAttribute("id");
                label.textContent = event.textContent;

                div.appendChild(checkbox);
                div.appendChild(label);
                availableEvents.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading XML:", error));

    // Form Validation and Submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const fullName = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const gender = document.getElementById("gender").value;
        const course = document.getElementById("course").value;

        // Clear previous error messages
        const errors = document.querySelectorAll(".error-message");
        errors.forEach(error => error.remove());

        let isValid = true;

        // Validate Full Name
        if (fullName === "") {
            showError("fullname", "Full name is required.");
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(email)) {
            showError("email", "Enter a valid email address.");
            isValid = false;
        }

        // Validate Gender
        if (gender === "") {
            showError("gender", "Please select your gender.");
            isValid = false;
        }

        // Validate Course
        if (course === "") {
            showError("course", "Please select a course.");
            isValid = false;
        }

        // Check if at least one event is selected
        const selectedCheckboxes = document.querySelectorAll(".event-checkbox:checked");
        if (selectedCheckboxes.length === 0) {
            const eventError = document.createElement("small");
            eventError.textContent = "Please select at least one event.";
            eventError.className = "error-message";
            availableEvents.appendChild(eventError);
            isValid = false;
        }

        // If the form is valid, display a success message
        if (isValid) {
            messageContainer.textContent = "Form submitted successfully!";  // Display success message
            messageContainer.style.color = "green";  // Green color for success
            form.reset();  // Reset the form fields
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement("small");
        error.textContent = message;
        error.className = "error-message";
        field.parentNode.appendChild(error);
    }
});
// Function to handle the form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    // Display success message
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = "Registration successful!";
    messageContainer.style.color = 'green';

    // Redirect to the next page after a short delay (2 seconds)
    setTimeout(function() {
        window.location.href = "http://127.0.0.1:5500/Home.html"; // Redirect to the home page
    }, 2000); // 2000 milliseconds (2 seconds)
});