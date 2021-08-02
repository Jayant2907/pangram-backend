const {
    jsonResponse
} = require("./commonController");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModule = require('../module/users');
const users = new usersModule();


module.exports = {
    index: (req, res) => {
        jsonResponse(res, 'success', 'Welcome to i-Pangram')
    },

    users: async (req, res) => {
        try {
            let [results] = await Promise.all([users.getUsersDetails()])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    signup: async (req, res) => {
        try {
            console.log("called")
            let [existingUser] = await Promise.all([users.signInWithEmail(req)])
            if(existingUser!=''){
                jsonResponse(res, "User Already Exists")
            }

            else {
                const password = req.body.password;
                const confirmPassword = req.body.confirmPassword;
                if(password!==confirmPassword){
                    jsonResponse(res, "Passwords do not match")
                }
                else{
                    req.body.password = await bcrypt.hash(password,12);
                    let [results] = await Promise.all([users.signup(req)])
                    let [results1] = await Promise.all([users.signInWithEmail(req)])
      
                    const id=results1[0]?.id;
                    const token = jwt.sign({email:results1[0].email, id:results1[0].id} , "secretkey" , {expiresIn:"30d"})          
                    
                    jsonResponse(res, "User Created", {token,id})
                }
            }
        
        } catch (error) {
            console.log(error,"signup");
            jsonResponse(res, "error", error);
        };
    },
    signInWithEmail: async (req, res) => {
        try {
            let [results] = await Promise.all([users.signInWithEmail(req)])
            let check_dict= {0:false , 1 : true}
            if(req.body.isMentor === check_dict[results[0].isMentor])
            {   
               
                let sqlpassword=results[0].password;
                const isPasswordCorrect =await bcrypt.compare(req.body.password,sqlpassword)            
                if(isPasswordCorrect)
                {
                    const id=results[0].id;
                    const token = jwt.sign({email:results[0].email, id:results[0].id} , "secretkey" , {expiresIn:"30d"}) 
                    jsonResponse(res, "User signed In", {token,id})                
                }
                else
                {
                    jsonResponse(res, "Password Incorrect"); 
                }                           
            }
            else
            {
                jsonResponse(res, "Type Incorrect");
            }
               
        
        } catch (error) {
            console.log(error,'signInWithEmail')
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    add_project: async (req, res) => {
        try {
            console.log(req.body)
            let [results] = await Promise.all([users.add_project(req)])
            let tasklist=req.body.requirements
            let [results1] = await Promise.all([users.all_projects(req)])
            const Pid=results1.length
            console.log(results1.length,"results1")
            for(var i= 0; i <tasklist.length; i++) {
                let [results2] = await Promise.all([users.add_task(req,tasklist[i],Pid)])
            }
            let members=req.body.members
            for(var i= 0; i <members.length; i++) {
                let [results3] = await Promise.all([users.add_employee(req,members[i],Pid)])
            }
          
            jsonResponse(res, "Project ADDED successfully");
            
               
        
        } catch (error) {
            console.log(error,'signInWithEmail')
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    all_projects: async (req, res) => {
        try {
      
            let [results] = await Promise.all([users.all_projects(req)])
            
          
            jsonResponse(res, "Project ADDED successfully",results);
            
               
        
        } catch (error) {
            console.log(error,'signInWithEmail')
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    
    get_project: async (req, res) => {
        try {
            req.body.Pid=req.params.Pid;
            let [results] = await Promise.all([users.get_project(req)])
            // let [results1] = await Promise.all([users.get_tasklistofthisproject(req)])
            let [results2] = await Promise.all([users.get_employeesofthisproject(req)])
            
          
            jsonResponse(res, "Project ADDED successfully",{results,results2});
            
               
        
        } catch (error) {
            console.log(error,'signInWithEmail')
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    get_projects_of_mentor: async (req, res) => {
        try {
            req.body.id=req.params.id;
           
            let [results] = await Promise.all([users.get_projects_of_mentor(req)])
        
            
          
            jsonResponse(res, "Project ADDED successfully",{results,results1});
            
               
        
        } catch (error) {
            console.log(error,'signInWithEmail')
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    get_projects_of_employee: async (req, res) => {
        try {
            req.body.id=req.params.id;
           
            let [results] = await Promise.all([users.get_projects_of_employee(req)])
        
            
          
            jsonResponse(res, "Project ADDED successfully",{results,results1});
            
               
        
        } catch (error) {
            console.log(error,'get_projects_of_employee')
            jsonResponse(res, "get_projects_of_employee", error);
        };
    },
    get_employee_list: async (req, res) => {
        try {          
            let [results] = await Promise.all([users.get_employee_list(req)])

            jsonResponse(res, "Project ADDED successfully",{results,results1});
            
               
        
        } catch (error) {
            console.log(error,'get_employee_list')
            jsonResponse(res, "get_employee_list", error);
        };
    },
}