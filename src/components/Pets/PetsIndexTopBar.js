import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PetTypeFilter from '../shared/PetTypeFilter'


export default function PetsIndexTopBar(props) {
    const { activeType, setActiveType, petTypes } = props

    return (
        <Container className='top-bar'>
            <Link to={'/pets/create'}>
                <Button style={{width: '10rem'}} variant="light">Create Pet</Button>
            </Link>
            <PetTypeFilter 
                activeType={activeType}
                setActiveType={setActiveType}
                petTypes={petTypes}
            />
        </Container>
    )
}