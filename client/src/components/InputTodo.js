import React, {useState} from "react";

const InputTodo = () =>{
    
    const [description, setDescription] = useState("")

    const onSubmitForm = async e =>{
        /* THIS PREVENT REFRESH ON SUBMISSION */
        e.preventDefault();
        try {
            const body = {description}
            const response = await fetch("/todos",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"; 
        } catch (error) {
            console.error(error.message)
            
        }
    };

    return (
        <div>
            <h1 className="text-center mt-5"> PERN TODO LIST </h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text"className="form-control" value={description} 
                    onChange={ e => setDescription(e.target.value)}/>
                <button className="btn btn-success">ADD</button>
            </form>
        </div>
    );
}

export default InputTodo;