import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';

export default function DemoCarousel() {
  return (
    <Carousel variant="dark">
      
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="https://cdn.gobankingrates.com/wp-content/uploads/2016/10/Incomible_shutterstock_149790596.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>FEATURES </h5>
          {/* <p>Top-ranking financial services guaranteed.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="https://miro.medium.com/max/1100/1*DktFbbzD4aA_H5iSd52M2A.png"
          alt="Second slide"
        />
        <Carousel.Caption>
        <h5>Your new way of banking. </h5>
          <p>Top-ranking financial services guaranteed.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-container"
          src="https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2019/money/p13-mobile-banking_web.jpg&w=900&height=601"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>DEMO</h5>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
