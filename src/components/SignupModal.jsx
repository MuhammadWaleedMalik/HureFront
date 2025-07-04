import { useState } from 'react';
import { motion } from 'framer-motion';

const SignupModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Plan selection, 2: Payment, 3: Confirmation
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: '$99/month',
      features: [
        'Up to 10 staff members',
        'Basic credential tracking',
        'Email support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$299/month',
      features: [
        'Up to 50 staff members',
        'Advanced credential tracking',
        'Recruitment tools',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited staff members',
        'Full credential tracking',
        'Advanced recruitment',
        'Compliance management',
        '24/7 dedicated support'
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setStep(3);
      // In a real app, you would send the welcome email here
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedPlan(null);
    setPaymentMethod('');
    setPaymentComplete(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed mt-24 inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && 'Choose Your Plan'}
              {step === 2 && 'Payment Information'}
              {step === 3 && 'Thank You for Signing Up!'}
            </h2>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex mb-8">
            <div className={`flex-1 border-t-4 ${step >= 1 ? 'border-blue-500' : 'border-gray-300'} pt-2`}>
              <p className={`text-sm ${step >= 1 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Plan Selection</p>
            </div>
            <div className={`flex-1 border-t-4 ${step >= 2 ? 'border-blue-500' : 'border-gray-300'} pt-2`}>
              <p className={`text-sm ${step >= 2 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Payment</p>
            </div>
            <div className={`flex-1 border-t-4 ${step >= 3 ? 'border-blue-500' : 'border-gray-300'} pt-2`}>
              <p className={`text-sm ${step >= 3 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Confirmation</p>
            </div>
          </div>

          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold mb-4">{plan.price}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a href="/pricing" className="text-blue-500 hover:underline">View Full Plan Details</a>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && selectedPlan && (
            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-2">Selected Plan: {selectedPlan.name}</h3>
                <p className="text-xl font-bold">{selectedPlan.price}</p>
              </div>

              <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => handlePayment('mpesa')}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex flex-col items-center"
                >
                  <img src="/mpesa-logo.png" alt="M-Pesa" className="h-12 mb-2" />
                  <span>M-Pesa</span>
                </button>
                <button
                  onClick={() => handlePayment('airtel')}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex flex-col items-center"
                >
                  <img src="/airtel-money-logo.png" alt="Airtel Money" className="h-12 mb-2" />
                  <span>Airtel Money</span>
                </button>
                <button
                  onClick={() => handlePayment('card')}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition flex flex-col items-center"
                >
                  <img src="/credit-card-logo.png" alt="Credit Card" className="h-12 mb-2" />
                  <span>Credit/Debit Card</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="John Doe" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => handlePayment(paymentMethod || 'mpesa')}
                  disabled={paymentComplete}
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
                >
                  {paymentComplete ? 'Processing...' : 'Complete Payment'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Payment Successful!</h3>
                    <p className="text-gray-700">
                      Thank you for signing up for {selectedPlan.name} plan. A receipt has been sent to your email.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg mb-4">
                  Thank you for signing up! Watch our quick setup video below or request a callback if you need help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Setup Video
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Request Callback
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat via WhatsApp
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We've sent a welcome email with your login details</li>
                  <li>Follow the setup wizard when you first log in</li>
                  <li>Explore available add-ons in your account dashboard</li>
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SignupModal;