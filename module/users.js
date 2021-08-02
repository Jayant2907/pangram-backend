const mysqli = require('./mysqli');
const mysqliClass = new mysqli();

class Users {
    constructor() {}

    async getUsersDetails() {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'all_users');
        return await global.mysql.query(strQuery, escape_data);
    }
    async getUser(req) {
        let mysql = {};
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'single_user');
        return await global.mysql.query(strQuery, escape_data);
    }
    async signup(req) {
        let mysql = {};
        let escape_data = [req.body.email,req.body.phone, req.body.password , req.body.isMentor];
        console.log(escape_data,"escaped data")
        let strQuery = await mysqliClass.mysqli(mysql, 'signup');
        return await global.mysql.query(strQuery, escape_data);
    }
    async signInWithEmail(req) {
        let mysql = {};
        let escape_data = [req.body.email,req.body.password];
        let strQuery = await mysqliClass.mysqli(mysql, 'signInWithEmail');
        return await global.mysql.query(strQuery, escape_data);
    }
    async add_project(req) {
        let mysql = {};
        let escape_data = [req.body.mentor_id,req.body.startDate,req.body.endDate];
        console.log(escape_data,"escaped data");
        let strQuery = await mysqliClass.mysqli(mysql, 'add_project');
        
        return await global.mysql.query(strQuery, escape_data);
    }
    async add_task(req,task,Pid) {
        let mysql = {};
        let escape_data = [task.task,task.timeline,task.developer_name,Pid];
        let strQuery = await mysqliClass.mysqli(mysql, 'add_task');
        return await global.mysql.query(strQuery, escape_data);
    }
    async add_employee(req,member,Pid) {
        let mysql = {};
        let escape_data = [Pid,member];
        let strQuery = await mysqliClass.mysqli(mysql, 'add_employee');
        return await global.mysql.query(strQuery, escape_data);
    }
    async all_projects(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'all_projects');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_project(req) {
        let mysql = {};
        let escape_data = [req.body.Pid,req.body.Pid,req.body.Pid];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_project');
        return await global.mysql.query(strQuery, escape_data);
    }

    async get_employeesofthisproject(req) {
        let mysql = {};
        let escape_data = [req.body.Pid];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_employeesofthisproject');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_projects_of_mentor(req) {
        let mysql = {};
        let escape_data = [req.body.Pid];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_projects_of_mentor');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_projects_of_employee(req) {
        let mysql = {};
        let escape_data = [req.body.Pid];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_projects_of_employee');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_employee_list(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_employee_list');
        return await global.mysql.query(strQuery, escape_data);
    }
}

module.exports = Users;