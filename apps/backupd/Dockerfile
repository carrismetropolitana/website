FROM mongo:latest

WORKDIR /backupd

COPY . .

RUN chmod +x backupd.sh websitedb.sh

CMD ["sh", "backupd.sh"]