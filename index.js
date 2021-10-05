const express = require("express");
const app = express();
const cors = require("cors");

//database
const pool = require("./db")

//middleware
app.use(cors())

// to get data from client server
app.use(express.json()) // req.body


//ROUTES//

//CREATE todo
app.post("/todos", async(req,res)=>{
    //await
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0])

    } catch (error) {
        console.error(error.message);
    }
})
//GET TODO
app.get("/todos", async(req, res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)   
    }
});

//GET A TODO
app.get("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1", [id]);
        res.json(todo.rows[0])

    } catch (error) {
       console.error(error.message);
    }
})
//UPDATE todo

app.put("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2", [description, id]);
        res.json("TODO WAS updated!")
    } catch (error) {
        console.error(error.message)
    }
})

//Delete Todo
app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Deleted Todo")
    } catch (error) {
        console.error(error.message)
        
    }
})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(5000, ()=>{
    console.log("server has started on port 5000")
})
