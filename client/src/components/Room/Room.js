import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStopwatch } from 'react-timer-hook';
import { AiOutlineReload } from 'react-icons/ai';
import './Room.css';

var IS_REPLAY = false;

const Room = ({ gameId }) => {
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wordProgress, setWordProgress] = useState(0);
    const [wpm, setWpm] = useState('');

    const { seconds, start, pause, reset, isRunning } = useStopwatch({ autoStart: false });

    useEffect(async () => {
        const text = await fetchText();

        setText(txt => {
            return [...txt, ...text] 
        });
        setLoading(false);

        fixInput(document.getElementById('0'), true);
    }, [gameId]);


    const fetchText = async () => {
        const config = {
            url: `${process.env.REACT_APP_API_ENDPOINT}/room/init`,
            method: 'POST',
        };
        const response = await axios(config);

        return response.data.text;
    };


    const handleInput = (e) => {
        const pressed = e.nativeEvent.data;
        const currentVal = e.target.value;
        const wordDoc = document.getElementById(wordProgress);
        const wordLength = wordDoc.children.length;
        const ltrIndex = currentVal.length - 1;


        !isRunning && start();
        
        if (pressed == null && ltrIndex <= wordLength) { // BACKSPACE
            for (let i = wordLength - 1; i > ltrIndex; i--) {
                wordDoc.children[i].setAttribute('class', '');            
            }
        } 
        
        else if (pressed == " " && checkWord(currentVal)) { // SPACE
            (wordProgress == text.length - 1) && gameOver();

            setWordProgress(wordProgress+1);

            fixInput(document.getElementById(wordProgress+1)); // adjust input for next word
        } 
        
        else { // LETTERS
            if (ltrIndex <= wordLength) {
                if (pressed == wordDoc.children[ltrIndex].innerHTML) {
                    wordDoc.children[ltrIndex].setAttribute('class', 'correct');
                } else {
                    wordDoc.children[ltrIndex].setAttribute('class', 'incorrect');
                }
            }
        }
    }


    const wordSplit = (word) => {
        const spans = [];

        for (let i = 0; i < word.length; i++) {
            spans.push(<span>{word[i]}</span>);
        }

        return spans;
    };


    const checkWord = (word) => {
        const v = text[wordProgress];

        return word.substring(0, v.length) == v && word.length-1 == v.length;
    };


    const fixInput = (nextWord, init=false) => {
        const input = document.getElementById('input');
        const x = nextWord.offsetLeft;
        const y = nextWord.offsetTop;
        const w = nextWord.offsetWidth;

        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
        input.style.width = `${w}px`;
        input.value = "";
    };


    const gameOver = () => {
        pause(); // pause stopwatch

        setWpm(`WPM - ${Math.round(text.length * (60 / seconds))}`) // calc wpm
    };

    const replay = async () => {
        const input = document.getElementById('input');

        reset(0, false); // stopwatch
        
        input.value = "";
        setWordProgress(0);

        const text = await fetchText();
        setText(text);
    };
    

    return (
        <div className='Room'>
            {
                loading ? <h3>Loading...</h3> :

                <div className="text">
                    {
                        text.map((word, idx) => {
                            return <h3 id={idx} key={idx}>{wordSplit(word)}</h3>
                        })
                    }
                </div>
            }

            <input type="text" id='input' autoFocus autoComplete='off' onChange={(e) => {handleInput(e)}} />

            <div className="Timer">
                <h2>{seconds}</h2>
                <h1>{wpm}</h1>
            </div>

            <div className="replay" onClick={() => { replay() }}>
                <AiOutlineReload />
            </div>
        </div>
    )
}

export default Room;