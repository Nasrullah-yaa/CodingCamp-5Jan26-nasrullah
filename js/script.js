const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterInput = document.getElementById("filterInput");
const clearBtn = document.getElementById("clearBtn");

function removeEmptyRow() {
  const empty = document.querySelector(".empty");
  if (empty) empty.remove();
}

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) return;

  removeEmptyRow();

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td><span class="status pending">Pending</span></td>
    <td>
      <button class="delete">Delete</button>
    </td>
  `;

  tr.querySelector(".status").addEventListener("click", function () {
    this.classList.toggle("done");
    this.classList.toggle("pending");
    this.textContent = this.classList.contains("done") ? "Done" : "Pending";
  });

  tr.querySelector(".delete").addEventListener("click", () => {
    tr.remove();
    if (taskList.children.length === 0) {
      taskList.innerHTML = `
        <tr class="empty">
          <td colspan="4">No task available</td>
        </tr>
      `;
    }
  });

  taskList.appendChild(tr);

  taskInput.value = "";
  dateInput.value = "";
});

filterInput.addEventListener("input", () => {
  const value = filterInput.value.toLowerCase();
  const rows = taskList.querySelectorAll("tr");

  rows.forEach(row => {
    if (row.classList.contains("empty")) return;
    row.style.display = row.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});

clearBtn.addEventListener("click", () => {
  taskList.innerHTML = `
    <tr class="empty">
      <td colspan="4">No task available</td>
    </tr>
  `;
});
