import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logoPage from './../assets/images/Stranger Things.png'
import axios from 'axios'
import Global from './Global'

export default class MenuRutas extends Component {

    state = {
        series: []
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
      <div>
        <nav className="navbar navbar-expand-sm bg-info">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'><img src={logoPage} alt='logo' style={{ width: "100px", height: "50px" }}/></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to='/create'>Nuevo Personaje</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to='/update'>Modificar personajes</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Series
                    </a>
                    <ul className="dropdown-menu">
                        {
                            this.state.series.map((serie, index) => {
                                return (
                                    <li key={index}><NavLink className="dropdown-item" to={'/serie/' + serie.idSerie} >{serie.nombre}</NavLink></li>
                                )
                            })
                        }
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      </div>
    )
  }
}
