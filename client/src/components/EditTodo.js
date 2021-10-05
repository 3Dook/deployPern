import React, {useState} from "react";


const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description)

    // EDITING IN MODAL FUNCTION
    const updateDescription = async (e) => {
        e.preventDefault();

        try {
            const body = {description};

            // Use a proxy to make sure we are using the right routes 

            const response = await fetch(`/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })     

            window.location = "/"
        } catch (error) {
            console.error(error.message);
            
        }
    }
    return (
        <div>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                EDIT
            </button>


            <div class="modal" id={`id${todo.todo_id}`}
                /* THIS IS TO RESET THE MODAL DATA IF WE CLICK OUT */
                onClick={() => setDescription(todo.description)}
            >
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">EDIT Todo</h4>
                    <button type="button" class="close" data-dismiss="modal"
                    /* THIS IS TO RESET THE MODAL DATA IF WE CLICK OUT */
                    onClick={() => setDescription(todo.description)}
                    >&times;</button>
                </div>

                <div class="modal-body">
                    <input type='text' className="form-control" value={description} onChange={
                        e => setDescription(e.target.value)
                    }/>
                </div>
                <div class="modal-footer" >
                    <button type="button" class="btn btn-success" data-dismiss="modal" onClick= {e => updateDescription(e)}>Save</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                    /* THIS IS TO RESET THE MODAL DATA IF WE CLICK OUT */
                    onClick={() => setDescription(todo.description)}
                    >Close</button>
                </div>

                </div>
            </div>
            </div>
        </div>
    )
}

export default EditTodo;