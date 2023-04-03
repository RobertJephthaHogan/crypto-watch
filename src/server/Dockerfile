FROM python:3.9-alpine

WORKDIR /server
COPY ./app /server/app
COPY ./main.py /server
COPY ./requirements.txt /server
COPY .env /server



RUN apk add --no-cache --update \
    python3 python3-dev gcc \
    gfortran musl-dev g++ \
    libffi-dev openssl-dev \
    libxml2 libxml2-dev \
    libxslt libxslt-dev \
    libjpeg-turbo-dev zlib-dev

RUN pip install --upgrade pip
RUN pip install --upgrade cython


RUN pip install -r requirements.txt

CMD ["python", "main.py"]