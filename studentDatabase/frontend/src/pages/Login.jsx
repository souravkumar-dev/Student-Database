import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex justify-center items-center bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white p-8 rounded shadow w-96"
    //   >
    //     <h2 className="text-2xl font-bold mb-5">Admin Login</h2>

    //     <input
    //       type="email"
    //       placeholder="Email"
    //       className="w-full border p-2 mb-3"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />

    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="w-full border p-2 mb-3"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />

    //     <button className="w-full bg-blue-600 text-white py-2 rounded">
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white">StudentDB</h1>

          <p className="text-blue-100 mt-2">Student Management System</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Admin Login
          </h2>

          <p className="text-center text-blue-100 mb-8">
            Sign in to access dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white mb-2">Email Address</label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
            {/* <div className="mt-8 border-t border-white/20 pt-6 text-center">
              <p className="text-blue-100 text-sm">New user?</p>

              <p className="text-white text-sm mb-4">
                Contact the system administrator to obtain login credentials.
              </p>

              <a
                href="mailto:helloworld123new@gmail.com?subject=Admin Login Request"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Request Admin Access
              </a>
            </div> */}
            <div className="mt-6 text-center">
              <p className="text-blue-100 text-sm mb-3">
                Need administrator access?
              </p>

              <a
                href="mailto:helloworld123new@gmail.com?subject=Admin Access Request"
                className="inline-block px-5 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl transition-all"
              >
                Contact Admin
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
