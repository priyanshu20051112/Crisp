FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "python -m flask db upgrade && gunicorn -w 1 -b 0.0.0.0:${PORT:-5000} run:app"]