import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function HeadNavbar(): JSX.Element {
	return (
		<Navbar bg='light' expand='lg' sticky='top'>
			<Container fluid>
				<Navbar.Brand as={Link} to={'/'} className='ms-3'>
					CommuniPark
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mx-auto'>
						<Nav.Link as={NavLink} to={'/'}>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to={'/my_parking'}>
							My Parking
						</Nav.Link>
						<Nav.Link as={NavLink} to={'/search'}>
							Search
						</Nav.Link>
					</Nav>
					<Navbar.Text>
						Signed in as: <Link to={'/'}>Mark Otto</Link>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
