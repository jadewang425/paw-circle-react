import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function MeetupSideBar(props) {
    const { activeType, setActiveType, petTypes } = props

    const typeList = petTypes.map(t => 
        <Button
            key={t}
            className={t === activeType ? 'active' : ''}
            onClick={() => setActiveType(t)}
            variant="light"
        >
            {t}
        </Button>     
    )
    console.log('activeType', activeType)
    return (
        <Container 
            className="meetup-side-bar" 
            style={{margin: '0 20px', width: '18rem', backgroundColor: 'tan', height: '100%', padding: '20px', borderRadius: '5px'}}
        >
            <Link to={'/meetups/create'}>
                <Button style={{width: '100%'}} variant="light">Create Meetup</Button>
            </Link>
            <div style={{color: 'white'}}><strong>Type:</strong></div>
            <Button onClick={() => setActiveType('')} variant="light">All</Button>
            {typeList}
        </Container>
    )
}