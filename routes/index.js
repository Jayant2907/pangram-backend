const express = require('express');
const app = express.Router();
const api = require('../controller/api');
const formvalidator = require("../middleware/formvalidation");

app.get('/', api.index);
app.get('/users', api.users);

app.post("/signup", formvalidator, api.signup);
app.post('/login',api.signInWithEmail)
app.post('/add_project',api.add_project)
app.get('/all_projects',api.all_projects)
app.get('/get_project/:Pid',api.get_project)
app.get('/get_projects_of_mentor/:id', api.get_projects_of_mentor)
app.get('/get_projects_of_employee/:id', api.get_projects_of_employee)
app.get('/get_employee_list',api.get_employee_list)

module.exports = app