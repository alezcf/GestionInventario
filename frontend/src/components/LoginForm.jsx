import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              {...register('email', { required: true })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">Email is required</span>}
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              {...register('password', { required: true })}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">Password is required</span>}
          </div>
          <button type="submit">Login</button>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
