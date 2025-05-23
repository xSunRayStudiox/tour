import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import useToast from '../../utils/useToast';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
   const { showToast } = useToast();
   const [form, setForm] = useState({
      name: '',
      countryCode: '+91',
      number: '',
      email: '',
      password: ''
   });

   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);
   const { register, loading, isAuthenticated } = useAuth();
   const navigate = useNavigate();

   // Redirect if already logged in
   useEffect(() => {
      if (isAuthenticated) navigate('/');
   }, [isAuthenticated, navigate]);

   const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' });
   };

   const validate = () => {
      const newErrors = {};
      if (!form.name.trim()) newErrors.name = 'Name is required';
      if (!/^\d{6,15}$/.test(form.number)) newErrors.number = 'Enter a valid mobile number';
      if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
      if (form.password.length < 6) {
         newErrors.password = 'Minimum 6 characters required';
      } else if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
         newErrors.password = 'Include at least 1 uppercase letter and 1 number';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async e => {
      e.preventDefault();
      if (!validate()) return;

      const finalData = {
         name: form.name,
         number: `${form.countryCode}${form.number}`,
         email: form.email,
         password: form.password
      };

      const result = await register(finalData);

      if (result.success) {
         showToast({ title: 'Registered successfully!', icon: 'success' });
         navigate('/');
      } else {
         showToast({ title: result.message || 'Registration failed', icon: 'error' });
      }
   };

   return (
      <Layout>
         <div className="container py-5">
            <div className="row justify-content-center">
               <div className="col-lg-6 col-md-8 col-sm-10">
                  <div className="glass-card p-4">
                     <h2 className="text-center mb-4">Create Account</h2>
                     <form onSubmit={handleSubmit} noValidate>
                        {/* Name */}
                        <div className="mb-3">
                           <label className="form-label">Name</label>
                           <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} />
                           {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        {/* Mobile */}
                        <div className="mb-3">
                           <label className="form-label">Mobile Number</label>
                           <div className="input-group">
                              <select name="countryCode" className="form-select" value={form.countryCode} onChange={handleChange} style={{ maxWidth: '100px' }}>
                                 <option value="+91">🇮🇳 +91</option>
                                 <option value="+1">🇺🇸 +1</option>
                                 <option value="+44">🇬🇧 +44</option>
                                 <option value="+61">🇦🇺 +61</option>
                                 <option value="+971">🇦🇪 +971</option>
                              </select>
                              <input type="text" name="number" className={`form-control ${errors.number ? 'is-invalid' : ''}`} value={form.number} onChange={handleChange} placeholder="Enter mobile number" />
                           </div>
                           {errors.number && <div className="invalid-feedback d-block">{errors.number}</div>}
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                           <label className="form-label">Email</label>
                           <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} />
                           {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                           <label className="form-label">Password</label>
                           <div className="input-group">
                              <input type={showPassword ? 'text' : 'password'} name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={form.password} onChange={handleChange} placeholder="Enter password" />
                              <span className="input-group-text" onClick={() => setShowPassword(prev => !prev)} style={{ cursor: 'pointer' }}>
                                 {!showPassword ? <FiEyeOff /> : <FiEye />}
                              </span>
                           </div>
                           {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
                           {loading ? 'Registering...' : 'Register'}
                        </button>
                     </form>

                     <div className="row mb-3 mt-3">
                        <div className="col-12 col-md-6 py-1">
                           <a href="/forgot-password" className="text-decoration-none small">Forgot Password?</a>
                        </div>
                        <div className="col-12 col-md-6 text-md-end py-1">
                           <a href="/login" className="text-decoration-none small">I have already account? Login</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default RegisterPage;
