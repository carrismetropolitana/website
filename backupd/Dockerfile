FROM mongo:latest

WORKDIR /backupd

COPY ./backupd.sh ./backupd.sh

RUN chmod 0644 ./backupd.sh

CMD ["sh", "backupd.sh"]
