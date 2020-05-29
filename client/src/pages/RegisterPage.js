import React, {useState, useEffect} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook'
import { NavLink } from 'react-router-dom';

function RegisterPage() {
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', nick: '', password: ''
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

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
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
                <label htmlFor="email" className="text">Введите Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" name="email" onChange={changeHandler} value={form.email} />
              </div>
              <div className="form-group">
                <label htmlFor="nick" className="text">Введите логин</label>
                <input type="text" className="form-control" id="nick" placeholder="Логин" name="nick" onChange={changeHandler} value={form.nick} />
              </div>
              <div class="form-group">
                <label htmlFor="password">Введите пароль</label>
                <input type="password" className="form-control" id="password" placeholder="Пароль" name="password" onChange={changeHandler} value={form.password} />
              </div>
            <button className="btn btn-success" onClick={registerHandler} disabled={loading}><NavLink className="text-white" to="/auth">Зарегистрироваться</NavLink></button>
            </div>
            

          </div>

        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default RegisterPage;