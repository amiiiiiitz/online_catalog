from fastapi import FastAPI

app = FastAPI(title="Online Product Catalog and Sales Management System")


@app.get("/api/v1/health")
def health():
    return {"status": "ok"}
