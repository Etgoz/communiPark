import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SiGmail, SiLinkedin, SiGithub } from 'react-icons/si';

export default function Footer() {
	return (
		<Container fluid className='py-4 bg-dark text-light small'>
			<Row className='text-center'>
				<Col>
					<Stack gap={1}>
						<h6>Navigate</h6>
						<Link className='text-light' to='/'>
							Home
						</Link>
						<Link className='text-light' to='/my_parking'>
							My Parking
						</Link>
						<Link className='text-light' to='/search'>
							Search
						</Link>
					</Stack>
				</Col>
				<Col>
					<Stack gap={1}>
						<h6>Contact me</h6>
						<span>
							<SiGmail className='text-danger mb-1' />
							{'  '}
							<a
								className='text-light'
								target='_blank'
								href='mailto:etgoz151@gmail.com&subject=Hello from Communipark app'
							>
								Gmail
							</a>
						</span>
						<span>
							<SiLinkedin className='text-light' />
							{'  '}
							<a
								className='text-light'
								target='_blank'
								href='https://www.linkedin.com/in/etay-gozlan/'
							>
								My Profile
							</a>
						</span>
						<span>
							<SiGithub className='text-light' />
							{'  '}
							<a className='text-light' target='_blank' href='https://github.com/Etgoz'>
								My Github
							</a>
						</span>
					</Stack>
				</Col>
			</Row>
			<Row>
				<p className='text-center text-light m-0 small'>Copyright: &copy; Etay Gozlan 2023</p>
			</Row>
		</Container>
	);
}
