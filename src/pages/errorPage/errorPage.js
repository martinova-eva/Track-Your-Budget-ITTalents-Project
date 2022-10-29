import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./errorPage.css";

export default function ErrorPage(){
    const navigate = useNavigate();
    const handleClick = () => {
            navigate('/home');
    }
    return (
        <>
        <div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x1_5"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
        </div>
        <div className='c'>
            <div className='_404'>404</div>
            <hr></hr>
            <div className='_1'>THE PAGE</div>
            <div className='_2'>WAS NOT FOUND</div>
            <a className='btn'><Button type='button' onClick={handleClick}>BACK TO APP</Button></a>
        </div>
        </>
    )
}
