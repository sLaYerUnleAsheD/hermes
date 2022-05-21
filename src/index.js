import React from "react"
import  ReactDOM  from "react-dom/client"
import "./style.css"
import App from "./App.js"
import 'font-awesome/css/font-awesome.min.css';

if (document.querySelector(".navbar") == document.activeElement) {
    document.querySelector(".navbar").class += "absolute"
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />)