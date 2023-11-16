#!/bin/bash


# # #
# SETTINGS

email="carrismetropolitana@gmail.com"
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

website_domain=beta.carrismetropolitana.pt # The primary domain
website_domain_alias=on.carrismetropolitana.pt
escolas_domain=escolas.carrismetropolitana.pt
meuhorario_domain=meuhorario.carrismetropolitana.pt


# # #
# STARTUP

echo ">>> Cleaning letsencrypt directory..."
sudo rm -Rf "./letsencrypt/"

echo ">>> Downloading recommended TLS parameters ..."
mkdir -p "./letsencrypt"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./letsencrypt/options-ssl-nginx.conf"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./letsencrypt/ssl-dhparams.pem"
echo

echo ">>> Creating dummy certificate for "$website_domain"..."
mkdir -p "./letsencrypt/live/$website_domain"
docker compose run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$website_domain/privkey.pem' -out '/etc/letsencrypt/live/$website_domain/fullchain.pem' -subj '/CN=localhost'" certbot
echo

echo ">>> Creating dummy certificate for "$escolas_domain"..."
mkdir -p "./letsencrypt/live/$escolas_domain"
docker compose run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$escolas_domain/privkey.pem' -out '/etc/letsencrypt/live/$escolas_domain/fullchain.pem' -subj '/CN=localhost'" certbot
echo

echo ">>> Creating dummy certificate for "$meuhorario_domain"..."
mkdir -p "./letsencrypt/live/$meuhorario_domain"
docker compose run --rm --entrypoint "openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout '/etc/letsencrypt/live/$meuhorario_domain/privkey.pem' -out '/etc/letsencrypt/live/$meuhorario_domain/fullchain.pem' -subj '/CN=localhost'" certbot
echo

echo ">>> Rebuilding nginx ..."
docker compose up -d --build --force-recreate --remove-orphans nginx
echo


# # #
# WEBSITE (BETA)

echo ">>> Preparing for "$website_domain" (and alias "$website_domain_alias") ..."

echo ">>> Deleting dummy certificate..."
docker compose run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/$website_domain && rm -Rf /etc/letsencrypt/archive/$website_domain && rm -Rf /etc/letsencrypt/renewal/$website_domain.conf" certbot
echo

echo ">>> Requesting Let's Encrypt certificate for "$website_domain" (+ "www.$website_domain") and "$website_domain_alias" (+ "www.$website_domain_alias") ..."
if [ $staging != "0" ]; then staging_arg="--staging"; fi # Enable staging mode if needed
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot $staging_arg -d $website_domain -d www.$website_domain -d $website_domain_alias -d www.$website_domain_alias --email $email --rsa-key-size 4096 --agree-tos --noninteractive --verbose --force-renewal" certbot
echo


# # #
# ESCOLAS

echo ">>> Preparing for "$escolas_domain" ..."

echo ">>> Deleting dummy certificate..."
docker compose run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/$escolas_domain && rm -Rf /etc/letsencrypt/archive/$escolas_domain && rm -Rf /etc/letsencrypt/renewal/$escolas_domain.conf" certbot
echo

echo ">>> Requesting Let's Encrypt certificate for "$escolas_domain" (+ "www.$escolas_domain") ..."
if [ $staging != "0" ]; then staging_arg="--staging"; fi # Enable staging mode if needed
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot $staging_arg -d $escolas_domain -d www.$escolas_domain --email $email --rsa-key-size 4096 --agree-tos --noninteractive --verbose --force-renewal" certbot
echo


# # #
# MEUHORARIO (FOLHETOS)

echo ">>> Preparing for "$meuhorario_domain" ..."

echo ">>> Deleting dummy certificate..."
docker compose run --rm --entrypoint "rm -Rf /etc/letsencrypt/live/$meuhorario_domain && rm -Rf /etc/letsencrypt/archive/$meuhorario_domain && rm -Rf /etc/letsencrypt/renewal/$meuhorario_domain.conf" certbot
echo

echo ">>> Requesting Let's Encrypt certificate for "$meuhorario_domain" (+ "www.$meuhorario_domain") ..."
if [ $staging != "0" ]; then staging_arg="--staging"; fi # Enable staging mode if needed
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot $staging_arg -d $meuhorario_domain -d www.$meuhorario_domain --email $email --rsa-key-size 4096 --agree-tos --noninteractive --verbose --force-renewal" certbot
echo


# # #
# CLEANUP

echo ">>> Rebuilding nginx ..."
docker compose up -d --build --force-recreate --remove-orphans nginx
echo

echo ">>> DONE!"