SSL certificate is now manually using certbot
Refer https://medium.com/techbeatly/deployment-of-ssl-encrypted-node-js-app-on-aws-ec2-using-nginx-and-docker-with-letsencrypt-ff727fa33f6b

To recreate the certificate after expiry:

1. Login to EC2 machine
2. Run sudo certbot --nginx -d portfolio.akmj.social

To recreate in a newe instance

1. Refer https://medium.com/techbeatly/deployment-of-ssl-encrypted-node-js-app-on-aws-ec2-using-nginx-and-docker-with-letsencrypt-ff727fa33f6b

2. https://dcc.godaddy.com/manage/akmj.social/dns
3. Edit the IP of instance here
4. Currently nginx is seperately configured in EC2 and not dockerized

