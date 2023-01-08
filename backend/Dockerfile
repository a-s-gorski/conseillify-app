FROM python:3.9
EXPOSE 8000
ADD backend/requirements.txt .
RUN pip3 install -r requirements.txt
ADD backend/api api
WORKDIR /api
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["sh"]