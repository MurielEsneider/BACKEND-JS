require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json()); //para parsear JSON

const PORT = process.env.PORT||3003;
app.listen(PORT,()=>{
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

const users = []; //simula una bd
const JWT_SECRET = process.env.JWT_SECRET

app.post('/register',async(req,res)=>{
    const {username, password} = req.body;
    
    //Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {username, password: hashedPassword};
    users.push(newUser);
    
    res.status(201).json({message: 'Usuario registrado exitosamente'});
});




//////////LOGIN/////////

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = users.find(user => user.username === username);

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message: 'Credenciales incorrectas'});
    }

    //Genera token JWT
    const token = jwt.sign({ username: user.username}, process.env.JWT_SECRET,{
        expiresIn:'1h'});

    res.json({token});
});


////////PROTEGER RUTAS//////////

const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader&&authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'token requerido'});

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).json({message: 'Token inválido'});
        require.user = user;
        next();
    });
};

//////RUTA PROTEGIDA////////

 app.get('/protected', authenticateToken,(req, res)=>{
    res.json({message: 'Acceso autorizado', user: req.user});

});





