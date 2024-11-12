class Student {
  constructor(firstName, lastName, email, phone, group, picture) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.group = group;
    this.picture = picture;
    this.projects = [];
  }
}

class Projet {
  constructor(title, githubLink, skills, date, image) {
    this.title = title;
    this.githubLink = githubLink;
    this.skills = skills;
    this.date = date;
    this.image = image;
  }
}

let students = [];
/////////////////////////////////  Student Form  /////////////////////////////////////////////

let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let group = document.getElementById("group");
let studentForm = document.getElementById("student-form");
let picture = document.getElementById("picture");
let inputs = document.querySelectorAll("input, select");

function validInputs() {
  let valid = true;
  // First name validation
  if (
    firstName.value.trim() === "" ||
    !/^[a-zA-Z ]+$/.test(firstName.value.trim())
  ) {
    firstName.style.borderColor = "red";
    document.getElementById("fnameError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please enter valid full name.';
    valid = false;
  } else {
    firstName.style.borderColor = "greenyellow";

    document.getElementById("fnameError").textContent = "";
  }
  //Last name validation

  if (
    lastName.value.trim() === "" ||
    !/^[a-zA-Z ]+$/.test(lastName.value.trim())
  ) {
    lastName.style.borderColor = "red";
    document.getElementById("lnameError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please enter valid last name.';
    valid = false;
  } else {
    lastName.style.borderColor = "greenyellow";

    document.getElementById("lnameError").textContent = "";
  }

  // phone validation
  if (
    phoneNumber.value.trim() === "" ||
    !/^\+212\d{3}-\d{2}-\d{2}-\d{2}$/.test(phoneNumber.value.trim())
  ) {
    phoneNumber.style.borderColor = "red";

    document.getElementById("phoneError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i>Please enter a valid phone number.<br> example:+212XXX-XX-XX-XX';
    valid = false;
  } else {
    phoneNumber.style.borderColor = "greenyellow";

    document.getElementById("phoneError").textContent = "";
  }
  // Email Validation
  if (
    email.value.trim() === "" ||
    !/^[a-zA-Z]+\.[a-zA-Z]+\.solicode@gmail\.com$/.test(email.value)
  ) {
    email.style.borderColor = "red";

    document.getElementById("emailError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please Enter a valid email.';
    valid = false;
  } else {
    email.style.borderColor = "greenyellow";

    document.getElementById("emailError").textContent = "";
  }

  // Group validation
  if (group.value === "") {
    group.style.borderColor = "red";

    document.getElementById("groupError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please select a group.';
    valid = false;
  } else {
    group.style.borderColor = "greenyellow";

    document.getElementById("groupError").textContent = "";
  }
  return valid;
}

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => console.error("Error: ", error);
}

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validInputs()) {
    getBase64(picture.files[0], (pictureBase64) => {
      const newStudent = new Student(
        firstName.value,
        lastName.value,
        email.value,
        phoneNumber.value,
        group.value,
        pictureBase64
      );
      students = JSON.parse(localStorage.getItem("newStudent")) || [];
      students.push(newStudent);
      localStorage.setItem("newStudent", JSON.stringify(students));
      studentForm.reset();
      inputs.forEach((input) => {
        input.style.borderColor = "";
      });
      const popup = document.querySelector(".popup");
      popup.style.display = "block";
    });
  }
});

/////////////////////////////////  Project Form  /////////////////////////////////////////////

const projectTitle = document.getElementById("projectTitle");
const description = document.getElementById("description");
const lienGithub = document.getElementById("lienGithub");
const skills = document.querySelectorAll('input[type="checkbox"]:checked');
const dateProject = document.getElementById("dateProject");
const projectImage = document.getElementById("projectImage");

function getSelectedSkills() {
  const checkboxes = document.querySelectorAll('input[name="skills"]:checked');
  const selectedSkills = [];

  for (let i = 0; i < checkboxes.length; i++) {
    selectedSkills.push(checkboxes[i].value);
  }

  return selectedSkills;
}

function validProjectInputs() {
  let valid = true;

  // Project Title Validation
  if (projectTitle.value.trim() === "") {
    projectTitle.style.borderColor = "red";
    document.getElementById("projectTitleError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Project title is required.';
    valid = false;
  } else {
    projectTitle.style.borderColor = "greenyellow";
    document.getElementById("projectTitleError").textContent = "";
  }

  // Description Validation
  if (description.value.trim() === "") {
    description.style.borderColor = "red";
    document.getElementById("descriptionError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Description is required.';
    valid = false;
  } else {
    description.style.borderColor = "greenyellow";
    document.getElementById("descriptionError").textContent = "";
  }

  // GitHub Link Validation
  const githubPattern =
    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/;
  if (!githubPattern.test(lienGithub.value.trim())) {
    lienGithub.style.borderColor = "red";
    document.getElementById("lienGithubError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please enter a valid GitHub link.';
    valid = false;
  } else {
    lienGithub.style.borderColor = "greenyellow";
    document.getElementById("lienGithubError").textContent = "";
  }

  // Skills Validation (at least one checkbox should be selected)
  const skills = getSelectedSkills();

  if (skills.length === 0) {
    document.getElementById("skillsError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please select at least one skill.';
    valid = false;
  } else {
    document.getElementById("skillsError").textContent = "";
  }

  // Date Validation (ensure date is in the past)
  const projectDate = dateProject.value;
  const currentDate = new Date();

  if (dateProject.value === "") {
    dateProject.style.borderColor = "red";
    document.getElementById("dateProjectError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Please select a valid date.';
    valid = false;
  } else if (projectDate > currentDate) {
    dateProject.style.borderColor = "red";
    document.getElementById("dateProjectError").innerHTML =
      '<i class="bi bi-exclamation-circle"></i> Project date cannot be in the future.';
    valid = false;
  } else {
    dateProject.style.borderColor = "greenyellow";
    document.getElementById("dateProjectError").textContent = "";
  }

  return valid;
}

const projectForm = document.getElementById("projectForm");

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validProjectInputs()) {
    getBase64(projectImage.files[0], (projectImageBase64) => {
      const students = JSON.parse(localStorage.getItem("newStudent"));
      const project = new Projet(
        projectTitle.value,
        lienGithub.value,
        getSelectedSkills(),
        dateProject.value,
        projectImageBase64
      );
      students[students.length - 1].projects.push(project);
      localStorage.setItem("newStudent", JSON.stringify(students));
      document.getElementById("createP").style.display = "block";
      projectForm.reset();
      inputs.forEach((input) => {
        input.style.borderColor = "";
      });
      displayProjects();
    });
  }
});

function displayProjects() {
  const students = JSON.parse(localStorage.getItem("newStudent"));
  const studentProjects = students[students.length - 1].projects;
  const projectList = document.getElementById("projectAdded");
  projectList.innerHTML = "";
  studentProjects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-item";
    projectCard.innerHTML = `
      <img src="${project.image}" alt="Project Image" style="width:100px;height:auto;">
      <p>${project.title}</p>
    `;
    projectList.appendChild(projectCard);
  });
}

let createPortfolioBtn = document.getElementById("createP");

createPortfolioBtn.addEventListener("click", () => {
  const students = JSON.parse(localStorage.getItem("newStudent"));
  const studentIndex = students.length - 1; // or retrieve a specific index
  window.location.href = `../portfolio/portfolio.html?studentIndex=${studentIndex}`;
});
