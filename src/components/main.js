import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
// import image from "../Assets/delivery.jpg"

export default function Main(props){
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        image: "http://i.imgflip.com/1bij.jpg"
    })
    
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
            })
        )
    }

    const [memesList, setMemesList] = useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
                .then(data => setMemesList(data.data.memes))
                    .catch(error => {
                        console.log(error)
                    })
    }, [])
    
    function getNextMeme(){
        const random = Math.floor(Math.random() * memesList.length)
        const url = memesList[random].url;
        setMeme(prevMemeList => ({
            ...prevMemeList,
            image: url
        }))
    }
    
    return (
        <div className="main">
            <form>
                <input 
                type="text" 
                placeholder="Top Text"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
                />
                <input 
                type="text" 
                placeholder="Bottom Text"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                />
                <br />
                <div className="divButton">
                    <button onClick={getNextMeme}>{props.label}</button>
                </div>
            </form>
            <h2 className="topText">{meme.topText}</h2>
            <h2 className="bottomText">{meme.bottomText}</h2>
            <div className="memeImage">
                <img src={meme.image} alt="test"/>
            </div>
        </div>
    )
}
