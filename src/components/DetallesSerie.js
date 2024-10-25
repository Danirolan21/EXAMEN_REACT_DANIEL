import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from './Global';
import axios from 'axios';
import star from './../assets/images/star.svg'

export default class DetallesSerie extends Component {

    state = {
        serie: null
    }

    loadDetalles = () => {
        let request = "api/series/" + this.props.idserie;
        let url = Global.urlSeries + request;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDetalles();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idserie !== this.props.idserie) {
            this.loadDetalles();
        }
    }
    
  render() {
    return (
      <div className='container mt-3'>
        {
            this.state.serie &&
            (
                <div className="card" style={{width: "18rem;"}}>
                    <img src={this.state.serie.imagen} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.serie.nombre}</h5>
                        <div className='d-flex align-items-center mb-3'>
                            <p className="card-text m-0 me-2"><b>Puntuación:</b> {this.state.serie.puntuacion}</p>
                            <img src={star} alt='Estrella' style={{width: "20px"}}/>
                        </div>
                        <p className='card-text'><b>Año: </b>{this.state.serie.año}</p>
                        <NavLink to={'/personajes/' + this.props.idserie} className="btn btn-primary w-100">Personajes</NavLink>
                    </div>
                </div>
            )
        }
      </div>
    )
  }
}
