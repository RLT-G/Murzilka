import logging
from logging import config as logging_config
import multiprocessing
import os
import random
import string
import time
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request

load_dotenv()

from core import api
from core.registry import db, ENV

from core.storage.db import postgres


@asynccontextmanager
async def lifespan(app: FastAPI):
    # await postgres.prepare_database(db)
    await db.connect()
    yield
    await db.close()

app = FastAPI(lifespan=lifespan)
app.include_router(api.router)

if ENV != "PROD":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.middleware("http")
async def log_requests(request: Request, call_next):
    idem = f"{random.choices(string.ascii_uppercase)}      {string.digits}"
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    return response


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Murzilka",
        version="0.1",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
