import { Container, Nav, Navbar } from 'react-bootstrap';

export default function HeadNavbar(): JSX.Element {
	return (
		<Navbar bg='light' expand='lg' sticky='top'>
			<Container>
				<Navbar.Brand href='#home'>CommuniPark</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mx-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#add'>Add</Nav.Link>
						<Nav.Link href='#search'>Search</Nav.Link>
					</Nav>
					<Navbar.Text>
						Signed in as: <a href='#login'>Mark Otto</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
