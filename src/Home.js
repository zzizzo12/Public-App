import React from 'react';
import "./Home.css";
import backlogo from './logos/amazon_log.jpg';
import prd1 from './logos/livre_couverture1.jpg';
import prd2 from './logos/airpods.jpeg';
import prd3 from './logos/telecommande.jpeg';
import prd4 from './logos/smartTv.jpeg';
import prd5 from './logos/razoir.jpeg';
import prd6 from './logos/pcGamer.jpeg';
import Produit from './Produit';

const Home = () => {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_back" src={backlogo} alt="" />
                <div className="home_ligne">
                    <Produit id="154251625" description='livre pour vous initier a la data science, les sciences de demains sont devenu celle de maintenant' image={prd1} prix={10.95} note={5}/>
                    <Produit id="26367536" description='Wireless Earbuds Bluetooth 5.0 Headphones with 24H Fast Charging Case Noise Cancelling 3D Stereo Headphonesfor Airpods/iPhone/Android' image={prd2} prix={39.99} note={5}/>
                </div>
                <div className="home_ligne">
                    <Produit id="2712652" description="Bestol Tech Remote Control AA59-00821A for Samsung AA59-00821A LED LCD HDTV Smart TV Controle telecommande LT22C350ND" image={prd3} prix={22.65} note={4}/>
                    <Produit id="8797665609" description="Shaver, MOOSOO Electric Razor with Sterilization Clean Charge Station, Rechargeable Wet/Dry Electric Shaver with Pop-up Trimmer, 100% Waterproof, 5 Mins Fast Charging Technology, LED Display, 100-240V" image={prd5} prix={69.20} note={5}/>
                    <Produit id="971485665509" description="Lenovo Legion Y540-15 Gaming Laptop, 15.6 IPS, 60Hz 300 nits, Intel Core i7-9750H Processor, 16G DDR4 2666Mz, 512GB, 1TB 7200, NVIDIA GTX1660Ti, Win 10, 81SX00NNUS, Raven Black" image={prd6} prix={1216} note={5}/>
                </div>
                <div className="home_ligne">
                    <Produit id="687368762" description="PHGo Hd Tv, Curved Screen Tv Ultra-Definition 4k LCD Television Ultra-Thin Widescreen Hd Tv (32/50/55) Inch" image={prd4} prix={683.45} note={5}/>
                </div>
            </div>
        </div>
    )
}

export default Home
