# PS-Project-Bib

This repository contains all code required to build and run a web application for making reservations in the library in Geel. 
This project was developed as our Professional Skills 1 project.

## Installation

Below, you can find all the information you need to recreate and host the project yourself.
The steps are placed in chronological order. Each step depends on the one prior to work as intended.

### Database

The database should be created in either MySQL or MariaDB.
In the `/db` directory, you can find an ERD, alongside `library.sql`, 
which contains DDL for defining the correct table structures, and DML to insert test data.

> Note: The database should be hosted on port `3306`, because this is the port used in the API.

### API

The API is written in Kotlin using the Ktor framework. 
Since Kotlin compiles to JVM code, you must have Java installed in order to run the compiled program.

To build the API, you need to run the `buildFatJar` gradle task (`./gradlew buildFarJar`) in the `/api` directory.
Make sure a compatible JRE and JDK are installed on your machine before doing so. Version 20.0.1 has been used for development. 

When successful, a file named `api-all.jar` will be placed in the `/api/build/libs` directory.
This file can be executed using `java -jar api-all.jar`, or using Docker.

Before running the API, make sure all necessary environment variables are provided.
Refer to the table below for information on each variable.

| Variable Name | Value                                                                                        |
|:--------------|:---------------------------------------------------------------------------------------------|
| `db-user`     | The username of a user with read and write access in your database.                          |
| `db-pass`     | The password for the user corresponding to the provided username.                            |
| `email-addr`  | The email address used for sending out confirmation emails.                                  |
| `email-pass`  | A password to access the account corresponding to the provided email address.                |
| `web-host`    | The address at which the website is hosted. For instance: `example.com` or `localhost:3000`. |

> Note: For technical information about the API and how to use it, read `/api/README.md`.

### Website

The website is created using React and TypeScript. NodeJS is used as the server environment.

To run the web application, you'll have to install all the required Node modules. 
To do so, navigate to the `/web` directory and executing the `npm install` command. 
Installing all packages can take some time.

When all packages finish installing, you can execute the `npm run start` command to start a development version of the web application. 
After executing the command, a browser window will open with the web application up and running.

Note that this is only a development version of the web application. 
If you wish to create an optimized version that's ready for production, you can execute the `npm run build` command. 
The optimized files can be found in a newly created `/build` directory, which can be served directly from your webserver.

Like the API, the website requires an environment variable to be provided. 
This variable must be placed in a file named `.env`, located in the `/web` directory.
Refer to the table below for information on this variable.

| Variable Name        | Value                                                                                        |
|:---------------------|:---------------------------------------------------------------------------------------------|
| `REACT_APP_API_HOST` | The address at which the API is hosted. For instance: `api.example.com` or `localhost:8080`. |

> Note: The `.env` file must be formatted as follows:
> ```
> VARIABLE_NAME="value"
> ```

## Authors
The following students worked on this project:
- [Maarten Marx](https://github.com/Maarten-Marx)
- [Rune Van den Heuvel](https://www.github.com/VanDenHeuvelRune)
- [Sebastian Bel](https://github.com/Sebastian-Bel)

