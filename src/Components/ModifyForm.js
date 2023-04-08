import React, { useState, useContext } from "react";
import { db } from "../utils/firebase";
import { onValue, ref, push, set, update } from "firebase/database";
import { Link } from 'react-router-dom';
import "../styling/Form.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { UserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';

export default function ModifyForm() {
    const navigate = useNavigate();
    const { userKey, setUserKey } = useContext(UserContext);
    const [hastaState, setHastaState] = useState({
        isim: '',
        phone: '',
        not: '',
        bittiMi: false
    });
    React.useEffect(() => {
        // Get a reference to the database
        const query = ref(db, "hastalar/" + userKey);
        const dataq = onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                console.log(data);
                setHastaState(data);
            }
        });
    }, []);
    console.log(userKey);
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
        const query = ref(db, "hastalar/" + userKey);
        update(query, hastaState);
        navigate('/Listings', { replace: false });
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
                    type="text"
                    value={hastaState.isim}
                />

            </label>
            <br />
            <label htmlFor="hastaPhone">
                Tel No:
                <input
                    id="hastaPhone"
                    name="hastaPhone"
                    onChange={handlePhoneChange}
                    type="text"
                    value={hastaState.phone}
                />
            </label>
            <br />
            <label htmlFor="hastaNots">
                Notlar:
                <textarea
                    id="hastaNots"
                    name="hastaNots"
                    onChange={handleNotsChange}
                    value={hastaState.not}
                />
            </label>
            <br />
            <label htmlFor="bittiMi">
                Bitti Mi:
                <input
                    id="bittiMi"
                    name="bittiMi"
                    type="checkbox"
                    value={hastaState.bittiMi}
                    checked={hastaState.bittiMi}
                    onChange={handleCheckboxChange}
                    style={{
                        color: "primary",
                        marginLeft: '10px',
                        verticalAlign: 'middle',
                        appearance: 'checkbox',
                        WebkitAppearance: 'checkbox',
                        MozAppearance: 'checkbox',
                        msAppearance: 'checkbox',
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        outline: 'none',
                        border: '1px solid rgba(0,0,0,0.2)',
                        boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                        background: hastaState.bittiMi ? 'blue' : 'pink'
                    }}
                />
            </label>
            <br />
            <Button type="submit" variant="contained">Hasta Güncelle</Button>
            <br />
            <Stack spacing={2} direction="column">
                <Link to="/hasta_listesi_web" style={{ textDecoration: 'none' }}><Button variant="contained">Ana Ekran</Button></Link>

                <Link to="/Listings" style={{ textDecoration: 'none' }}><Button variant="contained">Listeyi görüntüle</Button>  </Link>
            </Stack>
        </form >
    );
}