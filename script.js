window.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Grab main; if missing, fall back to body
  const main = document.getElementById("main-content") || document.body;

  // Create & insert the Employees section
  const employeesSection = document.createElement("section");
  employeesSection.id = "employees";
  employeesSection.setAttribute("aria-live", "polite");
  employeesSection.setAttribute("aria-busy", "true");

  // Heading + loading message
  const h3 = document.createElement("h3");
  h3.textContent = "Employees";
  const loading = document.createElement("p");
  loading.id = "emp-loading";
  loading.textContent = "Loading employees…";

  employeesSection.appendChild(h3);
  employeesSection.appendChild(loading);

  // Insert after the first child of main if available; else append
  const insertBeforeNode = main.children && main.children[1] ? main.children[1] : null;
  main.insertBefore(employeesSection, insertBeforeNode);

  // --- Fetch and render ---
  // Use a relative path without leading slash; adjust if your JSON lives elsewhere
  const JSON_URL = "data/employeeLists.json";

  fetch(JSON_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch ${JSON_URL}: HTTP ${res.status}`);
      return res.json();
    })
    .then((departments) => {
      loading.remove();
      employeesSection.setAttribute("aria-busy", "false");

      // Accept either an array of departments, or an object with { departments: [...] }
      const list = Array.isArray(departments)
        ? departments
        : Array.isArray(departments?.departments)
        ? departments.departments
        : [];

      if (list.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No employees to display.";
        employeesSection.appendChild(empty);
        return;
      }

      list.forEach((dept) => {
        const departmentName = String(dept?.department ?? "General");
        const employees = Array.isArray(dept?.employees) ? dept.employees : [];

        const card = document.createElement("article");
        card.className = "new-product";

        const h4 = document.createElement("h4");
        h4.textContent = departmentName;

        const ul = document.createElement("ul");
        employees.forEach((name) => {
          const li = document.createElement("li");
          li.textContent = String(name);
          ul.appendChild(li);
        });

        card.appendChild(h4);
        card.appendChild(ul);
        employeesSection.appendChild(card);
      });
    })
    .catch((err) => {
      employeesSection.setAttribute("aria-busy", "false");
      loading.textContent = "Failed to load employees. Check the console and the JSON path.";
      console.error("Employee load error:", err);
    });
});
