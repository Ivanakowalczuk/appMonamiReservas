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
import router from './routes/authentication.js'
import horas from './public/horas.js'



const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views') )
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(indexRoutes)
app.use(router)
app.use(horas)

app.listen(3000)
console.log('Server is listening', 3000)


