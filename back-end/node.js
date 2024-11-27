const express=require("express");
const cors=require("cors");
const mongose=require("mongoose");

const app=express();

app
.use(express.json())
.use(express.urlencoded({extended: true}))
.use(cors("*"));


const todoModel=require("./model/Todo");

const connectionString= "mongodb+srv://admin:qESPpr7YrvvjtYZz@2gee.81eky.mongodb.net/database"
mongose.connect(connectionString)
    .then(() => {
        console.log('Connected to server');
        app.listen(3000, function(){
            console.log("Server Running at Port 3000");
        });
    })
    .catch((err) => console.log(err));




    app.get("/todos", async (req, res) => {
               
      try{
        const response= await todoModel.find({});
      
        console.log(response);
        
       res.json(response)
        
      }
      catch(err)
      {
        console.log(err);
      }
    });

    app.post("/todos", async (req, res) => {
      
      try{
        

        console.log(req.body);
        
        const todo=req.body;
        
        const newTask=await todoModel.create(todo);

        res.send("working")
       
        
      }
      catch(err)
      {
        console.log(err);
      }
    });

    //delete task method

    app.delete("/todos/:id", async(req,res) => {

      try{

        let id =req.params.id;
        const delTask = await todoModel.deleteOne({
          _id:id
        });

        res.status(200).send("Task Deleted");
      }

      catch(err){
        res.status(500).send("Server Error");
        console.log(err);
      }
    })

    
    //update task

    app.put("/todos/:id", async(req,res) => {

      try{

        let id =req.params.id;
        const {text} = req.body;
        
        const updateOptions = {text:text};
        const updateTask= await todoModel.findByIdAndUpdate(id, updateOptions);
          

        res.status(200).send("Task Updated");
      }

      catch(err){
        res.status(500).send("Server Error");
        console.log(err);
      }
    })