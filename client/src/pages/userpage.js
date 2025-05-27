import { Button, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const RandomNumber = (min, max) => {
    const randomNumber = Math.random() * (max - min) + min;
    const resultSignal = randomNumber.toFixed(2);
    return resultSignal;
}

export const UserPage = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [play, setPlay] = useState(false);
    const [point, setPoint] = useState([]);
    const [message, setMessage] = useState('');
    const [displayed, setDisplayed] = useState([]);
    const [toDisplay, setToDisplay] = useState(false);
    const [indexPoint, setIndexPoint] = useState(0);
    const [text, setText] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch(`http://localhost:5000/api/id/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!res.ok) {
                console.log('error to fetch signals');
            } else {
                const data = await res.json();
                const newUser = {
                    id: data.id,
                    dep: data.dep,
                    stage: data.stage,
                    counter: data.counter
                }
                setUser(newUser);
                if(data.stage === 12|| data.stage === 45|| data.stage === 53|| data.stage === 78|| data.stage === 81|| data.stage === 91|| data.stage === 96|| data.stage === 100 ) {
                    setPlay(true);
                } else {
                    setPlay(false);
                };
            };
        };
        fetchdata();
    }, [])
    useEffect(() => {
        console.log('play state changed to:', play);
    }, [play]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev === user.stage ? prev  : prev + 1);
        }, 200);
        return () => clearInterval(interval);
    }, [user.stage])
    useEffect(() => {
        let timer;
        if(toDisplay && indexPoint < point.length) {
            timer = setTimeout(() => {
                setDisplayed((prev) => [...prev, point[indexPoint]]);
                setIndexPoint((prev) => prev + 1);
            }, 200)
        } else if (toDisplay && indexPoint === point.length) {
            setToDisplay(false);
        }
        return () => clearTimeout(timer);
    }, [point, indexPoint]);
    const content = {
        12: 'Loading... please wait, or don\'t. Your choice.',
        27: `Processing data block ${user.dep}. Might take a bit.`, // user.dep тут як номер блоку
        45: 'Data stream active. Behold!',
        53: 'Task finished. Good enough, right?',
        65: `System check in progress. Estimated time: ${user.dep} seconds. Don't touch anything.`,
        78: 'Running some background stuff. Nothing to see here, move along.',
        81: 'Still running. Like a hamster on a wheel.',
        89: `Access granted for module ${user.dep}. Hooray?`, // user.dep як номер модуля
        91: 'Advanced features unlocked. Try not to break anything.',
        96: 'Just checking things. All seems... fine?',
        99: `Almost there. ${user.dep}% remaining. The end is nigh!`,
        100: 'Complete! You made it. What now?'
    }
    useEffect(() => {
        if (count === user.stage) {
            const textArr = content[user.stage].split('');
            let timer;
            for (let i = 0; i < textArr.length; i++){
                timer = setTimeout(() => {
                    setText((prev) => [...prev, textArr[i]])
                }, 100 * i)
            }
            return () => clearInterval(timer);
        }
    }, [count]);
    if(!user) {
        return (
            <div> try again</div>
        )
    } 
    const handleCounter = async () => {
        const newUser = {
            id: user.id,
            dep: user.dep,
            stage: user.stage,
            counter: user.counter + 1
        }
        const res = await fetch ('http://localhost:5000/api/setid', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        const data = await res.json();
        if(res.ok) {
            setUser(data);
            setPoint([]);
            setDisplayed([]);
            setIndexPoint(0);
            if (data.counter <= 5) {
                for(let i = 0; i < 5; i++) {
                    const random = RandomNumber(0, 100);
                    setPoint((prev) => [...prev, random])
                    setToDisplay(true)
                }
            } else {
                setMessage('Out of magic. Bye')
                setToDisplay(false);
                setDisplayed([]);
            }  
        } else {
            console.log('error to fetch signals');
        }
    }
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '30px', width: '100%'}}>
            <div class='container-wrapper'>
                <div class='rotating-strip layer-1'></div>
                <div class='rotating-strip layer-2'></div>
                <div class='rotating-strip layer-3'></div>
                <div class='static-center-block'>
                    <span class='percent'>{count}%</span>
                </div>
            </div>
            {count === user.stage && <Typography sx={{color: '#0fba06', margin: '8px',
                boxShadow: '0 0 10px #00ff00',
                padding: '8px',
                backgroundColor: 'transparent', 
                color: '#00ff00',
                border: '1px solid #00ff00',
                borderRadius: '5px',
                fontFamily: 'monospace',
            }}>{text.map((el) => (<span>{el}</span>))}...</Typography>}
            {count === user.stage && play && <Button onClick={handleCounter} size="large" sx={{ 
                boxShadow: '0 0 20px #00ff00',
                margin: '8px',
                backgroundColor: 'transparent', 
                color: '#00ff00',
                border: '1px solid #00ff00',
                borderRadius: '5px',
                fontFamily: 'monospace',
                '&:hover': {
                    backgroundColor: 'rgba(0, 255, 0, 0.1)', 
                },}}>Get Points</Button>}
            {count === user.stage && play && point.length > 0 && <Typography sx={{color: '#00ff00', fontSize: '20px', margin: '8px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'              
            }}> Some point: {displayed.map((el, index) => (<Typography key={index} sx={{color: '#00ff00', margin: '8px'}}>Point {displayed.indexOf(el) +1}:  {el}</Typography>))}</Typography>}
            {count === user.stage && play && message != '' && <Typography sx={{color: 'red', margin: '8px'}}>{message}</Typography>}
        </Container>
    )
}