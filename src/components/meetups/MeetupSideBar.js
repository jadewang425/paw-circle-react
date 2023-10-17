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
            style={{flexDirection: 'row', margin: '20px', backgroundColor: 'tan', padding: '10px', borderRadius: '5px'}}
        >
            <Link to={'/meetups/create'}>
                <Button style={{width: '100%'}} variant="light">Create Meetup</Button>
            </Link>
            <div style={{color: 'white', alignSelf: 'center'}}><strong>Type:</strong></div>
            <Button onClick={() => setActiveType('')} variant="light">All</Button>
            {typeList}
        </Container>
    )
}