import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context';
import { NavLink } from 'react-router-dom';

function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect( () => {
    if (error) {
      message(error);
    }
    clearError();
  }, [error, clearError, message] );

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch(e) {

    }
  }

  return (
    <div className="container-fluid page-comp">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 forma">

          <div className="card bg-primary">

            <div className="card-body">
              <h4 className="card-title text-center">
                Авторизация
              </h4>
              <div className="form-group">
                <label htmlFor="email" className="text">Введите Email или Логин</label>
                <input type="text" className="form-control" id="email" placeholder="Email or login" name="email" onChange={changeHandler} value={form.email} />
              </div>
              <div class="form-group">
                <label htmlFor="password">Введите пароль</label>
                <input type="password" className="form-control" id="password" placeholder="Пароль" name="password" onChange={changeHandler} value={form.password} />
              </div>
            <button className="btn btn-warning butn" disabled={loading} onClick={loginHandler}>Войти</button>
            <button className="btn btn-success" disabled={loading}><NavLink className="text-white" to='/register'>Зарегистрироваться</NavLink></button>
            </div>
            

          </div>

        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default AuthPage;