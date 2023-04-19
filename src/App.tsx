import 'bootstrap/dist/css/bootstrap.min.css';
import AddressForm from './components/AddressForm';
import { Container } from 'react-bootstrap';
import HeadNavbar from './components/HeadNavbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
	return (
		<Container fluid className='bg-info bg-gradient bg-opacity-25 px-0'>
			<HeadNavbar />
			<Container>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/my_parking' element={<AddressForm />} />
					<Route path='/search' element={<h1>Search for parking</h1>} />
				</Routes>
			</Container>
			<Footer />
		</Container>
	);
}

export default App;
