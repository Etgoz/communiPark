import 'bootstrap/dist/css/bootstrap.min.css';
import AddressForm from './components/AddressForm';
import { Container } from 'react-bootstrap';
import HeadNavbar from './components/HeadNavbar';

function App() {
	return (
		<Container>
			<HeadNavbar />
			<AddressForm />
		</Container>
	);
}

export default App;
