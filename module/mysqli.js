module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['all_users'] = 'SELECT * FROM users';
mysqliq['single_user'] = 'SELECT * FROM users WHERE id = ?'
mysqliq['signup'] = 'INSERT INTO users(email,phone,password,type) VALUES(?,?,?,?)'
mysqliq['signInWithEmail'] = 'SELECT * from users WHERE email=? ';
mysqliq['all_projects'] = 'SELECT * from project  ';

mysqliq['add_project'] = 'INSERT INTO project(mentor_id,startDate,endDate) values(?,?,?)';
mysqliq['add_task'] = 'INSERT INTO tasklist(task,timeline,developer_name,Pid) values(?,?,?,?) ';
mysqliq['add_employee'] = 'Insert into employee_project(Pid,Eid) values(?,?)'
mysqliq['get_project']='SELECT project.*,tasklist.* from project INNER JOIN tasklist ON project.id = tasklist.Pid WHERE project.id=?  '

mysqliq['get_employeesofthisproject']='SELECT Eid from employee_project WHERE Pid=?'
mysqliq['get_projects_of_mentor']='SELECT * from project WHERE mentor_id=?'
mysqliq['get_projects_of_employee']='SELECT project.* from employee_project INNER JOIN project ON employee_project.Pid=project.id WHERE employee_project.Eid=?'
mysqliq['get_employee_list']="SELECT * from users WHERE type='0'"

