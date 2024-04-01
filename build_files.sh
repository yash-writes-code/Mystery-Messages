python3.9 -m venv myenv
source myenv/bin/activate
python3.9 -m pip install --no-cache-dir -r requirements.txt
python3.9 manage.py collectstatic