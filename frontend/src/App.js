import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-up';
import { FaGithub } from 'react-icons/fa';

export default function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const urlBase = 'http://localhost:3001/benchmarks?';
	const [query, setQuery] = useState('mb_type=0');
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const response = await axios.get(urlBase + query);
				setData(response.data);
				setError(null);
			} catch (err) {
				setError(err.message);
				setData(null);
			} finally {
				setLoading(false);
			}
		}
		getData();
	}, [query]);

	const mapGrades = {
		0: '5+ (V2)',
		1: '6A (V3)',
		2: '6A+ (V3)',
		3: '6B (V4)',
		4: '6B+ (V4)',
		5: '6C (V5)',
		6: '6C+ (V5)',
		7: '7A (V6)',
		8: '7A+ (V7)',
		9: '7B (V8)',
		10: '7B+ (V8)',
		11: '7C (V9)',
		12: '7C+ (V10)',
		13: '8A (V11)',
		14: '8A+ (V12)',
		15: '8B (V13)',
		16: '8B+ (V14)',
		17: '8C (V15)',
	}
	return (
		<div className='app d-flex flex-column' style={{minHeight: '100vh'}}>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand>
						<img
							src='moon-logo.png'
							width='30'
							height='30'
							className='d-inline-block align-top'
						/>&nbsp;
						Moonboard Guidebook</Navbar.Brand>
					<Nav defaultActiveKey='201640'>
						<Nav.Link onClick={() => { setQuery('mb_type=0') }} eventKey='201640'>2016 40°</Nav.Link>
						<Nav.Link onClick={() => { setQuery('mb_type=1') }} eventKey='201725'>2017 25°</Nav.Link>
						<Nav.Link onClick={() => { setQuery('mb_type=2') }} eventKey='201740'>2017 40°</Nav.Link>
						<Nav.Link onClick={() => { setQuery('mb_type=3') }} eventKey='201925'>2019 25°</Nav.Link>
						<Nav.Link onClick={() => { setQuery('mb_type=4') }} eventKey='201940'>2019 40°</Nav.Link>
						<Nav.Link onClick={() => { setQuery('mb_type=5') }} eventKey='202040'>2020 40°</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Container className='mt-4 flex-1'>
				{error && <div>Error: {error}</div>}
				{loading && <div><center><Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner></center></div>}
				{data && (
					<><div><p>Found {data.length} benchmarks.</p></div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Setter</th>
								<th>Grade</th>
								<th>Sandbag Score</th>
								<th>Repeats</th>
								<th>User Stars</th>
								<th>Average Attempts</th>
								<th>Hold Sets</th>
								<th>Date Created</th>
							</tr>
						</thead>
						<tbody>
							{data.map((row) => (
								<tr key={row.id}>
									<td>{row.name}</td>
									<td>{row.setter}</td>
									<td>{mapGrades[row.official_grade]}{row.upgraded ? ' \u25B2' : null} {row.downgraded ? ' \u25BC' : null}</td>
									<td style={{ color: row.user_grade > row.official_grade + 0.1 ? 'red' : row.user_grade < row.official_grade - 0.1 ? 'green' : 'black' }}>{Math.round((row.user_grade - row.official_grade) * 1000) / 100}</td>
									<td>{row.repeats}</td>
									<td>{row.user_stars}</td>
									<td>{row.user_attempts}</td>
									<td>
										{row.holdsets.includes(1) ? <img alt='White Hold' src='white-hold.png'></img> : null}
										{row.holdsets.includes(2) ? <img alt='Black Hold' src='black-hold.png'></img> : null}
										{row.holdsets.includes(0) ? <img alt='Yellow Hold' src='yellow-hold.png'></img> : null}
										{row.holdsets.includes(3) ? <img alt='Red Hold' src='red-hold.png'></img> : null}
										{row.holdsets.includes(4) ? <img alt='Wooden A Hold' src='woodenA-hold.png'></img> : null}
										{row.holdsets.includes(5) ? <img alt='Wooden B Hold' src='woodenB-hold.png'></img> : null}
										{row.holdsets.includes(6) ? <img alt='Wooden C Hold' src='woodenC-hold.png'></img> : null}
									</td>
									<td>{row.date_created.substring(0, 10).split('-').join('/')}</td>
								</tr>
							))}
						</tbody>
					</Table></>
				)}
			</Container>

			<ScrollToTop showUnder={100}>
				<img src='up-button.png' width='50' height='50' />
			</ScrollToTop>

			<footer className='footer mt-auto'>
				<Container className='pt-3'>
				<center>
					<p>© 2023 Simon Chase | <a href='github.com'>View on GitHub</a></p>
				</center>
			</Container>
			</footer>
		</div>
	);
}
