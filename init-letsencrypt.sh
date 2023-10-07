#!/bin/bash

staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits
domain1=beta.carrismetropolitana.pt # The primary domain
domain2=on.carrismetropolitana.pt
email="carrismetropolitana@gmail.com" # Adding a valid address is strongly recommended


echo "### Cleaning letsencrypt directory..."
sudo rm -Rf "./letsencrypt/"

echo "### Downloading recommended TLS parameters ..."
mkdir -p "./letsencrypt"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./letsencrypt/options-ssl-nginx.conf"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./letsencrypt/ssl-dhparams.pem"
echo

echo "### Creating dummy certificate..."
mkdir -p "./letsencrypt/live/$domain1"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:4096 -days 1\
    -keyout '/etc/letsencrypt/live/$domain1/privkey.pem' \
    -out '/etc/letsencrypt/live/$domain1/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
docker compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domain1 && \
  rm -Rf /etc/letsencrypt/archive/$domain1 && \
  rm -Rf /etc/letsencrypt/renewal/$domain1.conf" certbot
echo


echo "### Requesting Let's Encrypt certificate for $domain1 and www.$domain1 and $domain2 and www.$domain2 ..."

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    -d $domain1 -d www.$domain1 -d $domain2 -d www.$domain2 \
    --email $email \
    --rsa-key-size 4096 \
    --agree-tos \
    --noninteractive \
    --verbose \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker compose exec nginx nginx -s reload
