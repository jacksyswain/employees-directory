const id = new URLSearchParams(location.search).get("id");
const form = document.getElementById("employeeForm");
const emps = JSON.parse(localStorage.getItem("employees")) || [];

if (id) {
  const emp = emps.find(e => e.id === id);
  if (emp) {
    form.firstName.value = emp.firstName;
    form.lastName.value = emp.lastName;
    form.email.value = emp.email;
    form.department.value = emp.department;
    form.role.value = emp.role;
    form.querySelector("button[type='submit']").textContent = "Update";
    document.querySelector("h1").textContent = "Edit Employee";
  }
}

form.onsubmit = e => {
  e.preventDefault();
  const updated = {
    id: id || Date.now().toString(),
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    department: form.department.value,
    role: form.role.value
  };

  if (!validateEmail(updated.email)) {
    alert("Invalid email format.");
    return;
  }

  const updatedEmps = id
    ? emps.map(e => e.id === id ? updated : e)
    : [...emps, updated];

  localStorage.setItem("employees", JSON.stringify(updatedEmps));
  location.href = "index.html";
};

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}