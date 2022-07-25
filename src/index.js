import express from 'express'
import jquery from 'jquery-datepicker'
import{dirname, join} from 'path'
import {fileURLToPath} from 'url'
import indexRoutes from './routes/index.js'
import dotenv from 'dotenv'
import bcryptjs from 'bcryptjs'
import  session from 'express-session'
import db from '../database/db.js'
import connection from '../database/db.js'



const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.listen(3000)
app.set('views', join(__dirname, 'views') )
app.set('view engine', 'ejs')
app.use(indexRoutes)
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


app.post('/register', async(req, res)=>{
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

app.post('login', async(req, res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHash  = await bcryptjs.hash(pass, 8);
    if(email && pass){
        connection.query('SELECT * FROM usuario WHERE email = ?', [email], async(error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
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
                req.session.name = results[0].name
                res.render('login', {
                    alert: true,
                    alertTitle:"Logueado",
                    alertMessage:"Ya puede ver sus reservas",
                    alertIcon: 'succes',
                    showConfirmButton: false,
                    timer: 3500,
                    ruta: 'misReservas'
            
                }
                );

            }
    })

    }
})

console.log('Server is listening', 3000)


