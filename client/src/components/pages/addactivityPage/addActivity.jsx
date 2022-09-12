import React from "react";
import { useParams } from "react-router-dom";
import './addActivity.css'


function AddActivity() {
    let {id} = useParams()
    return (
        <div className="AddActContainer" >
            {
                (id === 'unknow')?(
                    <h1>Unknow</h1>
                ): (
                    <h1>{id}</h1>
                )
            }
        </div>
    )
}


export default AddActivity