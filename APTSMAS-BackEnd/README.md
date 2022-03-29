# APTSMAS-BackEnd

This is the backend code repository for *Ancient Poets Temporal and Spatial Mobility Analysis System*. You can find all needed code for the backend.

## About this project

This project is inited with Spring Initializr:
* Maven is used for this project, packaging to Jar
* Spring Boot Version is 2.5.4
* Java Version is 11

The detail dependencies can be found in [`pom.xml`](./pom.xml)

## Swagger and OpenAPI

This project is configured with swagger when `application-dev` configure enabled.
* Swagger-UI: access with the related url `/swagger-ui`
* OpenAPI: access with the related url `/api-docs`

## Run Backend

Run dev backend (replace `version` to actually version number):

```shell
java -jar ./data-service-version.jar --spring.profiles.active=dev
// or 
java -jar ./data-service-version.jar -Dspring.profiles.active=dev
```

Run production backend (replace `version` to actually version number):
```shell
java -jar ./data-service-version.jar --spring.profiles.active=prod
// or 
java -jar ./data-service-version.jar -Dspring.profiles.active=prod
```

## Postman and JMeter dumped collection

The related APIs and test dumped from postman and JMeter collection are in [`assets/`](./assets/)

## LICENSE

***All the APTSMAS relevant software copyright has been obtained (Chinese Software Copyright 2022SR0393788).***

The ***Ancient Poets Temporal and Spatial Mobility Analysis System*** (*APTSMAS*) related things follow the **[GPL-3.0](../LICENSE) license**.
