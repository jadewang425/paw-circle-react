import { Spinner } from "react-bootstrap";

export default function LoadingScreen() {
    return (
    <div className="container-sm" style={{ textAlign: 'center', marginTop: '20px'}}>
        <Spinner role="status" animation="grow" variant="secondary" />
    </div>
    )
}