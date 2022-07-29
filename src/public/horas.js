import express from 'express'
import connection from '../../database/db.js'
import { Router } from 'express'
const router = Router()
 
let horas = express()

router.get('/reservar', (req, res)=>{
    res.render('reservarPadel',{
    horas: [
    {hora: '15:00:00'},
    {hora: '15:30:00'},
    {hora: '16:00:00'},
    {hora: '16:30:00'},
    {hora: '17:00:00'},
    {hora: '17:30:00'},
    {hora:'18:00:00'},
   
    ]
    }

    )
})


export default horas
