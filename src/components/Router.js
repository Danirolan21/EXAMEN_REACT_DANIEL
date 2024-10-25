import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './Home'
import MenuRutas from './MenuRutas'
import DetallesSerie from './DetallesSerie'
import Serie from './Serie'
import CreatePersonaje from './CreatePersonaje'
import UpdatePersonaje from './UpdatePersonaje'

export default class Router extends Component {
  render() {
    function DetallesSerieElement() {
        let {idSerie} = useParams();
        return (<DetallesSerie idserie={idSerie}/>)
    }

    function SerieElement() {
        let {idSerie} = useParams();
        return (<Serie idserie={idSerie}/>)
    }
    return (
      <BrowserRouter>
            <MenuRutas/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<CreatePersonaje/>}/>
                <Route path='/update' element={<UpdatePersonaje/>}/>
                <Route path='/serie/:idSerie' element={<DetallesSerieElement/>}/>
                <Route path='/personajes/:idSerie' element={<SerieElement/>}/>
            </Routes>
      </BrowserRouter>
    )
  }
}
