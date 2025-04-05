import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCustomerData } from '../../../store/slices/customerSlice';
import axios from 'axios';

const PaymentResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('processing');

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('status');
        console.log('Session ID:', sessionId);

        if (!sessionId) {
            navigate('/cart');
            return;
        }

        const checkStatus = async () => {
            try {
                console.log('Checking payment status...');
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    console.error('No authentication token found');
                    setStatus('error');
                    setTimeout(() => {
                        navigate('/cart');
                    }, 2000);
                    return;
                }

                const response = await axios.get(
                    `http://localhost:3000/api/customer/check-payment-result/${sessionId}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log('Payment response:', response.data);

                if (response.data.paymentStatus === 'paid') {
                    setStatus('success');
                    await dispatch(fetchCustomerData());
                    setTimeout(() => {
                        navigate('/orders');
                    }, 2000);
                } else {
                    setStatus('failed');
                    setTimeout(() => {
                        navigate('/cart');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error);
                setStatus('error');
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            }
        };

        checkStatus();
    }, [dispatch, navigate, location]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                {status === 'processing' && (
                    <div>
                        <h2 className="text-xl mb-2">Processing your payment...</h2>
                        <p className="text-gray-600">Please wait while we confirm your order</p>
                    </div>
                )}

                {status === 'success' && (
                    <div>
                        <h2 className="text-xl text-green-600 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600">Redirecting to your orders...</p>
                    </div>
                )}

                {status === 'failed' && (
                    <div>
                        <h2 className="text-xl text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600">Redirecting to cart...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div>
                        <h2 className="text-xl text-red-600 mb-2">Something went wrong</h2>
                        <p className="text-gray-600">Redirecting to cart...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;