import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify = () => {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email")
    const navigate = useNavigate()
    useEffect(() => {
        if (email) {
            const verifyEmail = async () => {

                try {

                    const response = await axios.post(
                        `http://localhost:8080/verification?email=${email}`
                    );

                    if (response.status === 200) {
                        setVerificationStatus('Email verified successfully!');
                    } else {
                        setVerificationStatus('Email verification failed.');
                    }
                } catch (error) {
                    console.error('Error verifying email:', error);
                    setVerificationStatus('Error verifying email.');
                }
            }
            verifyEmail()
        } else {
            navigate("/sign-up")
        }
    }, [email]);

    return (
        <div>
            <p>{verificationStatus}</p>
            <button onClick={() => console.log('Perform any custom action here')}>
                Continue
            </button>
        </div>
    );
};

export default Verify;
