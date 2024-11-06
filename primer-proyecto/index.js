const express = require("express");
const app = express();
const port = 3000;


app.get('/',(req, res)=>{
    console.log("hola express");
    res.send('hola mundo');
})

let num1 = 10;
let num2 = 20;

app.get('/suma',(req, res)=>{
    const resultado = parseInt(num1) + parseInt(num2)
    res.send("su resultado es: " +resultado)
})

app.get('/resta',(req, res)=>{
    const resultado = parseInt(num1) - parseInt(num2)
    res.send("su resultado es: " +resultado)
})

app.get('/multiplicacion',(req, res)=>{
    const resultado = parseInt(num1) * parseInt(num2)
    res.send("su resultado es: " +resultado)
})

app.get('/division',(req, res)=>{
    const resultado = parseInt(num1) / parseInt(num2)
    res.send("su resultado es: " +resultado)
})


const personas = [
    {id: 1, nombre: "Juan", apellido: "Benavides"},
    {id: 2, nombre: "Mario", apellido: "Benavides"},
    {id: 3, nombre: "José", apellido: "Ortiz"},
    {id: 4, nombre: "Camilo", apellido: "Muñoz"}
]



app.get('/json',(req, res)=>{
    res.send(JSON.stringify(personas));
}) 

app.get('/json/post',(req, res)=>{
    personas.push({id: 2, nombre: "Joan", apellido: "Muñoz"});
    res.send(JSON.stringify(personas));
}) 

app.get('/json/put',(req, res)=>{
    personas[1].id = 2
    personas[1].nombre = "Anuel",
    personas[1].apellido = "AA"
    res.send(JSON.stringify(personas));

}) 

app.get('/json/delete',(req, res)=>{
    personas.splice(0,1)
    res.send(JSON.stringify(personas));

}) 

app.listen(port, () =>{
    console.log("servidor está corriendo en el puerto: " +port)
})




