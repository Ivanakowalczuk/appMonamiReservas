import express from 'express'
import { Router } from 'express';
import connection from '../../database/db.js';
import indexRoutes from './index.js'
import auth from './authentication.js';
import moment from 'moment-duration-format'
const router = Router()


router.get('/reservarPadel', (req, res) => {
    if(req.session.loggedin){
     
        res.render('reservarPadel', {
          login: true, 
          name: req.session.name,
    
        
        });
    
    }else{
        res.render('reservarPadel', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})
router.post('/reservarPadel', (req, res) => {
    if(req.session.loggedin){
             const id_usuario = req.session.id_usuario
            const cancha = req.body.cancha    
            const fecha = req.body.fecha
            const  hora_inicio = parseInt(req.body.hora_inicio)
            const duracion = parseInt(req.body.duracion)
            const hora_final = hora_inicio + duracion
            let  estado = 1
            let arrayReservas =[]
            let reserva  = {
                id_usuario: id_usuario,
                cancha: cancha,
                fecha:fecha,
                hora_inicio: hora_inicio,
                hora_final: hora_final,
                duracion: duracion, 
                estado: estado
             }   

            arrayReservas.push(reserva)
            console.table(arrayReservas)
            
             console.table(reserva)
            connection.query('INSERT INTO reserva SET ?', {fecha: fecha, id_cancha: cancha,  id_usuario: id_usuario, hora_inicio: hora_inicio, duracion:duracion, hora_final: hora_final, estado: estado}, async(error, results)=>{
              
            if(error){
                console.log(error)
            }else{
                
                res.render('reservaExitosa', {
                    alert: true,
                    alertTitle:"Reserva exitosa",
                    alertMessage:"La reserva ha sido realizada con éxito FECHA: ${fecha} , HORA DE INICIO: ${hora_inicio} DURACIÓN ${duracion}",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 3500,
                    ruta: ''
            
                });
               
            }
            
            })
          
     
       
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})


export default router
