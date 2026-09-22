import { useState, useEffect } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./employeeService";

function EmployeeApp() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", location: "" });

  // READ
  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
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
    const updated = { ...form }; // or prompt user for new values
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
      <h1>Employee Records</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button type="submit">Add Employee</button>
      </form>

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
