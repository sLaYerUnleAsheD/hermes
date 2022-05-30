import React from 'react'
import backgroundVid from '../videos/background.mp4'
const Background = () => {
    return (
        <div>
            <video autoPlay muted loop className="myVideo">
                <source src={backgroundVid} type="video/mp4" />
            </video>
        </div>
    )
}
export default Background;
