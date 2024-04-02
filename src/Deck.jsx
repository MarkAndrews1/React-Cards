import React, {useState, useEffect} from "react";
import axios from 'axios'
import Card from "./Card";

const API_URL = "https://deckofcardsapi.com/api/deck"

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [drawn, setDrawn] = useState([])

    useEffect(() => {
        async function getDeck() {
            const deck = await axios.get(`${API_URL}/new/shuffle`)
            setDeck(deck.data)
        }
        getDeck()
    }, [])

    async function drawCard(){
        try{
            const cardRes = await axios.get(`${API_URL}/${deck.deck_id}/draw`)

            if(cardRes.data.remaining === 0) alert('Empty Deck')

            const card = cardRes.data.cards[0]

            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit,
                    img: card.image
                }
            ])
        } 
        catch(e){
            alert(e)
        }
    }

    async function shuffle(){
        try{
            await axios.get(`${API_URL}/${deck.deck_id}/shuffle/`)
            setDrawn([])
        } catch(e){
            alert(e)
        }
    }

    return(
        <div>
            <div className="Deck-btns">
                <button
                className="Deck-btn-draw"
                onClick={drawCard}
                >
                    Draw
                </button>

                <button
                className="Deck-btn-shuffle"
                onClick={shuffle}
                >
                    Shuffle
                </button>
            </div>

            <div className="Deck-cards">
                {
                    drawn.map(c => (
                        <Card key={c.id} name={c.name} img={c.img} />
                    ))
                }
            </div>
        </div>
    )
}

export default Deck