import requests, json
from mb_types import mb_types

URL = 'http://localhost:3001'

for mb in mb_types:
	print(f'Loading {mb} benchmarks...')
	with open(f'data/processed_{mb}.json', 'r') as rfile:
		benchmarks = json.load(rfile)
		for climb in benchmarks:
			response = requests.post(f'{URL}/benchmarks', json=climb)