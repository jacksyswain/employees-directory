if (!localStorage.getItem("employees")) {
  const mock = [
    { id: "1", firstName: "Jyoti prakash", lastName: "Swain", email: "jp.swainabc@gmail.com", department: "Engineering", role: "Frontend Developer" },
    { id: "2", firstName: "Rahul", lastName: "Verma", email: "rahul@example.com", department: "Sales", role: "Manager" },
    { id: "3", firstName: "Anita", lastName: "Patel", email: "anita@example.com", department: "HR", role: "Recruiter" }
  ];
  localStorage.setItem("employees", JSON.stringify(mock));
}

let page = 1, size = 10, sortKey = "", filters = {};

const render = () => {
  const list = document.getElementById("employeeList");
  let data = JSON.parse(localStorage.getItem("employees")) || [];

  // Apply filters
  if (filters.name) data = data.filter(e => e.firstName.toLowerCase().includes(filters.name.toLowerCase()));
  if (filters.department) data = data.filter(e => e.department.toLowerCase().includes(filters.department.toLowerCase()));
  if (filters.role) data = data.filter(e => e.role.toLowerCase().includes(filters.role.toLowerCase()));

  // Sort
  if (sortKey) data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  const start = (page - 1) * size;
  const end = page * size;
  const paginated = data.slice(start, end);

  list.innerHTML = paginated.map(emp => `
    <div class="employee-card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="location.href='form.html?id=${emp.id}'">Edit</button>
      <button onclick="remove('${emp.id}')">Delete</button>
    </div>
  `).join("");

  document.getElementById("pageInfo").innerText = `Page ${page}`;
};


function remove(id) {
  let emps = JSON.parse(localStorage.getItem("employees")) || [];
  localStorage.setItem("employees", JSON.stringify(emps.filter(e => e.id !== id)));
  render();
}

function nextPage() { page++; render(); }
function prevPage() { if (page > 1) page--; render(); }

function applyFilters() {
  filters.name = document.getElementById("filterName").value;
  filters.department = document.getElementById("filterDept").value;
  filters.role = document.getElementById("filterRole").value;
  page = 1;
  render();
}

function clearFilters() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterRole").value = "";
  filters = {};
  page = 1;
  render();
}

document.getElementById("pageSize").onchange = e => { size = +e.target.value; render(); };
document.getElementById("searchInput").oninput = e => {
  const query = e.target.value.toLowerCase();
  const all = JSON.parse(localStorage.getItem("employees")) || [];
  const filtered = all.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  document.getElementById("employeeList").innerHTML = filtered.map(emp => `
    <div class="employee-card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
    </div>
  `).join("");
};

document.getElementById("sortBy").onchange = e => {
  sortKey = e.target.value;
  render();
};

window.onload = render;
