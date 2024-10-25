import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    
    state = {
        personajes: []
    }

    loadPersonajes = () => {
        let request = "api/Series/PersonajesSerie/" + this.props.idserie;
        let url = Global.urlSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo personajes...");            
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }
 
  render() {
    return (
      <div className='container mt-3'>
        <h1>Personajes de {this.props.idserie}</h1>
        <hr className='border border-primary border-3 opacity-75'/>
        <NavLink className='btn btn-danger w-100' to={'/serie/' + this.props.idserie}>Volver a la serie</NavLink>
        {
            this.state.personajes &&
            (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td><img src={personaje.imagen} alt='Imagen personaje' style={{width: "150px", height: "150px"}}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
      </div>
    )
  }
}
