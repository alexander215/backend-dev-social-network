const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');


router.post('/create', async (req, res) => {

    try {
        const user = await User.findById(req.body.user._id)
        const newProject = {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            created_by: req.body.user._id
        }
        const createProject = await Project.create(newProject);
        // console.log(createProject, '<--createProject in post route');
        user.projects.push(createProject._id)
        user.save()
        res.json({
            status: {
                code: 201,
                message: 'Project successfully created'
            },
            data: {
                newProject: createProject,
                updatedUser: user
            }  
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
}),

router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndRemove(req.params.id);
        console.log(deletedProject, "<--deletedProject in delete by id route")
        res.json({
            status: {
                code: 200,
                message: "Project successfully deleted"
            },
            data: deletedProject
        })
    } catch(err){
        res.send(err);
    }
});

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