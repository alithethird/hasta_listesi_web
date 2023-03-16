import React, { useState } from "react";
import { db } from "../utils/firebase";
import { onValue, ref, push, set } from "firebase/database";
import { Link } from 'react-router-dom';

export default function FlavorForm() {
    const [hastaState, setHastaState] = useState({
        isim: '',
        phone: '',
        not: '',
        bittiMi: false
    });
    const handleCheckboxChange = (event) => {
        setHastaState({
            ...hastaState,
            bittiMi: event.target.checked
        });
    }

    const handleNameChange = (event) => {
        console.log("name: ", event.target.value);
        setHastaState({
            ...hastaState,
            isim: event.target.value
        });
    }

    const handlePhoneChange = (event) => {
        console.log("phone: ", event.target.value);
        setHastaState({
            ...hastaState,
            phone: event.target.value
        });
    }

    const handleNotsChange = (event) => {
        console.log("nots: ", event.target.value);
        setHastaState({
            ...hastaState,
            not: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get a reference to the database
        const query = ref(db, "hastalar");
        const data = onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                Object.values(data).map((project) => {
                    console.log("project: ", project);
                });
            }
        });
        console.log("data: ", data);
        const pusher = push(query);
        set(pusher, hastaState);
        // Upload the state to the database
    }

    // If she want to add selecting from a list
    // <label>
    //     Pick your favorite flavor:
    //     <select value={this.state.value} onChange={this.handleChange}>
    //         <option value="grapefruit">Grapefruit</option>
    //         <option value="lime">Lime</option>
    //         <option value="coconut">Coconut</option>
    //         <option value="mango">Mango</option>
    //     </select>
    // </label>
    return (
        <form onSubmit={handleSubmit}>

            <label>
                İsim:
                <input
                    name="hastaName"
                    onChange={handleNameChange} />
            </label>
            <br></br>
            <label>
                Tel No:
                <input
                    name="hastaPhone"
                    type="number"
                    onChange={handlePhoneChange} />
            </label>
            <br></br>
            <label>
                Notlar:
                <input
                    name="hastaNots"
                    onChange={handleNotsChange} />
            </label>
            <br></br>
            <label>
                Bitti Mi:
                <input
                    name="bittiMi"
                    type="checkbox"
                    checked={hastaState.bittiMi}
                    onChange={handleCheckboxChange} />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
            <br></br>
            <Link to="/hasta_listesi_web">Home</Link>

        </form>
    );
}