import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

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
                        `http://localhost:8080/api/v1/verification?email=${email}`
                    );

                    if (response.status === 200) {
                        setVerificationStatus('Email verified successfully!');
                    } else {
                        setVerificationStatus('Email verification failed.');
                    }
                } catch (error) {
                    // console.error('Error verifying email:', error);
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

            <div className="flex items-center justify-center h-screen">
                <div className="p-2 rounded shadow-lg border" style={{ marginBottom: "200px", minHeight: "350px", minWidth: "350px" }}>
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-xl font-bold">{verificationStatus}</h1>
                        <p className='text-sm'>please login</p>
                        <Link
                            to="/sign in" // Replace with the actual link
                            className="inline-flex items-center px-4 py-2 text-white bg-black border rounded-sm  focus:outline-none focus:ring">

                            <span className="text-sm font-medium">
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;
