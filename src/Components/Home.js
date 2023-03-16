import * as React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';

export default function Home() {

    return (
        <>
            <h1>Dünyanın en güzel dişçisinin hasta listesi</h1>
            <Stack spacing={2} direction="column">
                <Link to="/Form" style={{paddingLeft: 13, textDecoration: 'none' }}><Button variant="contained">Hasta Ekle</Button></Link>

                <Link to="/Listings" style={{paddingLeft: 13, textDecoration: 'none'}}><Button variant="contained">Listeyi görüntüle</Button>  </Link>
            </Stack></>
    );
}