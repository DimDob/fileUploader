from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:4200", 
]

def get_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins, 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
