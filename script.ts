document.getElementById("resumeForm")!.addEventListener("submit", (event) => {
  event.preventDefault();

  // Capture input data
  const Username = (document.getElementById("Username") as HTMLInputElement).value;
  const resumeData = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    school: (document.getElementById("school") as HTMLInputElement).value,
    degree: (document.getElementById("degree") as HTMLInputElement).value,
    field: (document.getElementById("field") as HTMLInputElement).value,
    graduationYear: (document.getElementById("graduationYear") as HTMLInputElement).value,
    jobTitle: (document.getElementById("jobTitle") as HTMLInputElement).value,
    company: (document.getElementById("company") as HTMLInputElement).value,
    experience: (document.getElementById("experience") as HTMLInputElement).value,
    skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim()),
  };

  // Display the resume data in the output section
  const resumeOutput = document.getElementById("resumeOutput");
  if (resumeOutput) {
    resumeOutput.innerHTML = `
      <h2>${resumeData.name}'s Resume</h2>
      <p><strong>Email:</strong> ${resumeData.email}</p>
      <p><strong>Phone:</strong> ${resumeData.phone}</p>

      <h3>Education</h3>
      <p><strong>School:</strong> ${resumeData.school}</p>
      <p><strong>Degree:</strong> ${resumeData.degree}</p>
      <p><strong>Field of Study:</strong> ${resumeData.field}</p>
      <p><strong>Graduation Year:</strong> ${resumeData.graduationYear}</p>

      <h3>Work Experience</h3>
      <p><strong>Job Title:</strong> ${resumeData.jobTitle}</p>
      <p><strong>Company:</strong> ${resumeData.company}</p>
      <p><strong>Years of Experience:</strong> ${resumeData.experience}</p>

      <h3>Skills</h3>
      <ul>${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    `;
  } else {
    console.error("resumeOutput element not found.");
  }

  // Generate a shareable URL
  const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(Username)}`;
  const shareableLinkContainer = document.getElementById("shareableLinkContainer");
  const shareableLink = document.getElementById("shareableLink") as HTMLAnchorElement;

  // Display the shareable link
  shareableLinkContainer!.style.display = 'block';
  shareableLink.href = shareableURL;
  shareableLink.textContent = shareableURL;

  // Save the data to localStorage
  localStorage.setItem(Username, JSON.stringify(resumeData));
});

// Handle PDF download
document.getElementById("pdfButton")!.addEventListener("click", () => {
  window.print(); // Opens the print dialog to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  if (username) {
    // Autofill form if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);

      (document.getElementById("Username") as HTMLInputElement).value = username;
      (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
      (document.getElementById("school") as HTMLInputElement).value = resumeData.school;
      (document.getElementById("degree") as HTMLInputElement).value = resumeData.degree;
      (document.getElementById("field") as HTMLInputElement).value = resumeData.field;
      (document.getElementById("graduationYear") as HTMLInputElement).value = resumeData.graduationYear;
      (document.getElementById("jobTitle") as HTMLInputElement).value = resumeData.jobTitle;
      (document.getElementById("company") as HTMLInputElement).value = resumeData.company;
      (document.getElementById("experience") as HTMLInputElement).value = resumeData.experience;
      (document.getElementById("skills") as HTMLInputElement).value = resumeData.skills.join(", ");
    }
  }
});
