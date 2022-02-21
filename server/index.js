const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const uploadContact = require('./middlewares/uploadImage');

app.use(express.json());
//http://localhost:3001/files/contacts/1645393117654_ruan.jpg

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE');
    app.use(cors());
    next();
})

const dotenv = require("dotenv")
dotenv.config({ path: __dirname + '/.env' });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


// abrindo dados

app.get("/", (req, res) => {
    let SQL = `SELECT COUNT(*) AS id FROM contatos`
    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.json(result)
    })
})


app.get("/getContatos/:offset", (req, res) => {
    const offset = parseInt(req.params.offset)
    let SQL = "SELECT * from contatos LIMIT ?,5";
    db.query(SQL, [offset], (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
})


app.post("/addContato", uploadContact.single('image'), async (req, res) => {
    const name_image = req.file ? req.file.filename : "null.png";
    console.log("name_image", name_image)
    const { nome, email, telefone } = req.body
    let SQL = "INSERT INTO contatos ( nome, email, telefone, imagem ) VALUES ( ?, ?, ?, ? ) ";
    db.query(SQL, [nome, email, telefone, name_image], (err, response) => {
        if(err){
            return res.json({
                erro: true,
                mensagem: "Erro ao adicionar contato.",
                color: "red"
            })
        }
        return res.json({
            erro: false,
            mensagem: "Contato adicionado com sucesso.",
            color: "green"
        })
    })

})


app.put("/editContato", uploadContact.single('image'), async (req, res) => {
    var name_image = req.file ? req.file.filename : "null.png";
    const { id, nome, email, telefone, filename, semimg } = req.body; 
    console.log("semimg",semimg)
    if(semimg == "sim"){ name_image = "null.png" } 
    else if(semimg == "nao" && req.file) { name_image = req.file.filename } 
    else if(semimg == "nao" && !req.file){ name_image = filename; }

    const pathimagem = "./public/upload/contacts/" + filename
    console.log(pathimagem);
    console.log("filename:",filename)
    console.log(id, nome, email, telefone)

    let SQL = "UPDATE contatos SET nome = ?, email = ?, telefone = ?, imagem = ? WHERE id = ?";

    db.query(SQL, [nome, email, telefone, name_image, id], (err, result) => {
        if(err){
            return res.json({
                erro: true,
                mensagem: "Erro ao editar contato.",
                color: "red"
            })
        }
        else {
            if(filename != "null.png" && name_image != filename){
                fs.unlink(pathimagem, (err) => {
                    if (err) {
                    console.log('Houve algum erro!', err);
                    } else {
                    console.log('Tudo certo! Arquivo removido.');
                    }
                });
            }
        }

        return res.json({
            newImagem: name_image,
            erro: false,
            mensagem: "Contato editado com sucesso.",
            color: "green"
        })
    })
})

app.delete("/delete/:id/:filename", (req, res) => {
    const { id } = req.params;
    const pathimagem  = "./public/upload/contacts/" + req.params.filename;
    console.log(id)

    let SQL = "DELETE FROM contatos WHERE id = ?";
    db.query(SQL, [id], (err, result) => {
        if(err) {
            return res.json({
                erro: true,
                mensagem: "Erro ao deletar contato.",
                color: "red"
            })
        }
        else {
            if(req.params.filename != "null.png"){
                fs.unlink(pathimagem, (err) => {
                    if (err) {
                      console.log('Houve algum erro!', err);
                    } else {
                      console.log('Tudo certo! Arquivo removido.');
                    }
                  });
            }
            return res.json({
                erro: false,
                mensagem: "Contato removido com sucesso.",
                color: "green"
            })
        }
    })
})

const PORTA = process.env.PORT || 3001

app.listen(PORTA, function(){
    console.log("O servidor está rolando na url http://localhost:3001!")
});