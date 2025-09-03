
window.addEventListener("load", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Create & insert the Employees section for main
  const main = document.getElementById("main-content");
  const employeesSection = document.createElement("section");
  employeesSection.id = "employees";
  employeesSection.setAttribute("aria-live", "polite");

  // Heading + loading message
  const h3 = document.createElement("h3");
  h3.textContent = "Employees";
  const loading = document.createElement("p");
  loading.id = "emp-loading";
  loading.textContent = "Loading employees…";

  employeesSection.appendChild(h3);
  employeesSection.appendChild(loading);
  main.insertBefore(employeesSection, main.children[1] || null);

  // Fetch the external JSON and render departments & names
  fetch("./data/employeeLists.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((departments) => {
      loading.remove();

      departments.forEach((dept) => {
        // Each department as a bordered “new-product” block
        const card = document.createElement("article");
        card.className = "new-product";

        const h4 = document.createElement("h4");
        h4.textContent = dept.department;

        const ul = document.createElement("ul");
        (dept.employees || []).forEach((name) => {
          const li = document.createElement("li");
          li.textContent = name;
          ul.appendChild(li);
        });

        card.appendChild(h4);
        card.appendChild(ul);
        employeesSection.appendChild(card);
      });
    })
    .catch((err) => {
      loading.textContent = "Failed to load employees. Please check the console.";
      console.error("Employee load error:", err);
    });
});
