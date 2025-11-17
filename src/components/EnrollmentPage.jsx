import React, { useState, useEffect } from 'react';
import { 
    Loader2, CheckCircle, AlertTriangle, ArrowLeft, CreditCard, 
    User, Mail, Phone, BookOpen, QrCode, Copy 
} from 'lucide-react';

// --- MOCK DATA (Simulates receiving course data via router state) ---
const MOCK_COURSE = {
    id: 'advanced-biology',
    title: 'Advanced Cellular Genomics',
    instructor: 'Dr. Evelyn Reed',
    duration: '16 Weeks',
    level: 'Graduate',
    price: 18500, // INR
};
const TAX_RATE = 0.18; // 18% GST

// --- Utility Functions ---

// Clipboard copy function for canvas environment
const copyToClipboard = (text) => {
    try {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        return true;
    } catch (err) {
        console.error('Copy failed:', err);
        return false;
    }
};

// Basic client-side validation
const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Full Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'A valid Email is required.';
    if (!data.phone.match(/^\+?[0-9\s-]{7,15}$/)) errors.phone = 'A valid Phone Number (7-15 digits) is required.';
    if (!data.paymentMethod) errors.paymentMethod = 'Please select a payment method.';

    return errors;
};

// ======================================
// --- UPI Instructions Component ---
// ======================================
const UpiPaymentInstructions = ({ amount }) => {
    const mockUpiId = `institute@upi`;
    const mockUpiLink = `upi://pay?pa=${mockUpiId}&pn=PEICE+Institute&am=${(amount / 100).toFixed(2)}&cu=INR`;
    const [copyStatus, setCopyStatus] = useState(false);

    const handleCopy = () => {
        if (copyToClipboard(mockUpiId)) {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        }
    };
    
    // Placeholder image for a QR code
    const qrCodeUrl = `https://placehold.co/150x150/4C51BF/FFFFFF?text=Scan+to+Pay`;

    return (
        <div className="mt-8 p-6 bg-white border border-indigo-300 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-indigo-700 flex items-center mb-4">
                <QrCode className="w-5 h-5 mr-2" />
                Complete UPI Payment
            </h3>
            <p className="text-gray-600 mb-4">
                Please scan the QR code or use the UPI ID below to transfer <span className="font-extrabold text-green-600">₹{amount.toLocaleString()}</span>.
            </p>

            <div className="flex flex-col items-center sm:flex-row sm:space-x-6">
                {/* Mock QR Code */}
                <div className="mb-4 sm:mb-0 p-3 border border-gray-200 rounded-lg shadow-inner">
                    <img
                        src={qrCodeUrl}
                        alt="UPI QR Code Placeholder"
                        className="w-36 h-36 object-contain rounded"
                    />
                </div>

                {/* UPI ID and Copy Button */}
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Institute UPI ID
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                        <input
                            type="text"
                            value={mockUpiId}
                            readOnly
                            className="flex-1 block w-full rounded-l-lg p-3 text-sm bg-gray-50 border border-gray-300 font-mono"
                        />
                        <button
                            type="button"
                            onClick={handleCopy}
                            className={`p-3 text-sm font-medium rounded-r-lg flex items-center transition duration-150 ${
                                copyStatus
                                    ? 'bg-green-500 text-white'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            <Copy className="w-4 h-4 mr-1" />
                            {copyStatus ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Clicking "Pay & Enroll" confirms you have completed the UPI transfer.
                    </p>
                </div>
            </div>
        </div>
    );
};


// ======================================
// --- Main Application Component ---
// ======================================
const App = () => {
    const course = MOCK_COURSE; 
    
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        paymentMethod: '', 
    });
    const [loading, setLoading] = useState(false);
    const [submissionState, setSubmissionState] = useState('idle'); // 'idle', 'success', 'error'
    const [errors, setErrors] = useState({});

    // Calculate dynamic pricing
    const subtotal = course.price;
    const taxAmount = Math.round(subtotal * TAX_RATE);
    const finalTotal = subtotal + taxAmount;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for the field being edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmissionState('error');
            return;
        }

        setLoading(true);
        setSubmissionState('idle');
        setErrors({});

        try {
            console.log("Submitting Enrollment Data:", { courseId: course.id, ...formData, finalTotal });
            
            // Simulate network delay for enrollment processing
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            
            setSubmissionState('success');
            
        } catch (err) {
            console.error("Enrollment failed:", err);
            setSubmissionState('error');
            setErrors({ general: 'Payment processing failed. Please check your connection or try again.' });
        } finally {
            setLoading(false);
        }
    };
    
    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 max-w-sm w-full">
                    <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                    <p className="text-center text-gray-700 font-semibold">
                        Error: Course details are missing.
                    </p>
                </div>
            </div>
        );
    }

    if (submissionState === 'success') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-center border-t-4 border-green-500">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Successful! 🎉</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for enrolling in **{course.title}**. A confirmation email will be sent shortly.
                    </p>
                    <button
                        onClick={() => setSubmissionState('idle')} 
                        className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
                    >
                        View More Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-start justify-center font-sans">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-indigo-600">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <CreditCard className="w-7 h-7 text-indigo-600 mr-3" />
                        Secure Enrollment & Payment
                    </h1>
                    <p className="mt-1 text-gray-500">Complete your details to secure your seat in the course.</p>
                </div>

                <div className="p-6 md:p-10 lg:flex lg:space-x-8">
                    
                    {/* Course Summary (Left/Top) */}
                    <div className="lg:w-1/3 p-6 bg-indigo-50 rounded-lg h-full border border-indigo-200 mb-8 lg:mb-0">
                        <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Order Summary
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-gray-700">Course Title:</span>
                                <span className="text-indigo-600 font-medium text-right">{course.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-gray-700">Instructor:</span>
                                <span>{course.instructor}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-gray-700">Course Fee:</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="pt-3 border-t border-indigo-200 flex justify-between text-sm">
                                <span className="font-semibold text-gray-700">GST ({TAX_RATE * 100}%):</span>
                                <span>₹{taxAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t-2 border-indigo-300 flex justify-between items-center">
                            <span className="text-xl font-bold text-indigo-800">Total Payment Due:</span>
                            <span className="text-3xl font-extrabold text-green-600">₹{finalTotal.toLocaleString()}</span>
                        </div>
                    </div>


                    {/* Enrollment Form (Right/Bottom) */}
                    <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>
                        
                        {/* Error Message Box */}
                        {(submissionState === 'error' || errors.general) && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-3" />
                                <div>
                                    <p className="font-bold">Submission Failed</p>
                                    <p className="text-sm">{errors.general || 'Please correct the highlighted errors below.'}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Full Name */}
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Full Name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    // Increased padding to pl-12 for better separation
                                    className={`w-full p-3 pl-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email Address */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email Address" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    // Increased padding to pl-12 for better separation
                                    className={`w-full p-3 pl-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    placeholder="Phone Number (e.g., +91 98765 43210)" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    // Increased padding to pl-12 for better separation
                                    className={`w-full p-3 pl-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-700 pt-4 border-t border-gray-200">Select Payment Option</h3>
                            
                            {/* Payment Method Selector */}
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    required
                                    // Increased padding to pl-12 for better separation
                                    className={`w-full p-3 pl-12 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="" disabled>Select a payment method...</option>
                                    <option value="card">Credit/Debit Card (Visa, Mastercard)</option>
                                    <option value="upi">UPI / GPay / PhonePe</option>
                                    <option value="netbanking">Net Banking</option>
                                    <option value="wallet">Digital Wallet</option>
                                </select>
                                {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                            </div>
                            
                            {/* --- Dynamic UPI Instructions --- */}
                            {formData.paymentMethod === 'upi' && (
                                <UpiPaymentInstructions amount={finalTotal} />
                            )}
                            
                            {/* --- Mock Card Details for other methods (optional visualization) --- */}
                            {formData.paymentMethod === 'card' && (
                                <div className="mt-8 p-6 bg-white border border-gray-300 rounded-xl">
                                    <p className="text-md font-semibold mb-3">Mock Card Entry (Not Functional)</p>
                                    <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg mb-3" />
                                    <div className="flex space-x-3">
                                        <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg" />
                                        <input type="text" placeholder="CVV" className="w-1/2 p-3 border rounded-lg" />
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full mt-8 flex items-center justify-center p-4 rounded-lg bg-indigo-600 text-white text-lg font-bold shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                        Processing Enrollment...
                                    </>
                                ) : (
                                    `Confirm Payment & Enroll`
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;