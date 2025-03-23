FROM php:7.4-apache
RUN apt-get update && apt-get install -y \
    libxslt-dev \
    libxml2-dev \
    --no-install-recommends \
    && docker-php-ext-install xsl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
COPY . /var/www/html/
EXPOSE 80