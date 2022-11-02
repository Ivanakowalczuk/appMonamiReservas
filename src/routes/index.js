import { Router } from 'express'
import connection from '../../database/db.js'
import moment from 'moment'



const router = Router()


router.get('/register', (req, res) => res.render('register'))
router.get('/login', (req, res) => res.render('login'))
router.get('/olvideContras', (req, res) => res.render('olvideContras'))
router.get('/nuevoCliente', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        res.render('nuevoCliente', {
          login: true, 
          name: req.session.name,
          id_rol: req.session.id_rol
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'misReservas'
        })
    }
})
router.get('/crearReserva', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        let horas= ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00', '14:30', '15:00', '15:30','16:00', '16:30', '17:00', '17:30', '18:00','18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00']
        res.render('crearReserva', {
         
            login: true, 
          name: req.session.name,
          id_rol: req.session.id_rol,
          horas: horas
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'misReservas'
        })
    }
})
router.get('/partials/profile', (req, res)=>{
    if(req.session.loggedin){
      res.render('partials/profile', {
        login: true,
        name: req.session.name,
        id_usuario: req.session.id_usuario,
        id_rol: req.session.id_rol
      });
    }else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas',
            
        })
    }
    
  })
  router.get('/reservaExitosa', (req, res) => {
    if(req.session.loggedin){
        res.render('reservaExitosa', {
          login: true, 
          name: req.session.name
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
            
           
 
       

})
    





router.get('/datosReservaPadel', (req, res) => {
         
        
    if(req.session.loggedin){
        res.render('datosReservarPadel', {
          login: true, 
          name: req.session.name
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
       

})
    

router.get('/misReservas',  (req, res) =>{
   const id_usuario= req.session.id_usuario
    
    if(req.session.loggedin ){
        connection.query('SELECT * FROM reserva WHERE id_usuario = ?',[id_usuario], async(error, results)=>{
            
  let cancha= results.id_cancha
            
  let estado = results.estado
    let fecha= moment(results.fecha).format('DD/MM')

  if(estado === 1){
      estado = 'Reservado'
  }else{
      estado= 'Cancelado'
  }
  
         
            res.render('misReservas', {
                
                login: true,  
                name: req.session.name,
                id_usuario: req.session.id_usuario,
               results: results,
              
                
              
            })
        })
     
    
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})


router.get('/reservarSquash', (req, res) => {
    if(req.session.loggedin){
        res.render('reservarSquash', {
          login: true, 
          name: req.session.name
        });
    
    } else{
        res.render('reservarSquash', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})




router.get('/datosReservaSquash', (req, res) => {
    if(req.session.loggedin){
        connection.query('SELECT * FROM reserva', (error, results)=>{
                    
            res.render('dashboardSquash', {
                login: true, 
                name: req.session.name,
                results: results
                
              });

        })
    
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})


router.get('/dashboardCliente', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        connection.query('SELECT id, nombre, apellido, telefono, email, DNI, id_rol, direccion FROM usuario', (error, results)=>{
                    
            res.render('dashboardCliente', {
                login: true, 
                name: req.session.name,
                results: results
                
              });

        })
      
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})



router.get('/dashboardPadel', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
     
        connection.query('SELECT reserva.id, reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
      
            res.render('dashboardPadel', {
                login: true, 
                name: req.session.name,
                results: results
                
              });

        
        })
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})



router.get('/dashboard', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
      
        connection.query('SELECT reserva.id, reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
                    
            res.render('dashboard', {
                login: true, 
                name: req.session.name,
                results:results
               
                
              });

            }) 
        
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})
router.get('/dashboardSquash', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
     
        connection.query('SELECT reserva.id, reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
      
            res.render('dashboardSquash', {
                login: true, 
                name: req.session.name,
                results: results
                
              });

        
        })
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})

router.get('/delete/:id', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){       
    const id = req.params.id
    connection.query('DELETE FROM reserva WHERE id = ?', [id], (error, results) => {
            if (error) {
                throw error
            } else {
                res.redirect('/dashboard')
            }

        })
   
    }
    })

    router.get('/deleteCliente/:id', (req, res) => {
        if(req.session.loggedin && req.session.id_rol === 1){       
        const id = req.params.id
        connection.query('DELETE FROM usuario WHERE id = ?', [id], (error, results) => {
                if (error) {
                    throw error
                } else {
                    res.redirect('/dashboardCliente')
                }
    
            })
        }
    
        })
    
        router.get('/editarCliente/:id', (req, res) => {
            if(req.session.loggedin){       
            const id = req.params.id
            connection.query('SELECT * FROM usuario WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        throw error
                    } else {
                        res.render('editarCliente',{
    
                            user: results[0],    
                           
                            })
                    }
        
                })
            }
        
            })
            router.get('/editarReserva/:id', (req, res) => {
                if(req.session.loggedin && req.session.id_rol === 1){     
                    let horas= ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00', '14:30', '15:00', '15:30','16:00', '16:30', '17:00', '17:30', '18:00','18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00']  
                const id = req.params.id
                connection.query('SELECT * FROM reserva WHERE id = ?', [id], (error, results) => {
                        if (error) {
                            throw error
                        } else {
                            res.render('editarReserva',{
    
                            reserva: results[0],    
                            horas: horas
                            })
                        }
            
                    })
                }
            
                })
export default router 