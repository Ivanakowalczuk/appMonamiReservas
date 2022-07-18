import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.render('index'))
router.get('/login', (req, res) => res.render('login'))
router.get('/misReservas', (req, res) => res.render('misReservas'))
router.get('/olvideContras', (req, res) => res.render('olvideContras'))
router.get('/register', (req, res) => res.render('register'))
router.get('/reservaExitosa', (req, res) => res.render('reservaExitosa'))
router.get('/reservarPadel', (req, res) => res.render('reservarPadel'))
router.get('/reservarSquash', (req, res) => res.render('reservarSquash'))
router.get('/dashboard', (req, res) => res.render('dashboard'))
router.get('/dashboardSquash', (req, res) => res.render('dashboardSquash'))
router.get('/dashboardPadel', (req, res) => res.render('dashboardPadel'))

export default router 