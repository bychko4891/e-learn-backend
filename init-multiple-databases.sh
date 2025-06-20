#!/bin/bash
set -e

# Створення баз даних
if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Створюю наступні бази даних: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        echo "Створюю базу даних $db"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
            CREATE DATABASE $db;
EOSQL
    done
fi

# Створення користувачів і надання привілеїв
if [ -n "$POSTGRES_USERNAME_AUTH" ] && [ -n "$POSTGRES_PASSWORD_AUTH" ]; then
    echo "Create user to db auth"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_AUTH WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_AUTH';
        ALTER USER $POSTGRES_USERNAME_AUTH WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_AUTH WITH CREATEDB;
        ALTER DATABASE auth OWNER TO $POSTGRES_USERNAME_AUTH;
        GRANT ALL PRIVILEGES ON DATABASE auth TO $POSTGRES_USERNAME_AUTH;
EOSQL
fi

if [ -n "$POSTGRES_USERNAME_USER" ] && [ -n "$POSTGRES_PASSWORD_USER" ]; then
    echo "Create user to db users"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_USER WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_USER';
        ALTER USER $POSTGRES_USERNAME_USER WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_USER WITH CREATEDB;
        ALTER DATABASE users OWNER TO $POSTGRES_USERNAME_USER;
        GRANT ALL PRIVILEGES ON DATABASE users TO $POSTGRES_USERNAME_USER;

EOSQL
fi

if [ -n "$POSTGRES_USERNAME_LESSON" ] && [ -n "$POSTGRES_PASSWORD_LESSON" ]; then
    echo "Create user to db lessons"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_LESSON WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_LESSON';
        ALTER USER $POSTGRES_USERNAME_LESSON WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_LESSON WITH CREATEDB;
        ALTER DATABASE lessons OWNER TO $POSTGRES_USERNAME_LESSON;
        GRANT ALL PRIVILEGES ON DATABASE lessons TO $POSTGRES_USERNAME_LESSON;
EOSQL
fi

if [ -n "$POSTGRES_USERNAME_PUBLIC" ] && [ -n "$POSTGRES_PASSWORD_PUBLIC" ]; then
    echo "Create user to db public"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_PUBLIC WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_PUBLIC';
        ALTER USER $POSTGRES_USERNAME_PUBLIC WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_PUBLIC WITH CREATEDB;
        ALTER DATABASE public OWNER TO $POSTGRES_USERNAME_PUBLIC;
        GRANT ALL PRIVILEGES ON DATABASE public TO $POSTGRES_USERNAME_PUBLIC;
EOSQL
fi

if [ -n "$POSTGRES_USERNAME_MEDIA" ] && [ -n "$POSTGRES_PASSWORD_MEDIA" ]; then
    echo "Create user to db media"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_MEDIA WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_MEDIA';
        ALTER USER $POSTGRES_USERNAME_MEDIA WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_MEDIA WITH CREATEDB;
        ALTER DATABASE media OWNER TO $POSTGRES_USERNAME_MEDIA;
        GRANT ALL PRIVILEGES ON DATABASE media TO $POSTGRES_USERNAME_MEDIA;
EOSQL
fi

if [ -n "$POSTGRES_USERNAME_NOTIFICATION" ] && [ -n "$POSTGRES_PASSWORD_NOTIFICATION" ]; then
    echo "Create user to db notification"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER $POSTGRES_USERNAME_NOTIFICATION WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD_NOTIFICATION';
        ALTER USER $POSTGRES_USERNAME_NOTIFICATION WITH SUPERUSER;
        ALTER USER $POSTGRES_USERNAME_NOTIFICATION WITH CREATEDB;
        ALTER DATABASE notification OWNER TO $POSTGRES_USERNAME_NOTIFICATION;
        GRANT ALL PRIVILEGES ON DATABASE notification TO $POSTGRES_USERNAME_NOTIFICATION;
EOSQL
fi