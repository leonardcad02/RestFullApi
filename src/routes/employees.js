const express = require('express');
const mysqlconnection = require('../database');
const router = express.Router(); // objeto para definir rutas;
const mysqlConeection = require("../database");

router.get('/', (req,res) => {
    mysqlConeection.query('SELECT * FROM employee', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
});

router.get('/:id', (req,res)=>{
    const {id}= req.params;
    console.log(id);
    mysqlconnection.query('SELECT * FROM employee WHERE id = ?',[id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            console.log(err);
        }
    })
})

router.post("/", (req,res) =>{
    const {id, fullname, functionEmployee} = req.body;
    const query = `
        CALL employeeAddorEdit(?, ?, ?)
    `;
    mysqlConeection.query(query, [id, fullname, functionEmployee], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Employec Saved'})
        }else{
            console.log(err);
        }

    })

})
router.put('/:id', (req, res)=>{
    const {fullname, functionEmployee} = req.body;
    const {id} = req.params;
    const query = `
    CALL employeeAddorEdit(?, ?, ?)
    `
    mysqlconnection.query(query,[id, fullname, functionEmployee],(err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Employee update'})
        }
        else{
            console.log(err)
        }
    })
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    mysqlconnection.query('DELETE FROM employee WHERE id = ?',[id], (err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Employee update'})
        }
        else{
            console.log(err)
        }

    })
})
module.exports = router;