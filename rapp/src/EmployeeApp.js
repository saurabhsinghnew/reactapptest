import { useState, useEffect } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./employeeService";

function EmployeeApp() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", location: "" });

  // READ
  useEffect(() => {
    getEmployees()
      .then(res => {
        console.log("API Response:", res.data);
        setEmployees(res.data);
      })
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee(form).then(res => {
      setEmployees([...employees, res.data]);
      setForm({ name: "", address: "", location: "" });
    });
  };

  // UPDATE
  const handleUpdate = (id) => {
    const updated = { ...form };
    updateEmployee(id, updated).then(res => {
      setEmployees(employees.map(emp => emp.empid === id ? res.data : emp));
    });
  };

  // DELETE
  const handleDelete = (id) => {
    deleteEmployee(id).then(() => {
      setEmployees(employees.filter(emp => emp.empid !== id));
    });
  };

  return (
    <div>
      <h2>Employee Records</h2>

      <form onSubmit={handleSubmit}>
        <table style={{ border: "1px solid black", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ccc", fontSize: "12pt", color: "#000" }}>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.empid} style={{ border: "1px solid black" }}>
                <td>{emp.empid}</td>
                <td>{emp.name}</td>
                <td>{emp.address}</td>
                <td>{emp.location}</td>
              </tr>
            ))}

            {/* Input row for new employee */}
            <tr>
              <td>New</td>
              <td>
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </td>
              <td>
                <input
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </td>
              <td>
                <button type="submit">Add Employee</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h3>Actions</h3>
      <ul>
        {employees.map(emp => (
          <li key={emp.empid}>
            {emp.name} - {emp.address} - {emp.location}
            <button onClick={() => handleUpdate(emp.empid)}>Edit</button>
            <button onClick={() => handleDelete(emp.empid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeApp;
