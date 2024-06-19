#!/bin/bash


# # #
# SETTINGS

email="carrismetropolitana@gmail.com"
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

website_frontend=alpha.carrismetropolitana.pt
website_videowall=videowall.carrismetropolitana.pt


# # #
# STARTUP

echo ">>> Cleaning letsencrypt directory..."
sudo rm -Rf "./letsencrypt/"

echo ">>> Downloading recommended TLS parameters ..."
mkdir -p "./letsencrypt"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./letsencrypt/options-ssl-nginx.conf"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./letsencrypt/ssl-dhparams.pem"
echo

echo ">>> Creating dummy certificate for "$website_frontend"..."
mkdir -p "./letsencrypt/live/$website_frontend"
docker compose run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$website_frontend/privkey.pem' -out '/etc/letsencrypt/live/$website_frontend/fullchain.pem' -subj '/CN=localhost'" certbot
echo

echo ">>> Creating dummy certificate for "$website_videowall"..."
mkdir -p "./letsencrypt/live/$website_videowall"
docker compose run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$website_videowall/privkey.pem' -out '/etc/letsencrypt/live/$website_videowall/fullchain.pem' -subj '/CN=localhost'" certbot
echo

echo ">>> Rebuilding nginx ..."
docker compose up -d --build --force-recreate --remove-orphans nginx
echo


# # #
# WEBSITE FRONTEND (ALPHA)

echo ">>> Preparing for "$website_frontend" ..."

echo ">>> Deleting dummy certificate..."
docker compose run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/$website_frontend && rm -Rf /etc/letsencrypt/archive/$website_frontend && rm -Rf /etc/letsencrypt/renewal/$website_frontend.conf" certbot
echo

echo ">>> Requesting Let's Encrypt certificate for "$website_frontend" (+ "www.$website_frontend") ..."
if [ $staging != "0" ]; then staging_arg="--staging"; fi # Enable staging mode if needed
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot $staging_arg -d $website_frontend -d www.$website_frontend --email $email --rsa-key-size 4096 --agree-tos --noninteractive --verbose --force-renewal" certbot
echo


# # #
# VIDEOWALL (ALPHA)

echo ">>> Preparing for "$website_videowall" ..."

echo ">>> Deleting dummy certificate..."
docker compose run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/$website_videowall && rm -Rf /etc/letsencrypt/archive/$website_videowall && rm -Rf /etc/letsencrypt/renewal/$website_videowall.conf" certbot
echo

echo ">>> Requesting Let's Encrypt certificate for "$website_videowall" (+ "www.$website_videowall") ..."
if [ $staging != "0" ]; then staging_arg="--staging"; fi # Enable staging mode if needed
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot $staging_arg -d $website_videowall -d www.$website_videowall --email $email --rsa-key-size 4096 --agree-tos --noninteractive --verbose --force-renewal" certbot
echo


# # #
# CLEANUP

echo ">>> Rebuilding nginx ..."
docker compose up -d --build --force-recreate --remove-orphans nginx
echo

echo ">>> DONE!"