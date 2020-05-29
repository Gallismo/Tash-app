import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';
import { NavLink } from 'react-router-dom';


function CreatePage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({
    name: '', description: '', cost: '', phoneNumber: '', createdByNick: ''
  })

  const {loading, request, error, clearError} = useHttp();

  useEffect( () => {
    if (error) {
      message(error);
    }
    clearError();
  }, [error, clearError, message] );

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const createHandler = async event => {
    try {
      const data = await request('/api/product/create-product', 'POST', {...form}, {
        Authorization: `Bearer ${auth.token}`
      });
      alert(data.message + ', перейдите на страницу My Products');
    } catch (e) {}
  }
  return (
    <div className='container-fluid page-comp'>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="card bg-primary">

            <div className="card-body">
              <h4 className="card-title text-center">
                Создание товара
              </h4>
              <div className="form-group">
                <label htmlFor="name" className="text">Введите название товара</label>
                <input type="text" className="form-control" id="name" placeholder="Название" name="name" onChange={changeHandler} />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="text">Введите описание товара</label>
                <textarea type="text" className="form-control" id="description" placeholder="Описание" name="description" onChange={changeHandler}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="cost" className="text">Введите цену товара</label>
                <input type="number" className="form-control" id="cost" placeholder="Цена, руб." name="cost" onChange={changeHandler} />
              </div>
              <div className="form-group">
                <label htmlFor="createdByNick" className="text">Введите своё имя</label>
                <input type="string" className="form-control" id="createdByNick" placeholder="Имя" name="createdByNick" onChange={changeHandler} />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="text">Введите свой контактный телефон</label>
                <input type="number" className="form-control" id="phoneNumber" placeholder="Номер телефона" name="phoneNumber" onChange={changeHandler} />
              </div>
              <button className="btn btn-warning" disabled={loading} onClick={createHandler}><NavLink className="text-dark" refresh="true" to="/create">Создать</NavLink></button>

          </div>


          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default CreatePage;