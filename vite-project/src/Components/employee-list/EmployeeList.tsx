import data from "../../data/employeeLists.json";  
import EmployeeCard from "../employee-list/EmployeeCard";

type Department = { department: string; employees: string[] };

export default function EmployeeList() {
  const groups = data as Department[];

  console.log("Loaded groups:", groups);

  return (
    <section id="employees">
      {groups.map((g: Department) => (
        <section key={g.department} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{g.department}</h2>
          <div className="grid gap-3">
            {g.employees.map((name: string) => (
              <EmployeeCard key={`${g.department}-${name}`} name={name} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
