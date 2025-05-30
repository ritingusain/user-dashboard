'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Toast, useToast } from '../../components/Toast';
import { useUsers } from '../../context/UserContext';

// Types
type FormField = 'name' | 'email' | 'street' | 'city' | 'zip';

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
}

// Simple validation rules
const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberRegex = /^\d+$/;

// Form validation
const validateField = (field: FormField, value: string) => {
  const val = value.trim();
  
  if (!val) return `${field} is required`;
  
  switch (field) {
    case 'name':
      if (val.length < 2) return 'Name is too short';
      if (val.length > 50) return 'Name is too long';
      if (!nameRegex.test(val)) return 'Invalid name format';
      break;
      
    case 'email':
      if (!emailRegex.test(val)) return 'Invalid email';
      if (val.length > 100) return 'Email is too long';
      break;
      
    case 'street':
      if (val.length < 5) return 'Street address is too short';
      if (val.length > 100) return 'Street address is too long';
      break;
      
    case 'city':
      if (val.length < 2) return 'City name is too short';
      if (val.length > 50) return 'City name is too long';
      if (!nameRegex.test(val)) return 'Invalid city name';
      break;
      
    case 'zip':
      if (!numberRegex.test(val)) return 'ZIP must be numbers only';
      break;
  }
};

const INITIAL_DATA: FormData = {
  name: '',
  email: '',
  street: '',
  city: '',
  zip: '',
};

export default function AddUser() {
  const router = useRouter();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { addUser } = useUsers();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});

  // Load saved form data
  useEffect(() => {
    const saved = localStorage.getItem('userFormData');
    if (saved) setData(JSON.parse(saved));
  }, []);

  // Save form progress
  useEffect(() => {
    localStorage.setItem('userFormData', JSON.stringify(data));
  }, [data]);

  // Form handlers
  const updateField = (field: FormField, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateStep = (currentStep: number) => {
    const fields = currentStep === 1 ? ['name', 'email'] : ['street', 'city', 'zip'];
    const stepErrors: Partial<Record<FormField, string>> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field as FormField, data[field as FormField]);
      if (error) {
        stepErrors[field as FormField] = error;
        isValid = false;
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const handleNext = () => validateStep(step) && setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    try {
      const newUser = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: 'N/A',
        address: {
          street: data.street.trim(),
          city: data.city.trim(),
          zipcode: data.zip.trim(),
        },
      };

      addUser(newUser);
      localStorage.removeItem('userFormData');
      showToast('User added successfully!', 'success');
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to add user:', err);
      showToast('Something went wrong. Please try again.', 'error');
    }
  };

  // Render form steps
  const renderBasicInfo = () => (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Basic Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={e => updateField('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={data.email}
          onChange={e => updateField('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
    </motion.div>
  );

  const renderAddressInfo = () => (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Address Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Street
        </label>
        <input
          type="text"
          value={data.street}
          onChange={e => updateField('street', e.target.value)}
          onBlur={() => handleBlur('street')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          City
        </label>
        <input
          type="text"
          value={data.city}
          onChange={e => updateField('city', e.target.value)}
          onBlur={() => handleBlur('city')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          value={data.zip}
          onChange={e => updateField('zip', e.target.value)}
          onBlur={() => handleBlur('zip')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.zip && (
          <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
        )}
      </div>
    </motion.div>
  );

  const renderReview = () => (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Review Information</h2>
      <div className="space-y-2 dark:text-gray-300">
        <p><span className="font-medium">Name:</span> {data.name}</p>
        <p><span className="font-medium">Email:</span> {data.email}</p>
        <p><span className="font-medium">Street:</span> {data.street}</p>
        <p><span className="font-medium">City:</span> {data.city}</p>
        <p><span className="font-medium">ZIP Code:</span> {data.zip}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 dark:bg-gray-900"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Add New User</h1>
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: num * 0.1 }}
                className={`w-1/3 h-2 rounded ${
                  step >= num ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {step === 1 && renderBasicInfo()}
          {step === 2 && renderAddressInfo()}
          {step === 3 && renderReview()}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Back to Dashboard
            </button>
            
            <div className="space-x-2">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Previous
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 