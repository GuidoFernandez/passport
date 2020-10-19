//primer paso

const express = require('express')
const session=require('express-session')
//segundo paso
const MongoStore=require('connect-mongo')(session)

//tercer paso
const mongoose=require('mongoose');
//quinto paso
const bodyParser=require('body-parser');
const passport=require('passport');
const passportConfig=require('./config/passport')

//segundo paso
const MONGO_URL='mongodb://127.0.0.1:27017/auth';
//primer paso
const app = express();
//tercer paso
mongoose.Promise=global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(err)=>{
throw err;
process.exit(1)
})
//cuarto paso
// const Usuario = require('./modelos/Usuario');
// const u=new Usuario({
//     email:'lazo.juan@cuarto.com',
//     nombre:'Juancuatro',
//     password:'123456'
// })

// u.save().then(()=> console.log('guardado'))
// .catch((error)=>{
//     console.log(error);
// })

//primer paso
app.use(session({
secret:"secreto",
resave:true,
saveUninitialized:true,
//segundo paso
store:new MongoStore({
    url:MONGO_URL,
    autoReconnect:true
})
}))
//quinto paso.
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//primer paso
app.get('/',(req,res)=>{
    req.session.cuenta=req.session.cuenta ? req.session.cuenta + 1 : 1
    res.send(`Hola has visto la pagina: ${req.session.cuenta} `)
})

//sexto paso
const controladorUsuario=require('./controladores/usuario');
//septimo paso
app.post('/singup',controladorUsuario.postSingup);
app.post('/login',controladorUsuario.postLogin);
app.get('/logout',passportConfig.estaAutenticado,controladorUsuario.logout);
app.get('/usuarioInfo',passportConfig.estaAutenticado,(req,res)=>{
    res.json(req.user)
})

//primer paso
app.listen(3001,()=>{
    console.log('Escuchando el el puerto 3001')
})


//despues de primer caso correr la app
//ir a aplication
//la cookie viaja con el request => y notifica que el usuario ya entro en alguna vez
//borrar la cookie
//netwprk ver el header viene la data del cookie en la response
//una vez hecho el cookie va en el request
//utiliza la memoria interna, si paro el server pierdo la data

//despues del segundo paso compass
//auth
//sessions 
//verifico levantando el server si guarda una nueva (ver la data del id con como va la cuenta)

//despues del tercer paso creamos los modelos
//archivo users

//despues del cuarto paso correr el server y ver el console.log guardado.
//auth usuarios en compass

//quinto paso passport

//sexto paso controladores

//septimo paso rutas
//post desde postman http://localhost:3000/singup ir  al body xfromurl nombre email password mensaje exito y cookie

//get desde postman http://localhost:3000/usuarioinfo json con la info

//get desde postman http://localhost:3000/logout

//get desde postman http://localhost:3000/usuarioinfo mensaje de hacer login