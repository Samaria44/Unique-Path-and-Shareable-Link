document.getElementById("resumeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Capture input data
    var Username = document.getElementById("Username").value;
    var resumeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        school: document.getElementById("school").value,
        degree: document.getElementById("degree").value,
        field: document.getElementById("field").value,
        graduationYear: document.getElementById("graduationYear").value,
        jobTitle: document.getElementById("jobTitle").value,
        company: document.getElementById("company").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); }),
    };
    // Display the resume data in the output section
    var resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n      <h2>".concat(resumeData.name, "'s Resume</h2>\n      <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n      <p><strong>Phone:</strong> ").concat(resumeData.phone, "</p>\n\n      <h3>Education</h3>\n      <p><strong>School:</strong> ").concat(resumeData.school, "</p>\n      <p><strong>Degree:</strong> ").concat(resumeData.degree, "</p>\n      <p><strong>Field of Study:</strong> ").concat(resumeData.field, "</p>\n      <p><strong>Graduation Year:</strong> ").concat(resumeData.graduationYear, "</p>\n\n      <h3>Work Experience</h3>\n      <p><strong>Job Title:</strong> ").concat(resumeData.jobTitle, "</p>\n      <p><strong>Company:</strong> ").concat(resumeData.company, "</p>\n      <p><strong>Years of Experience:</strong> ").concat(resumeData.experience, "</p>\n\n      <h3>Skills</h3>\n      <ul>").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n    ");
    }
    else {
        console.error("resumeOutput element not found.");
    }
    // Generate a shareable URL
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(Username));
    var shareableLinkContainer = document.getElementById("shareableLinkContainer");
    var shareableLink = document.getElementById("shareableLink");
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
    // Save the data to localStorage
    localStorage.setItem(Username, JSON.stringify(resumeData));
});
// Handle PDF download
document.getElementById("pdfButton").addEventListener("click", function () {
    window.print(); // Opens the print dialog to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("Username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("school").value = resumeData.school;
            document.getElementById("degree").value = resumeData.degree;
            document.getElementById("field").value = resumeData.field;
            document.getElementById("graduationYear").value = resumeData.graduationYear;
            document.getElementById("jobTitle").value = resumeData.jobTitle;
            document.getElementById("company").value = resumeData.company;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills.join(", ");
        }
    }
});
