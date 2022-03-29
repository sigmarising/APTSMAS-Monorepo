import os
import json
import DBConnectConfig
from DBClass import DBClass

POETS_PATH = os.path.abspath("../2.AddAttributes/completeGeoInfo")
GEO_2_ID_PATH = os.path.abspath("./VOriginalDataRelated/geo2id.json")

db_instance = DBClass(
    host=DBConnectConfig.host,
    port=DBConnectConfig.port,
    db=DBConnectConfig.db,
    user=DBConnectConfig.user,
    psw=DBConnectConfig.psw
)
sql_id = 0


def handle_geo_related() -> dict:
    global db_instance
    db_instance.execute_sql("DELETE FROM country_name")
    db_instance.execute_sql("DELETE FROM province_name")
    db_instance.execute_sql("DELETE FROM city_name")
    db_instance.execute_sql("DELETE FROM location_name")
    db_instance.execute_sql("DELETE FROM country_location")
    db_instance.execute_sql("DELETE FROM province_location")
    db_instance.execute_sql("DELETE FROM city_location")

    with open(GEO_2_ID_PATH, "r", encoding="utf-8") as f:
        geo2id = json.load(f)

    for country, country_item in geo2id.items():
        db_instance.execute_sql(
            "INSERT INTO `country_name`(`id`, `name`) VALUES (%s, %s)",
            (country_item["id"], country)
        )
        for province, province_item in country_item["content"].items():
            db_instance.execute_sql(
                "INSERT INTO `province_name`(`id`, `name`) VALUES (%s, %s)",
                (province_item["id"], province)
            )
            for city, city_item in province_item["content"].items():
                db_instance.execute_sql(
                    "INSERT INTO `city_name`(`id`, `name`) VALUES (%s, %s)",
                    (city_item["id"], city)
                )
                for location, location_item in city_item["content"].items():
                    db_instance.execute_sql(
                        "INSERT INTO `location_name`(`id`, `name`) VALUES (%s, %s)",
                        (location_item["id"], location)
                    )
                    db_instance.execute_sql(
                        "INSERT INTO `country_location`(`countryId`, `locationId`) VALUES (%s, %s)",
                        (country_item["id"], location_item["id"])
                    )
                    db_instance.execute_sql(
                        "INSERT INTO `province_location`(`provinceId`, `locationId`) VALUES (%s, %s)",
                        (province_item["id"], location_item["id"])
                    )
                    db_instance.execute_sql(
                        "INSERT INTO `city_location`(`cityId`, `locationId`) VALUES (%s, %s)",
                        (city_item["id"], location_item["id"])
                    )

    return geo2id


def handle_lines_related(geo2id: dict) -> None:
    global db_instance
    db_instance.execute_sql("DELETE FROM poet_lines")

    def search_geo_id(country: str, province: str = None, city: str = None, location: str = None) -> str:
        if province is None:
            return geo2id[country]["id"]

        if city is None:
            return geo2id[country]["content"][province]["id"]

        if location is None:
            return geo2id[country]["content"][province]["content"][city]["id"]

        return geo2id[country]["content"][province]["content"][city]["content"][location]["id"]

    def handle_poet_file(file_name: str) -> None:
        global sql_id

        input_filepath = os.path.join(POETS_PATH, file_name)
        with open(input_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        poet_id = data["id"]
        for line in data["travelDetail"]["lines"]:
            for marker in line["markers"]:
                lat = marker["lat"]
                lng = marker["lng"]
                country_id = search_geo_id(marker["country"])
                province_id = search_geo_id(marker["country"], marker["province"])
                city_id = search_geo_id(marker["country"], marker["province"], marker["city"])
                location_id = marker["id"]
                visit_year = marker["visitYear"]

                db_instance.execute_sql(
                    "INSERT INTO `poet_lines`(`id`, `poetId`, `lat`, `lng`, `countryId`,"
                    " `provinceId`, `cityId`, `locationId`, `visitYear`)"
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (sql_id, poet_id, lat, lng, country_id, province_id, city_id, location_id, visit_year)
                )

                sql_id += 1

    input_file_list = os.listdir(POETS_PATH)
    input_file_list.sort()
    for input_file in input_file_list:
        handle_poet_file(input_file)


def main() -> None:
    print("Execute SQLs...")

    geo2id = handle_geo_related()
    print("Handle geos DONE.")
    handle_lines_related(geo2id)
    print("Handle poets DONE.")

    print("ALL DONE!")


if __name__ == '__main__':
    main()
