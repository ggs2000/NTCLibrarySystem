import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { FiSearch, FiPlus, FiX, FiEdit } from "react-icons/fi";

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    isbn: "",
    genre: "",
    author: "",
    color: "",
    copies: "",
    status: "Available",
  });
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    if (!newBook.name || !newBook.author) {
      alert("Please fill out the required fields (Book Name & Author).");
      return;
    }
    setBooks([...books, newBook]);
    setNewBook({
      name: "",
      isbn: "",
      genre: "",
      author: "",
      color: "",
      copies: "",
      status: "Available",
    });
    setIsModalOpen(false);
  };

  // Multi-select handling
  const toggleSelectBook = (index) => {
    setSelectedBooks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBooks.length === filteredBooks.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(filteredBooks.map((_, idx) => idx));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedBooks.length === 0) {
      alert("No books selected.");
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedBooks.length} book(s)?`
    );
    if (confirmDelete) {
      setBooks(books.filter((_, idx) => !selectedBooks.includes(idx)));
      setSelectedBooks([]);
    }
  };

  // Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedBooks = [...books].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setBooks(sortedBooks);
  };

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.name.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sans">Book Shelf</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Library / Collection
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mb-4 pt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-full bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-400"
          title="Add Book"
        >
          <FiPlus />
        </button>
        <button
          onClick={handleDeleteSelected}
          className="p-2 rounded-full bg-white text-teal-600 border-2 border-teal-600 hover:bg-red-500"
          title="Delete Selected Books"
        >
          <FiX />
        </button>
        <button
          onClick={() => alert("Edit action not yet implemented.")}
          className="p-2 rounded-full bg-white text-teal-600 border-2 border-teal-600 hover:bg-yellow-400"
          title="Edit Book"
        >
          <FiEdit />
        </button>
      </div>

      {/* Book List Box */}
      <div className="bg-white shadow-md rounded-md overflow-hidden" style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.4)", // 3D shadow on right & bottom
      }}>
        {/* Title bar */}
        <div className="flex items-center bg-teal-700 text-white px-4 py-2">
          <FaBook className="mr-2" />
          <h2 className="text-lg font-sans">Book List</h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 items-center px-4 py-2 border-b border-gray-300">
          <select className="border border-gray-400 rounded px-2 py-1 text-sm">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>

          {/* Search */}
          <div className="flex items-center border rounded-4xl px-2 py-1 w-full sm:w-48 md:w-60">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-full"
            />
            <FiSearch className="text-teal-700 ml-1" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] sm:min-w-[800px] text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b text-center">
                <th className="px-2 py-2 border">
                  <input
                    type="checkbox"
                    checked={
                      filteredBooks.length > 0 &&
                      selectedBooks.length === filteredBooks.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                {[
                  { key: "name", label: "Book Name" },
                  { key: "isbn", label: "ISBN No." },
                  { key: "genre", label: "Genre" },
                  { key: "author", label: "Author" },
                  { key: "color", label: "Color Code" },
                  { key: "copies", label: "Copies" },
                  { key: "status", label: "Status" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-2 sm:px-4 py-2 border cursor-pointer hover:bg-gray-200"
                  >
                    {col.label}{" "}
                    {sortConfig.key === col.key
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-gray-400 py-10 border"
                  >
                    No books found
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, idx) => (
                  <tr key={idx} className="border-b text-center">
                    <td className="px-2 py-2 border">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(idx)}
                        onChange={() => toggleSelectBook(idx)}
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 border">{book.name}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.isbn}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.genre}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.author}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.color}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.copies}</td>
                    <td className="px-2 sm:px-4 py-2 border">{book.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-sans mb-4 text-black">Add a New Book</h2>

            <div className="space-y-3">
              {[
                { label: "Book Name", name: "name", type: "text" },
                { label: "ISBN No.", name: "isbn", type: "text" },
                { label: "Genre", name: "genre", type: "text" },
                { label: "Author", name: "author", type: "text" },
                { label: "Color Code", name: "color", type: "text" },
                { label: "Copies", name: "copies", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}:
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={newBook[field.name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  name="status"
                  value={newBook.status}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBook}
                className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookShelf;
