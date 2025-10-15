const auth = require("../../auth")

module.exports = function chequearAuth() {
    return function middleware(req, res, next) {
        try {
            // Decodifica y verifica token
            const decoded = auth.chequearToken.confirmarToken(req);
            req.user = decoded; // guardamos info del usuario
            next(); // todo OK, seguimos
        } catch (err) {
            return res.status(401).json({
                error: true,
                status: 401,
                body: 'Token inválido o expirado'
            });
        }
    }
}


//module.exports = function chequearAuth(){
   // function middleware(req, res, next){
 //       const id = req.body.id;
 //       auth.chequearToken.confirmarToken(req, id);
 //       next();
//    }   
//    return middleware;
//}