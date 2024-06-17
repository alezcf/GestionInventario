import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../css/LoginForm.css'; // Asegúrate de tener este archivo CSS para los estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
    <div className="login-container d-flex justify-content-center align-items-center">
      <h2><FontAwesomeIcon icon={faUser} /></h2>
        <h2 className="welcome-text text-center text-primary mb-4">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              {...register('email', { required: true })}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">El correo electrónico es obligatorio</div>}
          </div>
          <div className="input-container">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">La contraseña es obligatoria</div>}
          </div>
          <button type="submit" className="login-button">Ingresar</button>
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>Registrar</button>
          <button type="button" className="recover-button" onClick={() => navigate('/recuperate')}>Recuperar contraseña</button>
        </form>
      </div>
  );
}

export default LoginForm;
