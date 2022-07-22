
CREATE DATABASE monamiClub;
USE monamiClub;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `monamiClub`

-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(6) NOT NULL auto_increment PRIMARY KEY,
  `fecha` DATE NOT NULL,
  `id_cancha` varchar(2) NOT NULL,
  `id_usuario` int(5) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
   `hora_inicio` time NOT NULL,
   `hora_final` time NOT NULL,
   `duracion` int(3) NOT NULL, 
  `estado` int(1) NOT NULL DEFAULT 0,
   `key` varchar(25) NOT NULL unique
 
  
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  
  


-- Estructura de tabla para la tabla `rol`


CREATE TABLE `rol` (
  `id` int(1) NOT NULL PRIMARY KEY ,
  `tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `rol` (`id`, `tipo`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- Estructura de tabla para la tabla `deporte`--

CREATE TABLE `deporte` (
  `id` varchar(1) NOT NULL PRIMARY KEY, 
  `tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcado de datos para la tabla `deporte`
--
INSERT INTO `deporte` (`id`, `tipo`) VALUES
('s', 'squash'),
('p', 'padel');

--
-- Estructura de tabla para la tabla `cancha`
--

CREATE TABLE `cancha` (
  `id` varchar(2) NOT NULL PRIMARY KEY ,
  `id_deporte` varchar(5) NOT NULL,
  `numero` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcado de datos para la tabla `cancha`
--

INSERT INTO `cancha` (`id`, `id_deporte`, `numero`) VALUES
('s1', 's', '1'),
('s2', 's', '2'),
('s3', 's', '3'),
('p1', 'p', '1'),
('p2', 'p', '2');


--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(5) NOT NULL auto_increment PRIMARY KEY,
  `nombre` varchar(41) NOT NULL,
  `apellido` varchar(41) NOT NULL,
  `DNI` varchar(41) NOT NULL,
  `direccion` varchar(41),
  `telefono` varchar(41) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  `id_rol` int(1) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`,`DNI`, `direccion` , `telefono`, `email`, `contraseña`, `id_rol`, `fecha_creacion`) VALUES
('1', 'Paola', 'Kowalczuk', '333333333', 'Enrique Larreta 670', '111111111','pkowalczuk@gmail.com', 'monami', 1, ''),
('2', 'Ivana', 'Kowalczuk', '29714050', 'Los robles 47', '3515491078','ivanakowalczuk@gmail.com', 'kowal', '2', '');



 

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`

  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`) USING BTREE;


--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_fk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `reserva_fk_2` FOREIGN KEY (`id_cancha`) REFERENCES `cancha` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_fk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);
  
  ALTER TABLE `cancha`
  ADD CONSTRAINT `cancha_fk_1` FOREIGN KEY (`id_deporte`) REFERENCES `deporte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
