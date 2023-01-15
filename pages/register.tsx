import { useState, useRef, useEffect } from 'react';
import { AlertMsg as Alert } from '@utility/Alert';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
  const router = useRouter();
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  // regex expressions

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <div className="card max-w-md mx-auto p-5 md:my-4">
          <h1 className="text-2xl text-center">Registration</h1>
          {error && <Alert type="alert-error" message={message} />}
          {success && <Alert type="alert-success" message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                ref={userRef}
                name="name"
                type="text"
                id="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                ref={emailRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${error && 'border-b-red-500'}`}
                ref={passwordRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                className="form-control"
                ref={password2Ref}
              />
            </div>
            <div className="form-group">
              <div className="flex items-center justify-between">
                <button className="btn">Submit</button>
                <Link href="/auth/login">
                  have an account Already?{' '}
                  <span className="text-blue-500">Login</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
