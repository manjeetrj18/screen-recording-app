import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h2>Welcome to video recording App</h2>
          <div className="d-flex">
            <Button variant="primary" href="/recording" className="me-3">
              Click here to go on Recoring page
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
