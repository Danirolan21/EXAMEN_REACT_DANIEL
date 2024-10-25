import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class UpdatePersonaje extends Component {

    selectSeries = React.createRef();
    selectPersonajes = React.createRef();
    
    state = {
        serieSeleccionada: null,
        personajeSeleccionado: null,
        series: [],
        personajes: [],
        status: false
    }

    cambiarDeSerie = (e) => {
        e.preventDefault();

        let IdSerie = this.selectSeries.current.value;
        let IdPersonaje = this.selectPersonajes.current.value;

        let request = "api/Personajes/" + IdPersonaje + "/" + IdSerie;
        let url = Global.urlSeries + request;
        axios.put(url).then(response => {
            console.log("updated");
            this.setState({
                status: true
            })
        })
    }

    loadPersonajes = () => {        
        let request = "api/personajes";
        let url = Global.urlSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo personajes..");            
            this.setState({
                personajes: response.data
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
        this.loadPersonajes();
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
        <h1>Update Personaje</h1>
        <hr className='border border-primary border-3 opacity-75'/>
        <form onSubmit={this.cambiarDeSerie}>
            <div className='mb-3'>
                <label className='form-label'>Seleccione una serie:</label>
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
            <div className='mb-3'>
                <label className='form-label'>Seleccione una Personaje:</label>
                <select ref={this.selectPersonajes} className='form-select'>
                    {
                        this.state.personajes &&
                        (
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <option key={index} value={personaje.idPersonaje}>
                                        {personaje.nombre}
                                    </option>
                                )
                            })
                        )
                    }
                </select>
            </div>
            <button className='btn btn-success w-100'>Modificar personaje</button>
        </form>
        <div className='row mt-3'>
                {
                    this.state.serieSeleccionada &&
                    (
                        <div className='col-6'>
                            <h1>{this.state.serieSeleccionada.nombre}</h1>
                            <hr class="border border-primary border-3 opacity-75"/>
                            <img src={this.state.serieSeleccionada.imagen} style={{width: "150%"}}/>
                        </div>
                    )
                }
                {
                    this.state.personajeSeleccionado &&
                    (
                        <div className='col-6'>
                            <h1>{this.state.personajeSeleccionado.nombre}</h1>
                            <hr class="border border-primary border-3 opacity-75"/>
                            <img src={this.state.personajeSeleccionado.imagen} style={{width: "150%"}}/>
                        </div>
                    )
                }
        </div>
      </div>
    )
  }
}
