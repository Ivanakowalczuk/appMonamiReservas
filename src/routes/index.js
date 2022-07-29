import { Router } from 'express'

const router = Router()


router.get('/register', (req, res) => res.render('register'))
router.get('/login', (req, res) => res.render('login'))
router.get('/olvideContras', (req, res) => res.render('olvideContras'))

router.get('/misReservas', (req, res) =>{
    if(req.session.loggedin){
        res.render('misReservas', {
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
router.get('/reservarPadel', (req, res) =>{
    if(req.session.loggedin){
        res.render('reservarPadel', {
          login: true, 
          name: req.session.name
        });
    
    } else{
        res.render('reservarPadel', {
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
router.get('/datosReservaPadel', (req, res) => {
    if(req.session.loggedin){
        res.render('datosReservaPadel', {
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
router.get('/datosReservaSquash', (req, res) => {
    if(req.session.loggedin){
        res.render('datosReservasSquash', {
          login: true, 
          name: req.session.name,
        
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Mis Reservas'
        })
    }
})
router.get('/dashboardPadel', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        res.render('dashboardPadel', {
          login: true, 
          name: req.session.name,
          
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})
router.get('/dashboardCliente', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        res.render('dashboardCliente', {
          login: true, 
          name: req.session.name,
          
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})
router.get('/dashboard', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        res.render('dashboard', {
          login: true, 
          name: req.session.name,
          
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})
router.get('/dashboardSquash', (req, res) => {
    if(req.session.loggedin && req.session.id_rol === 1){
        res.render('dashboardSquash', {
          login: true, 
          name: req.session.name,
          ruta: 'dashboardPadel'
        });
    
    } else{
        res.render('login', {
            login: false,
            name:  'Usted no es un administrador'
        })
    }
})



export default router 