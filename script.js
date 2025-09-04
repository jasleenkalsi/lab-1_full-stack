window.addEventListener("DOMContentLoaded", async () => {
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
  // Primary (root) path; will 404 if data/ isn't at the server root
  const CANDIDATE_URLS = [
    "data/employeeLists.json",
    "vite-project/src/data/employeeLists.json" // fallback based on your tree
  ];

  // helper: fetch first URL that works
  async function fetchFirstWorking(urls) {
    let lastErr;
    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        return await res.json();
      } catch (e) {
        lastErr = e;
        console.warn("Fetch attempt failed:", e);
      }
    }
    throw lastErr || new Error("No URL succeeded");
  }

  try {
    const departmentsRaw = await fetchFirstWorking(CANDIDATE_URLS);
    employeesSection.setAttribute("aria-busy", "false");
    loading.remove();

    // Accept either an array or { departments: [...] }
    const list = Array.isArray(departmentsRaw)
      ? departmentsRaw
      : Array.isArray(departmentsRaw?.departments)
      ? departmentsRaw.departments
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
  } catch (err) {
    employeesSection.setAttribute("aria-busy", "false");
    loading.textContent =
      "Failed to load employees. Make sure the JSON exists at /data/employeeLists.json or update the path.";
    console.error("Employee load error:", err);
  }
});
