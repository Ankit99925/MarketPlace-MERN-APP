import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jwtToken = params.get('jwtToken');
    const userType = params.get('userType');
    const firstName = params.get('firstName');
    const lastName = params.get('lastName');
    const profilePicture = params.get('profilePicture');
    const error = params.get('error');
    if (jwtToken) {
        // Store in localStorage
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('userType', userType);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('profilePicture', profilePicture);
    }

    if (error) {
      setStatus('failed');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (jwtToken && userType) {
        dispatch(loginSuccess({
            jwtToken,
            userType,
            firstName,
            lastName,
            profilePicture
          }));
      setStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setStatus('failed');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [dispatch, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === 'processing' && (
          <div>
            <h2 className="text-xl mb-2">Processing Google login...</h2>
            <p className="text-gray-600">Please wait while we verify your credentials</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 className="text-xl text-green-600 mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        )}

        {status === 'failed' && (
          <div>
            <h2 className="text-xl text-red-600 mb-2">Login Failed</h2>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleAuth