import {ENDPOINT} from '../config.js'

export default class CardsProvider {
    static fetchCards = async (limit =10)=>{
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}?limit=${limit}`,options)
            const json = await response.json();
            return json
        } catch (error) {
            console.log("Il y a eu une erreur")
        }
    }
    static getCards = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/${id}`, options);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log("Il y a eu une erreur");
        }
    }
}