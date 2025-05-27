import {Button, Container, TextField, Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const handleClick = async() => {
        if (id === 'adminochka') {
            navigate('/workpage');
        } else {
            const res = await fetch(`http://localhost:5000/api/id/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            });
            if(!res.ok) {
                setMessage('WRONG ID! WRITE TO YOUR MANAGER');
            }
            else {
                const data = await res.json();
                navigate(`/userpage/${id}`);
                console.log(data);
            }
        }
    }
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '250px', height: '200px'}}>
            <TextField onChange={(e) => setId(e.target.value)} placeholder='enter your id' 
            InputProps={{
                style: {
                color: '#00ff00',
                fontFamily: 'monospace',
                textShadow: '0 0 5px #00ff00',
                },
            }}
            InputLabelProps={{
                style: {
                color: '#00ff00',
                textShadow: '0 0 5px #00ff00',
                },
                shrink: true, 
            }}
            sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid #00ff00',
                borderRadius: '5px',
                boxShadow: '0 0 10px #00ff00',
                '& .MuiInputBase-root': { 
                '& fieldset': {
                    borderColor: 'transparent !important', 
                },
                '&:hover fieldset': {
                    borderColor: '#00ff00 !important', 
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#00ff00 !important', 
                },
                } 
            }}></TextField>
            <Button onClick={handleClick} sx={{ 
                boxShadow: '0 0 20px #00ff00',
                width: '100%',
                backgroundColor: 'transparent', 
                color: '#00ff00',
                border: '1px solid #00ff00',
                borderRadius: '5px',
                fontFamily: 'monospace',
                '&:hover': {
                    backgroundColor: 'rgba(0, 255, 0, 0.1)', 
                },}}>Confirm Code</Button>
            <Typography sx={{color: 'red', textShadow: '0 0 5px #ff0000',}}>{message}</Typography>
        </Container>
    )
}

