FROM python:3.11-slim AS builder
WORKDIR /install
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
EXPOSE 8501
ENTRYPOINT ["streamlit", "run", "app/main.py", "--server.port", "8501", "--server.enableCORS", "false"]
