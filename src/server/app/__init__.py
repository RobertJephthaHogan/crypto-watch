from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .services.user.routes import router as UserRouter
from .config import initiate_database



app = FastAPI()

origins = [ 'http://localhost:3000' ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Start Up Events
@app.on_event("startup")
async def startup_event():
    await initiate_database()
    print("Starting Server...")


# Root Render
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Hello Control Panel."}


app.include_router(UserRouter, tags=["User"], prefix="/user")

