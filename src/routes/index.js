import { Router } from 'express'
import connection from '../../database/db.js'
import moment from 'moment'


const router = Router()


router.get('/register', (req, res) => res.render('register'))
router.get('/login', (req, res) => res.render('login'))
router.get('/olvideContras', (req, res) => res.render('olvideContras'))

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
      estado = 'Reseravado'
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
        connection.query('SELECT nombre, apellido, telefono, email, DNI, id_rol, direccion FROM usuario', (error, results)=>{
                    
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
     
        connection.query('SELECT reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
      
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
      
        connection.query('SELECT reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
                    
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
     
        connection.query('SELECT reserva.fecha, reserva.id_cancha, reserva.hora_inicio, reserva.hora_final, reserva.duracion, usuario.nombre, usuario.apellido  FROM reserva  INNER JOIN usuario ON reserva.id_usuario =  usuario.id ORDER BY reserva.fecha, reserva.hora_inicio ASC', (error, results)=>{
      
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



export default router 