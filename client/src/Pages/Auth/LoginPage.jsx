import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import useToast from '../../utils/useToast';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
   const { login, loading, isAuthenticated } = useAuth();
   const { showToast } = useToast();
   const navigate = useNavigate();

   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);

   // Redirect if already logged in
   useEffect(() => {
      if (isAuthenticated) navigate('/');
   }, [isAuthenticated, navigate]);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' });
   };

   const validate = () => {
      const newErrors = {};
      if (!form.email.trim()) {
         newErrors.email = 'Email is required';
      }
      if (!form.password.trim()) {
         newErrors.password = 'Password is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;

      const result = await login(form.email, form.password);
      if (result.success) {
         showToast({ title: 'Logged in successfully!', icon: 'success' });
         navigate('/');
      } else {
         showToast({ title: result.message || 'Login failed', icon: 'error' });
      }
   };

   return (
      <Layout>
         <div className="container py-5">
            <div className="row justify-content-center">
               <div className="col-lg-6 col-md-8 col-sm-10">
                  <div className="p-4 glass-card">
                     <h2 className="text-center mb-4">Login</h2>
                     <form onSubmit={handleSubmit} noValidate>
                        {/* Email or Number */}
                        <div className="mb-3">
                           <label className="form-label">Email or Mobile Number</label>
                           <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} placeholder="Enter email" />
                           {errors.email && (
                              <div className="invalid-feedback">{errors.email}</div>
                           )}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                           <label className="form-label">Password</label>
                           <div className="input-group">
                              <input type={showPassword ? 'text' : 'password'} name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={form.password} onChange={handleChange} placeholder="Enter password" />
                              <span className="input-group-text" onClick={() => setShowPassword((prev) => !prev)} style={{ cursor: 'pointer' }}>
                                 {!showPassword ? <FiEyeOff /> : <FiEye />}
                              </span>
                           </div>
                           {errors.password && (
                              <div className="invalid-feedback d-block">{errors.password}</div>
                           )}
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
                           {loading ? 'Logging in...' : 'Login'}
                        </button>
                     </form>

                     <div className="row mb-3 mt-3">
                        <div className="col-12 col-md-6 py-1">
                           <a href="/forgot-password" className="text-decoration-none small">Forgot Password?</a>
                        </div>
                        <div className="col-12 col-md-6 text-md-end py-1">
                           <a href="/register" className="text-decoration-none small">Don't have an account? Register</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default LoginPage;
