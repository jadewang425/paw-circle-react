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
        <div className="type-filter">
            <div style={{color: 'white', alignSelf: 'center'}}><strong>Type:</strong></div>
            <Button onClick={() => setActiveType('')} variant="light">All</Button>
            {typeList}
        </div>
    )
}