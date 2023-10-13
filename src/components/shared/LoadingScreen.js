import { Spinner } from "react-bootstrap";

export default function LoadingScreen() {
    return (
    <div className="container-sm" style={{ textAlign: 'center'}}>
        <Spinner role="status" animation="grow" variant="secondary" />
    </div>
    )
}