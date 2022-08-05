import express from 'express'
import { Router } from 'express';
import connection from '../../database/db.js';
import indexRoutes from './index.js'
import auth from './authentication.js';
import moment from 'moment-duration-format'

const router = Router()

router.get('/reservarPadel', (req, res) => {
   let horas= ['15:00', '15:30','16:00', '16:30', '17:00', '17:30', '18:00','18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
    if(req.session.loggedin){
     
        res.render('reservarPadel', {
          login: true, 
          name: req.session.name,
          horas: horas
    
        
        });
    
    }else{
        res.render('reservarPadel', {
            login: false,
            name:  'Mis Reservas',
            horas: horas
        })
    }
})



router.post('/reservarPadel', (req, res, next) => {

 
   
    if(req.session.loggedin){
            const login= req.session.loguedin
             const id_usuario = req.session.id_usuario
            const cancha = req.body.cancha    
            const fecha = req.body.fecha
            const  hora_inicio = parseInt(req.body.hora_inicio)
            const duracion = parseInt(req.body.duracion)
            const hora_final = hora_inicio + duracion
           
            let  estado = 0
            let arrayReservas =[]
            let reserva  = {
                
             }   

             if(cancha, fecha, hora_inicio, hora_final){
             connection.query('SELECT * FROM reserva WHERE estado=1', [cancha, fecha,hora_inicio,hora_final], async(error, results)=>{
               
               for (let i = 0; i< results.length; i++) {
                if(!(cancha.compare(cancha, results[i].id_cancha ) && results.fecha === fecha && results.hora_inicio=== hora_inicio && results.hora_final === hora_final && estado===1 )){
                   horas[i].remove
                }

               }
                
            })
        }
         
            connection.query('INSERT INTO reserva SET ?', {fecha: fecha, id_cancha: cancha,  id_usuario: id_usuario, hora_inicio: hora_inicio, duracion:duracion, hora_final: hora_final, estado: 1}, async(error, results)=>{
              
            if(error){
                console.log(error)
            }else{
                
                res.render('reservaExitosa', {
                    login: true,
                    name: req.session.name,
                    fecha: (fecha).slice(-2) + "/" + (fecha).slice(5, 7),
                    duracion: duracion,
                    hora_inicio: Math.round(hora_inicio/60),
                    minutos_inicio: ('0' + (hora_inicio % 60)).slice(-2),
                   
                });
                req.next('reservarPadel', {
                     reserva: {
                        id_usuario: id_usuario,
                        cancha: cancha,
                        fecha:fecha,
                        hora_inicio: hora_inicio,
                        hora_final: hora_final,
                        duracion: duracion, 
                        estado: estado
                     } ,  
                 

                  

            })
            }
            
            })
          
     
        
    }else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})

router.post('/reservarSquash', (req, res) => {
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
                    login: true,
                    name: req.session.name,
                    fecha: (fecha).slice(-2) + "/" + (fecha).slice(5, 7),
                    duracion: duracion,
                    hora_inicio: Math.round(hora_inicio/60),
                    minutos_inicio: ('0' + (hora_inicio % 60)).slice(-2),
                    estado: estado
            
                });
             
            }
             })
               
          
          
     
       
    }else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})


export default router
