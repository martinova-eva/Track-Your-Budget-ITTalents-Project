import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';

export default function DemoCarousel() {
  return (
    <div className='carousel-wrapper'>
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="./assets/Create account in few easy steps.png"
          alt="First slide"
        />
      
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="./assets/Create account in few easy steps (1).png"
          alt="Second slide"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="./assets/Create account in few easy steps (2).png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="./assets/Create account in few easy steps (3).png"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="./assets/Create account in few easy steps (4).png"
          alt="Fifth slide"
        />
      </Carousel.Item>

    </Carousel>
    </div>
  );
}
