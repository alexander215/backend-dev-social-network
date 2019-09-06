const express = require('express');

const router = express.Router();

const Project = require('../models/project');


router.post('/create', async (req, res) => {

    try {
        const createProject = await Project(req.body);
        console.log(createProject, '<--createProject in post route');

        res.json({
            status: {
                code: 201,
                message: 'Project successfully created'
            },
            data: createProject
        })
    } catch(err){
        console.log(err);
        res.send(err);
    }
})


module.exports = router;