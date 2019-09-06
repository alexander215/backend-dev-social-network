const express = require('express');
const router = express.Router();
const Project = require('../models/project');


router.post('/create', async (req, res) => {

    try {
        const createProject = await Project.create(req.body);
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
}),

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(updatedProject, "<--updatedProject in put route")
        res.json({
            status: {
                code: 201,
                message: "Project successfully updated"
            },
            data: updatedProject
        })
    } catch(err){
        res.send(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundProject = await Project.findById(req.params.id);
        console.log(foundProject, '<--foundProject in get project by id route')
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: foundProject 
        });
    } catch(err){
        res.send(err);
    }
}),

router.get('/', async (req, res) => {
    try {
        const allProjects = await Project.find();
        console.log(allProjects, '<--allprojects in get all projects route')
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allProjects
        })
    } catch (err){
        console.log(err);
        res.send(err);
    }
})


module.exports = router;