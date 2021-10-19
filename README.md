### Database Model
![db_model](https://user-images.githubusercontent.com/86972559/137996506-e86163dc-ec58-4c51-a008-cc9993caab85.png)

### The Process
1. connect with the credential data with AWS RDS POSTGRESQL
```// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'joojoo';
db_credentials.host = 'ds-fall-21.cfbwimnbp6s8.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.password;
db_credentials.port = 5432;```
