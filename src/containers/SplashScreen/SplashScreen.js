import React from 'react'
import '../SplashScreen/SplashScreen.css';

export default function SplashScreen() {
    return (
        <div className="SplashScreen">
            <div className="position-relative" style={{height: '100vh'}}>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow" style={{width: '3rem', height: '3rem', animationDelay: '0.3s', animationDuration: '2s', marginRight: '30px', backgroundColor: '#ffffff'}} role="status"></div>
                        <div className="spinner-grow" style={{width: '3rem', height: '3rem', animationDelay: '0.6s', animationDuration: '2s', marginRight: '30px', backgroundColor: '#ffffff'}} role="status"></div>
                        <div className="spinner-grow" style={{width: '3rem', height: '3rem', animationDelay: '0.9s', animationDuration: '2s', backgroundColor: '#ffffff'}} role="status"></div>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                    <p className="badge rounded-pill bg-light text-dark fs-1">Salimonenko Alex ✌</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
