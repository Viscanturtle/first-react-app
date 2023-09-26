import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComp(props) {
    return(
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={props.image} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>Yum! Delecious food! Indeed.</Card.Text>
            <Button variant="primary">{props.category}</Button>
          </Card.Body>
        </Card>
    )
}

export default CardComp;