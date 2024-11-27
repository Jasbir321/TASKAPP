const today=document.querySelector(".today");
const options={weekday:'long', year:'numeric', month:'long', day:"numeric"}
const todayDate=new Date().toLocaleDateString('en-AU', options);
today.innerHTML=todayDate;


const url="http://localhost:3000/todos"

async function getTodos(){
    try{
            const options={
                method: "GET",
                headers:{
                    "Content-Type":"application/json"
                }
            }
            
            const response= await fetch(url, options);
            const todos = await response.json();

            //console.log(todos);

            todos.forEach((todo) => {
                //console.log(todo);
            
                const taskListContainer=document.querySelector(".task-list");

                const buttonDiv=document.createElement("div");
                buttonDiv.classList.add("btns");

                               
                const newTask=document.createElement("li");
                newTask.innerHTML= `
                    
                       <label>
                            <input type="checkbox" id="taskCheck" value="Mark Task Completed" 
                            onClick="checkTaskCompleted(this)">
                            <span>${todo.text}</span>
                        </label>
                   `;

                const delButton=document.createElement("button");
                delButton.innerHTML="Delete";
               
                const updateButton=document.createElement("button");
                updateButton.innerHTML="Update";
               
                const dateTimeButton=document.createElement("button");
                dateTimeButton.innerHTML="Set Date/Time";
               
                
                buttonDiv.appendChild(dateTimeButton);
                buttonDiv.appendChild(delButton);
                buttonDiv.appendChild(updateButton);
                
                newTask.appendChild(buttonDiv);

                taskListContainer.appendChild(newTask)

                delButton.addEventListener("click", function(){
                    
                   //if(confirm("The task will be deleted")){}
                        deleteTask(todo._id);

                });

                updateButton.addEventListener("click", function(){
                    updateTask(todo);

                });

                dateTimeButton.addEventListener("click",function(){
                    setTaskDateTime(todo);

                });
            
                
            });
            
    }
    catch(error){
        console.log(error);
    }
}


getTodos()

let ISUPDATING;
let todo;
const input=document.getElementById("txtInput");

input.addEventListener("change", function(event){
    event.preventDefault();
    todo=event.target.value;
    
})

const addTask = document.getElementById("addTask");

addTask.addEventListener("click", async function(){
    if(!ISUPDATING){
        newTask();
    } else{
        updateTask(newItem);
    }
});




async function newTask() {
    try{
        const option={
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                text:todo,
            }),
        };

        const task = input.value.trim();
        if (!task) {
            document.getElementById("msgText").innerHTML="Must enter the task details"
            
        } else {
            const response=await fetch(url,option);

            if (response.ok){
                //alert("tasl addedd");
                console.log("Successful");
                window.location.href="/front-end/index.html";
            } else {
                alert("failed");
                console.log("Post request failed");
            }
        }

    }
    catch(error){
        console.log(error);
    }
}


// method to delete a task

async function deleteTask(id){
const deleteURL=url+'/'+id

        try {
            const option ={
                method:"DELETE",
            };
            
            const queryTaskToDelte=await fetch(deleteURL , option);
            
            if(queryTaskToDelte.ok){
                window.location.href="/front-end/index.html";
                console.log("Task Deleted");

            }else{
                console.log("Delete Failed");
            }

        } catch (error) {
            console.log(error);
        }
}


//method to update task

async function updateTask(taskToUpdate){
    
    const { _id, text}= taskToUpdate;

    ISUPDATING =true;
    const updateURL= `http://localhost:3000/todos/${_id}`; 

//    alert(updateURL);
    
    input.value=text;

    newItem=taskToUpdate;
    
    try {
        const option ={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                text:todo
            })
        }    

        var clicked=false
        const queryTaskToUpdate=await fetch(updateURL , option);
        if(queryTaskToUpdate.ok){
            const upBtn=document.getElementById("addTask");
            upBtn.innerHTML="Update";

                document.getElementById("addTask").addEventListener("click", function(){
                window.location.href="/front-end/index.html";
            });

          
                
            console.log("Task Updated");
        }else{
            console.log("Update Failed");
        }
    
    } catch (error) {
        console.log(error);
    }
    }
    
// method to complete task


async function checkTaskCompleted(e){
    
    try {
        
        if(e.clicked){
            alert("clicked")
            }

                       
        }catch (error) {
        console.log(error);
    }
    }