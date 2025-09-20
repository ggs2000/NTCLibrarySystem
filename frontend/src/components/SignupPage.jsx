import logo from "../assets/logo2.png";
import accountbg from "../assets/accountbg.png";

const SignupPage = ({ handleSignup, goToLogin }) => {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${accountbg})` }}
      />

      {/* Overlay (teal left half) */}
      <div className="absolute top-0 left-0 h-full bg-teal-700/90" />

      {/* Logo in top-right */}
      <div className="absolute top-4 right-6 z-20">
        <img src={logo} alt="Logo" className="w-35" />
      </div>

      {/* Left Section */}
      <div className="relative z-10 w-1/1 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-xl font-sans mb-2 text-center">
          NORTHLINK TECHNOLOGICAL COLLEGE
        </h1>
        <h2 className="text-8xl font-sans mb-4 text-center">LIBRARY SYSTEM</h2>
        <p className="text-lg text-center max-w-md">
          Scan with ease, read with purpose—<br /> bridging digital and physical.
        </p>
      </div>

      {/* Right Section */}
      <div className="relative z-10 w-1/2 flex items-center justify-center bg-white">
        <div className="w-[350px]">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">Sign up</h2>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="First Name/ Middle Name/ Last Name/ Suffix"
              className="rounded-lg px-3 py-2 outline-none w-full bg-teal-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-lg px-3 py-2 outline-none w-full bg-teal-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="rounded-lg px-3 py-2 outline-none w-full bg-teal-500"
              required
            />

            {/* Role Selection */}
            <fieldset className="border-4 border-teal-500 rounded-lg px-3 py-2">
              <legend className="text-md text-teal-600">Role</legend>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="role" value="librarian" required />
                  <span className="text-teal-700">Librarian</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="role" value="student"/>
                  <span className="text-teal-700">Student Assistant (Staff)</span>
                </label>
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition mt-4"
            >
              Create
            </button>

             {/* ✅ Back to login */}
            <p className="text-sm text-gray-500 text-right mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={goToLogin}
                className="hover:underline text-teal-600"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
