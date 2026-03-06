FROM mongo:latest

WORKDIR /app

COPY . .

RUN chmod +x /app/apps/backupd/backupd.sh /app/apps/backupd/websitedb.sh

CMD ["sh", "/app/apps/backupd/backupd.sh"]