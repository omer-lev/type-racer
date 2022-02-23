import { useEffect, useState } from 'react';
import axios from 'axios';
import randomWords from 'random-words';
import { useStopwatch } from 'react-timer-hook';
import './Room.css';

const Room = ({ gameId }) => {
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [wpm, setWpm] = useState('');

    const { seconds, pause } = useStopwatch({ autoStart: true });

    useEffect(async () => {
        const config = {
            url: `${process.env.REACT_APP_API_ENDPOINT}/room/init`,
            method: 'POST',
        };

        const response = await axios(config);

        setText(txt => {
            return [...txt, ...response.data.text] 
        });
        setLoading(false);
    }, [gameId]);

    const handleInput = (e) => {
        const currentVal = e.target.value;
        const pressed = e.nativeEvent.data;
        const currentWord = document.getElementById(progress);

        if (currentVal != text[progress]) {
            currentWord.setAttribute('class', 'incorrect');
        } else {
            currentWord.setAttribute('class', 'correct');
        }

        if (pressed == " ") {
            if (currentVal.replace(" ", "") == text[progress]) {
                if (progress == text.length - 1) {
                    console.log('FINISHED');
                    pause();
                    setWpm(`WPM - ${Math.round(text.length * (60 / seconds))}`)
                }

                currentWord.setAttribute('class', 'correct');

                e.target.value = "";
                setProgress(progress+1);
            }
        };
    };


    return (
        <div className='Room'>
            {
                loading ? <h3>Loading...</h3> :

                <div className="text">
                    {
                        text.map((word, idx) => {
                            return <h3 id={idx} key={idx}>{word}</h3>
                        })
                    }
                </div>
            }

            <input type="text" onChange={(e) => {handleInput(e)}} />

            <div className="Timer">
                <h2>{seconds}</h2>
                <h1>{wpm}</h1>
            </div>
        </div>
    )
}

export default Room;