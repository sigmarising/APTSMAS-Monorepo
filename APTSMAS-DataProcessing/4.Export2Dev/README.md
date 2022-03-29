# Export 2 Dev

This project contains the scripts which related to export the previous projects (from 1 to 3) to the dev environment (include the frontend vuex or database).

## Virtual Env

The base python version is 3.8.6. And all requirements are in [requirements.txt](./requirements.txt).

> We suggest you change the pip source to ali-source
>
> See [this link for detail.](https://blog.csdn.net/sigmarising/article/details/83009483)

## About the `4.Export2Dev`

This project aims to convert all data from projects (from 1 to 3) and put these data to MySql database. This project is organized by front-end page related. So, the kernel files are:

* `DBDump/`: The dumped sql file from Navicat software of MySql 8.
* `VXxxXxxXxxRelated/`: The page `VXxxXxxXxx` related original data and sql table structure dump (the table structure are created by Navicat)
* `VXxxXxxXxxRelated.py`: Used for convert the original data and automatically put these data to pre-configured MySql database.
* `ConfirmCount.py`: Check used. Summary the original data's total location points and properties.
* `ConfirmYear.py`: Check used. Confirm the original data's min year and max year.
* `DBClass.py`: Class which sealed the apis from pymysql.
* `DBConnectConfig.py`: The configuration of database. These configuration serves the `DBClass.py`.
* `Save2JsonFile.py`: Util to save python dict to json file.
