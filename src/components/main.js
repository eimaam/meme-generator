import React, { useState, useEffect } from "react";
// import image from "../Assets/delivery.jpg"
// import data from "./memesData";

export default function Main(){
    const [meme, setMeme] = useState({
        topText: "Top Text goes here",
        bottomText: "Bottom text goes here",
        image: "https://i.imgflip.com/30b1gx.jpg"
    })

    const [memesList, setMemesList] = useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemesList(data.data.memes))
    }, [])
    
    function getNextMeme(){
        const random = Math.floor(Math.random() * memesList.length)
        const url = memesList[random].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            image: url
        }))
        console.log(url)
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
            })
        )
    }

    // Clear default value on click
    function clearTopText(){
        setMeme(prevMeme => ({ 
            ...prevMeme,
            topText: ""
            })
    )
    }
    
    function clearBottomText(){
        setMeme(prevMeme => ({ 
            ...prevMeme,
            bottomText: ""
            })
    )
    }
    
    return (
        <div className="main">
            <div id="control">
                <input 
                type="text" 
                placeholder="Top Text"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
                onClick={clearTopText}
                />
                <input 
                type="text" 
                placeholder="Bottom Text"
                name="bottomText"
                value={meme.bottomText}
                onClick={clearBottomText}
                onChange={handleChange}
                />
                <div className="divButton">
                    <button onClick={getNextMeme}>
                        Generate Meme
                    </button>
                    <br />
                    <a href={meme.image} download="meme"><button>Download Meme</button></a>
                </div>
            </div>
            <div className="meme">
                <h2 className="topText Text" >{meme.topText}</h2>
                <h2 className="bottomText Text">{meme.bottomText}</h2>
                <div className="memeImage">
                    <img src={meme.image} alt="meme" />
                </div>
            </div>
        </div>
    )
}

