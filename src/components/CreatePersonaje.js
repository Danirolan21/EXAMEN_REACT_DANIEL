import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSeries = React.createRef();

    state = {
        series: [],
        status: false
    }

    preventForm = (e) => {
        e.preventDefault();

        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let idSerie = parseInt(this.selectSeries.current.value);
        let personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: idSerie
        }
        console.log(personaje);
        
        let request = "api/personajes"
        let url = Global.urlSeries + request
        axios.post(url, personaje).then(response => {
            console.log("Insertado..");
            this.setState({
                status: true
            })
        })
    }

    loadSeries = () => {
        let request = "api/series";
        let url = Global.urlSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo series..");            
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }
    
  render() {
    return (
      <div className='container'>
        {
            this.state.status &&
            (
                <Navigate to={'/personajes/' + this.selectSeries.current.value}/>
            )
        }
        <h1>Create Personaje</h1>
        <hr className='border border-primary border-3 opacity-75'/>
        <form>
            <div className='mb-3'>
                <label className='form-label'>Nombre: </label>
                <input className='form-control' type='text' ref={this.cajaNombre}/>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Imagen: </label>
                <input className='form-control' type='text' ref={this.cajaImagen}/>
            </div>
            <div className='mb-3'>
            <label className='form-label'>Serie: </label>
                <select ref={this.selectSeries} className='form-select'>
                    {
                        this.state.series &&
                        (
                            this.state.series.map((serie, index) => {
                                return (
                                    <option key={index} value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                )
                            })
                        )
                    }
                </select>
            </div>
            <button onClick={this.preventForm} className='btn btn-success w-100'>Insertar personaje</button>
        </form>
      </div>
    )
  }
}
