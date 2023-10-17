import { Container, Button } from 'react-bootstrap'

export default function PetTypeFilter(props) {
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

    return (
        <Container 
            className="meetup-side-bar" 
            style={{flexDirection: 'row', margin: '20px', backgroundColor: 'tan', padding: '10px', borderRadius: '5px'}}
        >
            <div style={{color: 'white', alignSelf: 'center'}}><strong>Type:</strong></div>
            <Button onClick={() => setActiveType('')} variant="light">All</Button>
            {typeList}
        </Container>
    )
}