import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BookShelf from "./components/BookShelf";
import Students from "./components/Students";
import Faculty from "./components/Faculty";
import logo from "./assets/logo2.png";

import LoginPage from "./components/LoginPage"; // ✅ Import new Login page
import SignupPage from "./components/SignupPage";


function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Fake login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowSplash(true);
    setTimeout(() => setShowSplash(false), 2000); // 2s splash screen
  };

   // Fake signup handler
  const handleSignup = (e) => {
    e.preventDefault();
    setShowSignup(false); // after signup, return to login
    alert("Account created! Please log in.");
  };

  // --- Signup Page ---
    if (!isLoggedIn && showSignup) {
    return (
      <SignupPage
        handleSignup={handleSignup} 
        goToLogin={() => setShowSignup(false)} // ✅ go back to login
      />
    );
  }

  // --- Login Page ---
    if (!isLoggedIn && !showSignup) {
    return (
    <LoginPage 
      handleLogin={handleLogin} 
      goToSignup={() => setShowSignup(true)} 
      />
    ); // ✅ Render separate login component
  }

  // --- Splash Screen ---
  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <img src={logo} alt="Logo" className="w-40 h-40 animate-pulse" />
      </div>
    );
  }

  // --- Main App ---
  return (
    <div className="flex h-screen">
      {/* Sidebar Fixed */}
      <aside className="fixed top-0 left-0 h-full bg-gray-100 text-white">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-40 overflow-y-auto bg-gray-100 h-screen">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "bookshelf" && <BookShelf />}
        {activePage === "students" && <Students />}
        {activePage === "librarian" && <Faculty />}
      </main>
    </div>
  );
}

export default App;
