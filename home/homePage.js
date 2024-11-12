function displayStudentsOnTable() {
  const studentsOnStorage =
    JSON.parse(localStorage.getItem("newStudent")) || [];
  let tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";
  for (let i = 0; i < studentsOnStorage.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${studentsOnStorage[i].picture}" alt="Student Image" style="width: 50px; height: auto; border-radius: 5px;"></td>
      <td>${studentsOnStorage[i].firstName}</td>
      <td>${studentsOnStorage[i].lastName}</td>
      <td>${studentsOnStorage[i].email}</td>
      <td>${studentsOnStorage[i].phone}</td>
      <td>${studentsOnStorage[i].group}</td>
      <td><a href="./../portfolio/portfolio.html?studentIndex=${i}"><i class="fa-regular fa-eye view"></i>
    </a>        <i class="fa-solid fa-pen-to-square edit" onclick="editStudent(${i})"></i>
        <i class="fa-solid fa-trash delete" onclick="deleteStudent(${i})"></i>
      </td>
    `;

    tableBody.appendChild(row);
  }
}

displayStudentsOnTable();
