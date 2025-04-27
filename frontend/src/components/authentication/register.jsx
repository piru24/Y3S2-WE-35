import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';
import validators from '../../utils/validators';
import InputField from '../ui/InputField';
import RoleSelector from '../ui/RoleSelector';
import Loader from '../Loader';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8090';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    role: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!validators.validateName(formData.name)) newErrors.name = 'Invalid name';
    if (!validators.validatePhone(formData.mobile)) newErrors.mobile = 'Invalid phone number';
    if (!validators.validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!validators.validatePassword(formData.password)) newErrors.password = 'Minimum 8 characters required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const { data } = await axios.post(`${API_BASE}/User/signUp`, {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.replace(/\D/g, '')
      });

      if (data && data.User && data.User._id && data.User.role) {
        dispatch(authActions.login({
          userId: data.User._id,
          role: data.User.role,
          email: data.User.email
        }));

        switch (data.User.role) {
          case 'admin':
            navigate('/admin/dashboard', { replace: true });
            break;
          case 'seller':
            navigate('/seller/dashboard', { replace: true });
            break;
          default:
            navigate('/products', { replace: true });
        }
      } else {
        throw new Error('Invalid response structure from backend');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              autoComplete="name"
              required
            />

            <InputField
              label="Mobile Number"
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              error={errors.mobile}
              autoComplete="tel"
              pattern="[0-9]*"
              required
            />

            <InputField
              label="Email address"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              autoComplete="email"
              required
            />

            <InputField
              label="Address"
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
              autoComplete="street-address"
              required
            />

            <RoleSelector
              value={formData.role}
              onChange={(role) => setFormData({ ...formData, role })}
              error={errors.role}
            />

            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              autoComplete="new-password"
              required
            />

            {apiError && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {apiError}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? <Loader size="small" /> : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
