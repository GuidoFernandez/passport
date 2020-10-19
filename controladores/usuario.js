const passport =require('passport');
const Usuario =require('../modelos/Usuario');



exports.postSingup=(req, res, next)=>{
    const nuevoUsuario =new Usuario({
        email:req.body.email,
        nombre:req.body.nombre,
        password:req.body.password
    });

    Usuario.findOne({email:req.body.email},(err,usuarioExistente)=>{
        if(usuarioExistente){
            res.status(400).send('Ese usuario ya esta registrado')
        }
        nuevoUsuario.save((err)=>{
            if(err){
                next(err);
            }
            req.logIn(nuevoUsuario,(err=>{
                if(err){
                next(err)
                }

                res.send('Usuario creado con exito')
            }))
        })
    })
}

exports.postLogin=(req, res, next)=>{
    passport.authenticate('local',(err,usuario,informacion)=>{
        if(err){
            next(err);
        }
        if(!usuario){
            return res.status(400).send("Email o contraseña no validos")
        }
        req.logIn(usuario, (err)=>{
            if(err){
                next(err);
            }
            res.send('Login Exitoso')
        })
    })(req,res,next);
}

exports.logout=(req,res)=>{
    req.logout()
    res.send('Logout Exitoso');
}