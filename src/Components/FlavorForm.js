import React, { useState } from "react";
import { db } from "../utils/firebase";
import { onValue, ref, push, set } from "firebase/database";
import { Link } from 'react-router-dom';
import "../styling/Form.css";

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
        <form onSubmit={handleSubmit} className="form-container">

            <label htmlFor="hastaName">
                İsim:
                <input
                    id="hastaName"
                    name="hastaName"
                    onChange={handleNameChange}
                    type="text" />
            </label>
            <br />
            <label htmlFor="hastaPhone">
                Tel No:
                <input
                    id="hastaPhone"
                    name="hastaPhone"
                    onChange={handlePhoneChange}
                    type="number"
                />
            </label>
            <br />
            <label htmlFor="hastaNots">
                Notlar:
                <textarea
                    id="hastaNots"
                    name="hastaNots"
                    onChange={handleNotsChange}
                />
            </label>
            <br />
            <label htmlFor="bittiMi">
                Bitti Mi:
                <input
                    id="bittiMi"
                    name="bittiMi"
                    type="checkbox"
                    checked={hastaState.bittiMi}
                    onChange={handleCheckboxChange}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
            <br />
            <Link to="/hasta_listesi_web">Ana Sayfa</Link>
            <br />
            <Link to="/Listings">Listeyi görüntüle</Link>

        </form>
    );
}