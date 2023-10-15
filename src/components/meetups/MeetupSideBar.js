import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function MeetupSideBar(props) {
    const { meetups, activeType, setActiveType, petTypes } = props
    // const types = [...new Set(meetups.map(meetup => meetup.type))]

    const typeList = petTypes.map(t => 
        <Button
            key={t}
            className={t === activeType ? 'active' : ''}
            style={{listStyleType: 'none'}}
            onClick={() => setActiveType(t)}
        >
            {t}
        </Button>     
    )
    console.log('activeType', activeType)
    return (
        <>
            <Container className="meetup-side-bar" style={{width: '18rem'}}>
                <Link to={'/meetups/create'}>
                    <Button>Create Meetup</Button>
                </Link>
                <div>Type:</div>
                {typeList}
            </Container>
        </>
    )
}