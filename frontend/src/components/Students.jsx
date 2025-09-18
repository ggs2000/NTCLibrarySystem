import { useState } from "react";
import { FiSearch, FiPlus, FiX, FiEdit } from "react-icons/fi";

const Student = () => {
  const [searchLeft, setSearchLeft] = useState("");
  const [students, setStudents] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [editStudentId, setEditStudentId] = useState(null);

  const [newStudent, setNewStudent] = useState({
    fullName: "",
    year: "",
    adviser: "",
    contacts: { mobile: "", email: "", facebook: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["mobile", "email", "facebook"].includes(name)) {
      setNewStudent((prev) => ({
        ...prev,
        contacts: { ...prev.contacts, [name]: value },
      }));
    } else {
      setNewStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setNewStudent({
      fullName: "",
      year: "",
      adviser: "",
      contacts: { mobile: "", email: "", facebook: "" },
    });
    setEditStudentId(null);
  };

  const handleAddStudent = () => {
    if (!newStudent.fullName || !newStudent.year) {
      alert("Please fill out Full Name and Year/Grade.");
      return;
    }

    const exists = students.some(
      (student) =>
        student.fullName.toLowerCase() === newStudent.fullName.toLowerCase() ||
        (student.contacts.email &&
          student.contacts.email.toLowerCase() ===
            newStudent.contacts.email.toLowerCase()) ||
        (student.contacts.mobile &&
          student.contacts.mobile === newStudent.contacts.mobile)
    );

    if (exists) {
      alert("This student already exists!");
      return;
    }

    const nextId =
      students.length > 0
        ? Math.max(...students.map((s) => parseInt(s.id, 10))) + 1
        : 1;

    const studentToAdd = {
      ...newStudent,
      id: String(nextId).padStart(3, "0"),
    };

    setStudents([...students, studentToAdd]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const openEditForSelected = () => {
    if (!selectedId) {
      alert("Please select a student row first (click a row) to edit.");
      return;
    }
    const student = students.find((s) => s.id === selectedId);
    if (!student) {
      alert("Selected student not found.");
      return;
    }
    setEditStudentId(student.id);
    setNewStudent({
      fullName: student.fullName || "",
      year: student.year || "",
      adviser: student.adviser || "",
      contacts: {
        mobile: student.contacts?.mobile || "",
        email: student.contacts?.email || "",
        facebook: student.contacts?.facebook || "",
      },
      id: student.id,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!newStudent.fullName || !newStudent.year) {
      alert("Full Name and Year/Grade are required.");
      return;
    }

    const exists = students.some(
      (student) =>
        student.id !== editStudentId &&
        (student.fullName.toLowerCase() === newStudent.fullName.toLowerCase() ||
          (student.contacts.email &&
            student.contacts.email.toLowerCase() ===
              newStudent.contacts.email.toLowerCase()) ||
          (student.contacts.mobile &&
            student.contacts.mobile === newStudent.contacts.mobile))
    );

    if (exists) {
      alert("Another student with same name/email/mobile already exists!");
      return;
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.id === editStudentId ? { ...s, ...newStudent, id: editStudentId } : s
      )
    );

    resetForm();
    setIsEditModalOpen(false);
  };

  const handleDeleteSelected = () => {
    if (selectedForDelete.length === 0) {
      alert("No students selected for deletion.");
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedForDelete.length} student(s)?`
    );
    if (confirmDelete) {
      setStudents(students.filter((s) => !selectedForDelete.includes(s.id)));
      setSelectedForDelete([]);
    }
  };

  const toggleSelectForDelete = (id) => {
    setSelectedForDelete((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchLeft.toLowerCase()) ||
      student.year.toLowerCase().includes(searchLeft.toLowerCase()) ||
      student.id.includes(searchLeft)
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-sans mb-2">Registered Students</h2>
      <p className="text-gray-600 mb-6">Students / Affiliated</p>

      {/* Search + Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center bg-white border-2 border-teal-600 rounded-full px-3 py-1 w-72 shadow-sm">
          <FiSearch className="text-teal-600" />
          <input
            type="text"
            placeholder="Search..."
            value={searchLeft}
            onChange={(e) => setSearchLeft(e.target.value)}
            className="ml-2 bg-transparent text-gray-700 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-500"
            title="Add student"
          >
            <FiPlus />
          </button>

          <button
            onClick={() => setShowDelete(!showDelete)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white hover:bg-red-500"
            title="Toggle delete mode"
          >
            <FiX />
          </button>

          <button
            onClick={openEditForSelected}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-500"
            title="Edit selected student"
          >
            <FiEdit />
          </button>

          {showDelete && (
            <button
              onClick={handleDeleteSelected}
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500"
              title="Delete selected students"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg" style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.4)", // 3D shadow on right & bottom
      }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Year/Grade</th>
              <th className="px-4 py-2">Adviser</th>
              <th className="px-4 py-2">Contacts</th>
              <th className="px-4 py-2">Records</th>
              {showDelete && <th className="px-4 py-2">Select</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={showDelete ? 7 : 6}
                  className="text-center text-gray-400 py-10 border"
                >
                  No students are registered
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isSelected = selectedId === student.id;
                return (
                  <tr
                    key={student.id}
                    className={`cursor-pointer ${
                      isSelected ? "bg-teal-500" : ""
                    }`}
                    onClick={() => setSelectedId(student.id)}
                  >
                    <td className="px-4 py-2">{student.id}</td>
                    <td className="px-4 py-2">{student.fullName}</td>
                    <td className="px-4 py-2">{student.year}</td>
                    <td className="px-4 py-2">{student.adviser}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedContacts(student.contacts);
                          setIsContactModalOpen(true);
                        }}
                        className="px-3 py-1 bg-teal-600 text-white rounded-full shadow hover:bg-teal-500"
                      >
                        See All...
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Records view - not implemented.");
                        }}
                        className="px-3 py-1 bg-teal-600 text-white rounded-full shadow hover:bg-teal-500"
                      >
                        See Records
                      </button>
                    </td>
                    {showDelete && (
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedForDelete.includes(student.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectForDelete(student.id);
                          }}
                        />
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal (shared style) */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {isAddModalOpen ? "Add Student" : "Edit Student"}
            </h3>
            <input
              name="fullName"
              value={newStudent.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <select
                name="year"
                value={newStudent.year}
                onChange={handleChange}
                className="w-full mb-2 p-2 border rounded"
              >
                <option value="">Select Year/Grade</option>

                <optgroup label="Senior High School Department">
                  <option value="Grade 11 - STEM">Grade 11 - STEM</option>
                  <option value="Grade 11 - ABM">Grade 11 - ABM</option>
                  <option value="Grade 11 - HUMSS">Grade 11 - HUMSS</option>
                  <option value="Grade 11 - GAS">Grade 11 - GAS</option>
                  <option value="Grade 11 - TVL">Grade 11 - TVL</option>
                  <option value="Grade 12 - STEM">Grade 12 - STEM</option>
                  <option value="Grade 12 - ABM">Grade 12 - ABM</option>
                  <option value="Grade 12 - HUMSS">Grade 12 - HUMSS</option>
                  <option value="Grade 12 - GAS">Grade 12 - GAS</option>
                  <option value="Grade 12 - TVL">Grade 12 - TVL</option>
                </optgroup>

                <optgroup label="College Department">
                  <option value="BSIS1">BSIS-1</option>
                  <option value="BSIS2">BSIS-2</option>
                  <option value="BSIS3">BSIS-3</option>
                  <option value="BSIS4">BSIS-4</option>
                  <option value="DIT1">DIT-1</option>
                  <option value="DIT2">DIT-2</option>
                  <option value="DIT2">DIT-3</option>
                  <option value="DHRT1">DHRT-1</option>
                  <option value="DHRT2">DHRT-2</option>
                  <option value="DHRT3">DHRT-3</option>
                  <option value="ACT1">ACT-1</option>
                  <option value="ACT2">ACT-2</option>
                </optgroup>
              </select>

            <input
              name="adviser"
              value={newStudent.adviser}
              onChange={handleChange}
              placeholder="Adviser"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="mobile"
              value={newStudent.contacts.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="email"
              value={newStudent.contacts.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="facebook"
              value={newStudent.contacts.facebook}
              onChange={handleChange}
              placeholder="Facebook"
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              {isAddModalOpen ? (
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={handleUpdateStudent}
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contacts Modal */}
      {isContactModalOpen && selectedContacts && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Contacts</h3>
            <p>Mobile: {selectedContacts.mobile}</p>
            <p>Email: {selectedContacts.email}</p>
            <p>Facebook: {selectedContacts.facebook}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
