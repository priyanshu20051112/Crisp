# 🔗 Crisp - Modern URL Shortener

Crisp is a fast, scalable, and production-ready URL shortener built with Flask. It allows users to generate short, shareable links while leveraging PostgreSQL for persistent storage and Redis for high-speed caching.

---

## ✨ Features

- 🚀 Generate short URLs instantly
- 🔗 Redirect users to original URLs
- 📊 Track click counts
- ⚡ Redis caching for faster redirects
- 🗄 PostgreSQL database
- 🐳 Dockerized application
- 🌐 Production-ready with Gunicorn
- 🔒 Environment variable configuration
- 📱 Responsive frontend

---

## 🛠 Tech Stack

### Backend
- Flask
- SQLAlchemy
- Gunicorn

### Database
- PostgreSQL

### Cache
- Redis

### Frontend
- HTML
- CSS
- JavaScript

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```
Crisp/
│
├── app/
│   ├── routes.py
│   ├── models.py
│   ├── services.py
│   ├── templates/
│   ├── static/
│   └── __init__.py
│
├── migrations/
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── run.py
├── .env
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Crisp.git

cd Crisp
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it

**Windows**

```bash
venv\Scripts\activate
```

**Linux / Mac**

```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file.

```env
FLASK_APP=run.py
FLASK_ENV=development

DATABASE_URL=postgresql://username:password@localhost:5432/crisp

REDIS_URL=redis://localhost:6379

SECRET_KEY=your-secret-key
```

### 5. Run database migrations

```bash
flask db upgrade
```

### 6. Start the application

```bash
python run.py
```

The application will be available at

```
http://localhost:5000
```

---

# 🐳 Running with Docker

Build and start the containers

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

## 🚀 Production

The application is served using Gunicorn.

Example command:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

```

## 📈 Future Improvements

- User authentication
- Custom aliases
- QR code generation
- Link expiration
- Password-protected URLs
- REST API
- Rate limiting
- Detailed analytics
- Admin dashboard
- Docker production optimization
- Kubernetes deployment
- CI/CD pipeline

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Priyanshu Upadhyay**

If you like this project, consider giving it a ⭐ on GitHub!
