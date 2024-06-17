import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../css/LoginForm.css'; // Asegúrate de tener este archivo CSS para los estilos personalizados

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
    }).catch(error => {
      console.error("Login failed", error);
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar"></div>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Nombre de Usuario"
              {...register('email', { required: true })}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">Email is required</div>}
          </div>
          <div className="input-container">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              {...register('password', { required: true })}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">Password is required</div>}
          </div>
          <button type="submit" className="login-button btn btn-primary w-100">Log In</button>
          <div className="forgot-password text-center mt-3">
            <a href="/forgot-password" className="text-muted">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
