#!/bin/sh
python3 get_benchmarks.py
python3 augment_benchmarks.py
python3 process_benchmarks.py
python3 update_db.py
