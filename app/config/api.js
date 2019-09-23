import axios from "axios";

//insert your Twitch API key into this variable for the project to works
let API_KEY = "1x4xm1iryitmxjbhjbsdp52rvxs715";
let api = axios.create({
    headers: {
        "Client-ID": API_KEY
    }
});

export default api;
