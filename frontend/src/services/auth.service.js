import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('auth/login', {
      email,
      password,
    });
    const { status, data } = response;
    if (status === 200) {
      const { email, roles } = await jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify({ email, roles }));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.accessToken}`;
      return status;
    }
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('Usuario o contraseña incorrectos');
      } else if (status === 401) {
        throw new Error('No autorizado');
      } else if (status === 500) {
        throw new Error('Error del servidor');
      } else {
        throw new Error('Error desconocido');
      }
    } else {
      throw new Error('Error de red');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
