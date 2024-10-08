const admin = require('firebase-admin');
// const serviceAccount = require('./fbServiceAccountKey.json');
const serviceAccount = {
    "type": "service_account",
    "project_id": "hoa-ielts-kids",
    "private_key_id": process.env.FIREBASE_SERVICE_ACCOUNT_KEY_ID,
    "private_key": process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'), // This is important to handle the newlines correctly
    // "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCMhghtZt9MFqGD\nBn4BU4zkv8aLLoqWv42f/UAcHfpupmEKOG3+vdButi/cPcovFqo2fuS3TF8520ae\n8Wru8qEKAew4BMMi79cnyZ82m7NmdSHOU81IybPZYpyzGsMbZkniP5IpGtYjhfKC\nuAhPb28f0SmNZhyHBU341SdGRKiJz6GZL8p1zPylshQhcdobP7owv/xxcRXjUImL\nlQJtZh8IIiXWWourGl8WoIaqhQZOwvqjFBoawefwgJMZMRM6Eb4K1J7tE4tzSi6b\nxq74BRMjqAN2/QEtZwk5v4dPbcI0uV5rdECq9oe2e3F4moRvinRJ1dcjh4JwAcvs\n49goPVFTAgMBAAECggEANkWBtbb4YKuQ30i/m4WIMcR7Sr/D2KrMaNDnVLSjRt7N\nNaRLnwnyGQAWBep7TqpjPL7PWJePY4nzgWld0kE0vue1MoFsV+7nWr981RtXMyfj\n0Yr+CrGT205BlM6uMcPUnyPMMEHkGD4gRioLU5qHAXPHp4ubUu5SidrQ20ujB+3t\nSgu1LwJ7eLz0wCxSkzw69TAWuzZXOQzOuRTPOnH49na1VBrK09C237LGD6sB+ibB\n0liaCK67jraVTUrpiEUb6MpcZxxW75QXenmoVPd3lXAEl5sMaRDSTFtgmzrx6QAQ\nIlliKAOuXy4ZGK2dJonJe0LttpSPZwvohvRyWfcAeQKBgQC/E+x3OY/AHp5Ly6P5\nmVEhkv4GpIUuKHPdsS/3Xq+W58o1fNhZ8SFNv8yUmic0RNGegC4TVi2xYEM7d4f8\ngRDzMnx6Bq1QJO5DXypA69oD1xHX84cMQ0z0Di+JAcAyzZEma6rXVDX5nrEJVuri\n7kETzQrZ8gW4tjhwHNO+7bAi7wKBgQC8RN20pdhAaMVXl1K4GxpmEkryimjxQOeo\nWDhGUvD1DTiOgcgx9oqQN6ZDIn2KyGfWcjB+SMYNqtQQTCSYQ2OQzQOBuSGBXirQ\nYLzOrA4grSFmxrvbCo5SP3XZPSqCYvXB+5WKdXNJ9xjMiY0vB/znRL8BBYHuBPZM\n3YkFRO9n3QKBgQCsmJSaRTZh9cZK9NFTHng4eYxX97gNL6EpeWm4aqD1EL6IfhL3\ne2X30u46tNwAzMEECQiVktyHQkq4pooBPZxP8SSbHPjkUdeep5GFPwWZPmXxyRoN\nq6URNtcdTKWNvj4ElHCnPHvc1MlZhFd7UHccKbRJleIxLPfh3UgvSIg3pQKBgQCr\ntTNvmwKMXAIATSdIeo+tIGnyo4Hq5wNhanSIzwSsuw4mCwAHcZAW0Gp3OHG/rd/m\nmebYho770B3xb0DBDlU0r4bPPYXtc3Eg89m/tPR9oOmhzwduU0ZShUZ6h2rJ2G/E\nKCzPRyeLAi4//gQiLOrgErcRu3AxIZ1xpWtevuyKkQKBgGA+Yo/tdcuLxJZvUgDD\nbiEuJyjhAx+ePGasb9pvYy7VNxWgHSer8WVOojjCaVKLJfpVg2bDZpXqSYv7/nhF\nyjD3yaDUVYwmLQLjHZUuOmL9jll8jPgFSNk4f3lIRJKS5o5AtnAGBMZffK6LPoNx\nYPTsM2hECKjKChtM+XC/XqX/\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-t6qpa@hoa-ielts-kids.iam.gserviceaccount.com",
    "client_id": "103455032333203863833",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t6qpa%40hoa-ielts-kids.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
