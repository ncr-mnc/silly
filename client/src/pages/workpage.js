import { Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"

export const WorkPage = () => {
    const [id, setId] = useState(null);
    const [dep, setDep] = useState(null);
    const [stage, setStage] = useState(null);
    const [message, setMessage] = useState('');
    const handleClick = async() => {
        const user = {
            id,
            dep,
            stage,
            counter: 1
        };
        const res = await fetch('http://localhost:5000/api/setid', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        console.log('data:', data)
        if(res.ok) {
            setMessage('User updated')
        } else {
            setMessage('pu pu pu... something went wrong');
            console.log('error:', data.error);
        }
    }

    return (
        <Container sx={{backgroundColor: 'lightgreen', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '300px', borderRadius: '16px', padding: '16px'}}>
            <TextField onChange={(e) => setId(e.target.value)} placeholder='ID'></TextField>
            <TextField onChange={(e) => setDep(e.target.value)}placeholder='DEP'></TextField>
            <TextField onChange={(e) => setStage(e.target.value)} placeholder='%%%%'></TextField>
            <Button onClick={handleClick} sx={{backgroundColor: 'darkgreen'}}>Confirm</Button>

            <Typography>{message}</Typography>
            <Typography> stage 1: 12, 45, 53, 78, 81, 91, 96, 100</Typography>
            <Typography> stage 2: 27, 65, 89, 99</Typography>
        </Container>
    )
}