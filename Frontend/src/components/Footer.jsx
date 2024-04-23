import React from "react";
import '../css/Footer.css';
import fb from '../assets/facebook.png'
import linkedin from '../assets/linkedin.png'
import instagram from '../assets/instagram.png'
import github from '../assets/github.png'

const Footer=()=>{
    return(
        <div className="footer">
            <div className="sb__footer section_padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div">
                        <h4>Социални мрежи:</h4>
                        <div className="socialmedia">
                            <a href="https://www.facebook.com/profile.php?id=61557892487944"><p><img src={fb} alt="facebook" /></p></a>
                            <a href="https://www.linkedin.com/in/taylyan/"><p><img src={linkedin} alt="" /></p></a>
                            <a href="https://www.instagram.com"> <p><img src={instagram} alt="" /></p></a>
                            <a href="https://github.com/taylyan"><p><img src={github} alt="" /></p>  </a>

                        </div>
                    </div>
                </div>
                <hr></hr>

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear()} TaylanSecurity™. Всички права запазени.
                        </p>
                    </div>
                    {/* 
                    <div className="sb__footer-below-links">
                        <div><p>Правила & условия</p></div>
                        <div><p>Поверителност</p></div>
                        <div><p>Сигурност</p></div>
                        <div><p>Декларация за бисквитки</p></div>

                    </div>
                    */}
                </div>
            </div>
        </div>
    )
}
export default Footer