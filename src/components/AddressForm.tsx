import { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';

type CityRecord = {
	לשכה: string;
	סמל_ישוב: string;
	סמל_לשכת_מנא: string;
	סמל_מועצה_אזורית: string;
	שם_ישוב: string;
	שם_ישוב_לועזי: string;
	שם_מועצה: string | null;
	שם_נפה: string;
	_id: number;
};

type StreetRecord = {
	_id: number;
	סמל_ישוב: string;
	שם_ישוב: string;
	סמל_רחוב: string;
	שם_רחוב: string;
};

type ResultData<T> = {
	fields: Array<Object>;
	include_total: boolean;
	limit: number;
	records: T;
	record_format: string;
	resource_id: string;
	total: number;
	total_estimation_threshold: number | null;
	total_was_estimated: boolean;
	_links: Object;
};

type GovData<U> = {
	help: string;
	result: ResultData<U>;
	success: boolean;
};

function AddressForm() {
	const CITIES_URL =
		'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=5000';
	const STREETS_URL =
		'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=20000';
	const [cities, setCities] = useState<string[]>([]); // Use state to manage the cities data
	const [streets, setStreets] = useState<StreetRecord[]>([]);
	const [userCity, setUserCity] = useState('');
	const [userStreet, setUserStreet] = useState('');

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
				const response = await fetch(`${STREETS_URL}&q=${userCity}`);
				const data: GovData<StreetRecord[]> = await response.json();
				setStreets(
					data.result.records
						.filter((record: StreetRecord) => record.hasOwnProperty('שם_רחוב'))
						.filter((record: StreetRecord) => record.שם_ישוב === userCity)
						.sort((a: StreetRecord, b: StreetRecord) => a.שם_רחוב.localeCompare(b.שם_רחוב))
				); // Update cities state with fetched data
			} catch (e) {
				console.log(e);
				setStreets([]);
			}
		}
		fetchData();
		setUserStreet('');
	}, [userCity]); // Fetch data on component mount

	return (
		<Container className='my-4' dir='rtl' lang='he'>
			<Form>
				<Stack gap={2}>
					<Form.Select
						required
						title='select city'
						onChange={(e) => {
							setUserCity(e.target.value);
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
						disabled={userCity === ''}
						onChange={(e) => {
							setUserStreet(e.target.value);
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
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label='כניסה' controlId='entranceLabel' className='mb-3'>
								<Form.Control type='text' pattern='[א-ת]' title='entrance' placeholder='בניסה' />
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label='דירה' controlId='apartmentNumber' className='mb-3'>
								<Form.Control
									type='text'
									pattern='[0-9]*'
									title='apartment number'
									placeholder='דירה'
								/>
							</FloatingLabel>
						</Col>
					</Row>
					<Row>
						<Col xs='auto'>
							<Button type='submit'>שלח</Button>
						</Col>
						<Col xs='auto'>
							<Button variant='outline-danger' type='reset' onClick={() => setUserCity('')}>
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
