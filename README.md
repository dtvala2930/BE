# BE

## docker compose up

### Before run script

#### Step 1: Edit file .env with variables

```
DATABASE_URL=
DIRECT_URL=

# CRYPTO
CIPHER_MODE=
CIPHER_KEY=
CIPHER_IV=

# AUTH
JWT_SECRET_KEY=
JWT_EXPIRED_TIME_TOKEN=
JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN=

CLIENT_URL=
```

#### Step 2: Run script

```
docker compose up
```

## start:dev

### Before run script

#### Step 1: Update .env file like above

#### Step 2: Install package

```
yarn

```

### Step 2

```
yarn start:dev
```

## deploy source

### Every change in main branch will be automatically update to product version
