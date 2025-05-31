import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

// Form types
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  specialRequests: string;
};

// Services for dropdown
const services = [
  { id: 'swedish-massage', name: 'Swedish Massage' },
  { id: 'deep-tissue', name: 'Deep Tissue Massage' },
  { id: 'hot-stone', name: 'Hot Stone Massage' },
  { id: 'hydrating-facial', name: 'Hydrating Facial' },
  { id: 'anti-aging-facial', name: 'Anti-Aging Facial' },
  { id: 'salt-scrub', name: 'Salt Scrub' },
  { id: 'detox-wrap', name: 'Detox Body Wrap' },
  { id: 'meditation', name: 'Guided Meditation' },
  { id: 'yoga', name: 'Yoga Session' }
];

// Available time slots
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      service: '',
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setBookingComplete(true);
  };

  return (
    <div className="min-h-screen bg-section-light py-20">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Book Your Treatment</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Schedule your wellness journey with us and experience true relaxation.
          </p>
        </div>

        {!bookingComplete ? (
          <div className="max-w-3xl mx-auto card overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Service</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Date & Time</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Your Details</span>
                </div>
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6">Select a Service</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Which treatment would you like to book?
                    </label>
                    <select 
                      {...register('service', { required: true })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">Please select a service</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!isValid}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6">Choose Date & Time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Preferred Date
                    </label>
                    <input 
                      type="date" 
                      {...register('date', { required: true })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">Please select a date</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Preferred Time
                    </label>
                    <select 
                      {...register('time', { required: true })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-sm mt-1">Please select a time</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="btn-outline"
                    >
                      Previous
                    </button>
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Personal Details */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6">Your Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        {...register('firstName', { required: true })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">First name is required</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        {...register('lastName', { required: true })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">Last name is required</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      {...register('email', { 
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.email?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1">Email is required</p>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      {...register('phone', { required: true })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">Phone number is required</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Special Requests (Optional)
                    </label>
                    <textarea 
                      {...register('specialRequests')}
                      rows={4}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="btn-outline"
                    >
                      Previous
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                    >
                      Complete Booking
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto card p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for booking with Serenity Retreat. We've sent a confirmation email with all the details of your appointment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              If you need to make any changes to your booking, please contact us at (555) 123-4567.
            </p>
            <button 
              onClick={() => setBookingComplete(false)} 
              className="btn-primary"
            >
              Make Another Booking
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingPage; 