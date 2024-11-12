// Get the student index from the URL
const urlParams = new URLSearchParams(window.location.search);
const studentIndex = urlParams.get("studentIndex");

// Retrieve student data from localStorage
const students = JSON.parse(localStorage.getItem("newStudent")) || [];
const student = students[studentIndex];

// Check if student data exists
if (student) {
  document.querySelector(
    ".logo"
  ).textContent = `${student.firstName} ${student.lastName}`;
  document.querySelector(
    ".hero-title strong"
  ).textContent = `${student.firstName} ${student.lastName}`;
  document.querySelector(
    ".hero-text"
  ).textContent = `I'm ${student.firstName} from ${student.group}. Feel free to get in touch!`;

  // Update contact information
  const emailLink = document.querySelector(".contact-item-link");
  emailLink.textContent = student.email;
  emailLink.href = `mailto:${student.email}`;

  const phoneLink = document.querySelector(".phone");
  phoneLink.textContent = student.phone;
  phoneLink.href = `tel:${student.phone}`;

  const copyright = document.querySelector(".copyright-link");
  copyright.textContent = ` ${new Date().getFullYear()} ${student.firstName} ${
    student.lastName
  }.`;

  // Set student image
  const heroImg = document.querySelector(".hero-banner img");
  if (heroImg) {
    heroImg.src = student.picture || "./assets/images/default-avatar.png"; // Provide a default image if not available
  }

  // Update about section images
  const aboutBanner = document.getElementsByClassName("about-banner")[0];
  if (aboutBanner) {
    aboutBanner.innerHTML = `
      <img src="${
        student.picture || "./assets/images/default-avatar.png"
      }" width="800" height="652" loading="lazy" alt="Student's Photo" class="img-cover">
      <img src="${
        student.picture || "./assets/images/default-avatar.png"
      }" width="800" height="717" loading="lazy" alt="Student's Photo" class="abs-img">
      <div class="abs-icon abs-icon-1">
        <ion-icon name="logo-css3"></ion-icon>
      </div>
      <div class="abs-icon abs-icon-2">
        <ion-icon name="logo-javascript"></ion-icon>
      </div>
      <div class="abs-icon abs-icon-3">
        <ion-icon name="logo-angular"></ion-icon>
      </div>
    `;
  }

  // Update projects section
  const projectList = document.querySelector(".portfolio-list");
  if (projectList) {
    projectList.innerHTML = "";
    student.projects.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.innerHTML = `
        <div class="portfolio-card" style="background-image: url('${
          project.image
        }')">
                <div class="card-content">

                  <p class="card-subtitle ">${project.title}</p>

                  <h3 class="h3 card-title">${project.descption}</h3>

                  <ul class="skills-list">
                              ${project.skills
                                .map(
                                  (skill) =>
                                    `<li class="skills-item">${skill}</li>`
                                )
                                .join("")}

        
                  </ul>
                    <a class="linkgithub" href="${project.githubLink}">${
        project.githubLink
      }</a>
                        <h3 class="h3 card-title">${project.date}</h3>






                  

                </div>
        </div>
      `;
      projectList.appendChild(projectItem);
    });
  }
}

function populateCVSection() {
  document.getElementById(
    "cv-name"
  ).textContent = `${student.firstName} ${student.lastName}`;
  document.getElementById("cv-email").textContent = student.email;
  document.getElementById("cv-phone").textContent = student.phone;
  document.getElementById(
    "cv-about"
  ).textContent = `I'm ${student.firstName} from ${student.group}. Passionate about web development and continuously learning new skills.`;

  const cvImg = document.querySelector("#cv-photo");
  if (cvImg) {
    cvImg.src = student.picture || "./assets/images/default-avatar.png"; // Provide a default image if not available
  }

  const cvProjectsList = document.getElementById("cv-projects-list");
  cvProjectsList.innerHTML = ""; // Clear any previous projects

  student.projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.innerHTML = `
        <p class="project-title">${project.title}</p>
        <p class="project-description">${project.descption}</p>
        <p><strong>Skills:</strong> ${project.skills.join(", ")}</p>
        <p><strong>Date:</strong> ${project.date}</p>
        <p><a href="${project.githubLink}">${project.githubLink}</a></p>
        
      `;
    cvProjectsList.appendChild(projectItem);
  });
}

function downloadCV() {
  populateCVSection();

  const cvSection = document.getElementById("cv-section");
  cvSection.style.display = "block"; // Show CV section temporarily for PDF capture

  const options = {
    margin: 0.5,
    filename: `${student.firstName}_${student.lastName}_CV.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(options)
    .from(cvSection)
    .save()
    .then(() => {
      cvSection.style.display = "none"; // Hide CV section after saving
    });
}
