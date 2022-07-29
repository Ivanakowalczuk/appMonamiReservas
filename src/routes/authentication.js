import express from 'express'
import  session from 'express-session'
import{dirname, join} from 'path'
import { Router } from 'express'
import connection from '../../database/db.js'
import bcryptjs from 'bcryptjs'
import indexRoutes from '../routes/index.js'
const router = Router()
 

router.post('/register', async(req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const tel = req.body.tel;
    const email = req.body.email;
    const pass = req.body.pass;
    const id_rol = req.body.id_rol;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO usuario SET ?', {nombre: nombre, apellido: apellido, DNI:dni, telefono: tel, email: email, contraseña: passwordHash, id_rol: id_rol}, async(error, results)=>{
if(error){
    if(error.sqlMessage == "Duplicate entry 'ivanakowalczuk@gmail.com' for key 'email'"){
      console.log("El usuario ya existe, pruebe con otro email")
      res.render('register',{
        alert: true,
        alertTitle:"Usuario existente",
        alertMessage:"Este email ya está registrado",
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 5000,
        ruta: 'register'
      })
    }
    console.log(error)
}else{
    res.render('register', {
        alert: true,
        alertTitle:"Registro de usuario",
        alertMessage:"Registro exitoso",
        alertIcon: 'succes',
        showConfirmButton: false,
        timer: 3500,
        ruta: '/'

    })
   }

    })

})

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHaash  = await bcryptjs.hash(pass, 8);
    if(email && pass){
        connection.query('SELECT * FROM usuario WHERE email = ?', [email], async(error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].contraseña))){
            res.render('login', {
                alert: true,
                alertTitle:"Incorreto",
                alertMessage:"Usuario o contraseña  incorrecto",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 3500,
                ruta: 'login'
        
            }
               
            );
            }else{
                req.session.loggedin = true;
                req.session.name = results[0].nombre
                req.session.id_rol = results[0].id_rol
                if(req.session.id_rol === 1){
                    res.render('login', {
                        alert: true,
                        alertTitle:"Logueado",
                        alertMessage:"Ya puede ver las reservas realizadas",
                        alertIcon: 'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'dashboard'
                
                    }
                    );
                }else{
                    res.render('login', {
                        alert: true,
                        alertTitle:"Logueado",
                        alertMessage:"Ya puede ver sus reservas",
                        alertIcon: 'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'misReservas'
                
                    }
                    );
                }
               

            }
    })

    }else{
        res.render('login', {
            alert: true,
            alertTitle:"Ingrese usuario y contraseña",
            alertMessage:"",
            alertIcon: 'error',
            showConfirmButton: false,
            timer: 3500,
            ruta: 'login'
    
        });
    }
})

router.get('/', (req, res)=>{
    if(req.session.loggedin){
      res.render('index', {
        login: true, 
        name: req.session.name,
        id_rol: req.session.id_rol
      });
  
  } else{
      res.render('index', {
          login: false,
          name:  'Mis Reservas',
          id_rol: req.session.id_rol
      })
  }
  
  })

  router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
  })
  export default router 