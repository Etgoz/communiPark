import { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { CityRecord, GovData, StreetRecord, UserAddress } from '../types';

function AddressForm(): JSX.Element {
	const CITIES_URL =
		'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=5000';
	const STREETS_URL =
		'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=20000';
	const [cities, setCities] = useState<string[]>([]); // Use state to manage the cities data
	const [streets, setStreets] = useState<StreetRecord[]>([]);
	const [userAddress, setUserAddress] = useState<UserAddress>({
		city: '',
		street: '',
		homeNumber: '',
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(CITIES_URL);
				const data: GovData<CityRecord[]> = await response.json();
				setCities(
					data.result.records
						.map((record: CityRecord) => record.שם_ישוב)
						.filter((city: string) => !city.match('לא רשום'))
						.sort()
				); // Update cities state with fetched data
			} catch (e) {
				console.log(e);
				setCities([]);
			}
		}
		fetchData();
	}, []); // Fetch data on component mount

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`${STREETS_URL}&q=${userAddress.city}`);
				const data: GovData<StreetRecord[]> = await response.json();
				setStreets(
					data.result.records
						.filter((record: StreetRecord) => record.hasOwnProperty('שם_רחוב'))
						.filter((record: StreetRecord) => record.שם_ישוב === userAddress.city)
						.sort((a: StreetRecord, b: StreetRecord) => a.שם_רחוב.localeCompare(b.שם_רחוב))
				); // Update cities state with fetched data
			} catch (e) {
				console.log(e);
				setStreets([]);
			}
		}
		fetchData();
		setUserAddress({ ...userAddress, street: '' });
	}, [userAddress.city]); // Fetch data on component mount

	function handleAddressSubmit(event: FormEvent<HTMLFormElement>): void {
		localStorage.setItem('userAddress', JSON.stringify(userAddress));
	}

	return (
		<Container className='my-4' dir='rtl' lang='he'>
			<Form onSubmit={handleAddressSubmit}>
				<Stack gap={2}>
					<Form.Select
						required
						title='select city'
						onChange={(e) => {
							setUserAddress({ ...userAddress, city: e.target.value });
						}}
					>
						<option value={''}>בחר עיר</option>
						{
							cities.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							)) // Render each city as a div with a unique key
						}
					</Form.Select>
					<Form.Select
						required
						title='select street'
						disabled={userAddress.city === ''}
						onChange={(e) => {
							setUserAddress({ ...userAddress, street: e.target.value });
						}}
					>
						<option value={''}>בחר רחוב</option>
						{
							streets.map((street: StreetRecord) => (
								<option key={street.סמל_רחוב} value={street.שם_רחוב}>
									{street.שם_רחוב}
								</option>
							)) // Render each city as a div with a unique key
						}
					</Form.Select>
					<Row className='justify_content-md-center'>
						<Col>
							<FloatingLabel controlId='homeNumberInput' label='*מספר בית' className='mb-3'>
								<Form.Control
									type='text'
									pattern='[0-9]*'
									required
									title='home number'
									placeholder='*מספר בית'
									onChange={(e) => setUserAddress({ ...userAddress, homeNumber: e.target.value })}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label='כניסה' controlId='entranceLabel' className='mb-3'>
								<Form.Control
									type='text'
									pattern='[א-ת]'
									title='entrance'
									placeholder='בניסה'
									onChange={(e) => setUserAddress({ ...userAddress, entrance: e.target.value })}
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label='דירה' controlId='apartmentNumber' className='mb-3'>
								<Form.Control
									type='text'
									pattern='[0-9]*'
									title='apartment number'
									placeholder='דירה'
									onChange={(e) => setUserAddress({ ...userAddress, apratment: e.target.value })}
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<Row>
						<Col xs='auto'>
							<Button type='submit'>אישור</Button>
						</Col>
						<Col xs='auto'>
							<Button
								variant='outline-danger'
								type='reset'
								onClick={() => setUserAddress({ city: '', street: '', homeNumber: '' })}
							>
								איפוס
							</Button>
						</Col>
					</Row>
				</Stack>
			</Form>
		</Container>
	);
}

export default AddressForm;
