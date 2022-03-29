import os
import json
import DBConnectConfig
from Save2JsonFile import save_2_json_file
from DBClass import DBClass

INPUT_PATH = os.path.abspath("../2.AddAttributes/completeGeoInfo")
INPUT_GEO_DATAFILE = os.path.abspath("../2.AddAttributes/data/locationsId.json")
OUTPUT_PATH = os.path.abspath("./VOriginalDataRelated")

db_instance = DBClass(
    host=DBConnectConfig.host,
    port=DBConnectConfig.port,
    db=DBConnectConfig.db,
    user=DBConnectConfig.user,
    psw=DBConnectConfig.psw
)


def handle_poets() -> None:
    # drop the old exists data
    global db_instance
    db_instance.execute_sql("DELETE FROM poet_detail")
    db_instance.execute_sql("DELETE FROM geo_poet")

    vuex_poet_id2poet = {}
    vuex_poet_poet2id = {}

    def quick_json_dumps(data: dict) -> str:
        """
        quick dump json data to one line string
        :param data: json data
        :return: one line string
        """
        return json.dumps(data, ensure_ascii=False)

    def handle_poet_file(file_name: str) -> None:
        input_filepath = os.path.join(INPUT_PATH, file_name)
        with open(input_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        # handle vuex thing
        vuex_poet_id2poet[data["id"]] = {
            "name": data["name"],
            "dynasty": data["dynasty"]
        }
        vuex_poet_poet2id[data["name"]] = {
            "id": data["id"],
            "dynasty": data["dynasty"]
        }

        # insert into `poet_detail`
        sql_poet_detail_insert = "INSERT INTO `poet_detail`(" \
                                 "`id`, `name`, `dynasty`, `lifeStart`, `lifeEnd`, `mapConfig`, `reference`," \
                                 " `agesDetail`, `travelDetail`" \
                                 ") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        sql_poet_detail_insert_data = (
            data["id"],
            data["name"],
            data["dynasty"],
            quick_json_dumps(data["lifeDuration"][0]),
            quick_json_dumps(data["lifeDuration"][1]),
            quick_json_dumps(data["mapConfig"]),
            quick_json_dumps(data["reference"]),
            quick_json_dumps(data["agesDetail"]),
            quick_json_dumps(data["travelDetail"])
        )
        db_instance.execute_sql(sql_poet_detail_insert, sql_poet_detail_insert_data)

        # insert into `geo_poet`
        for marker in data["travelDetail"]["markers"]:
            sql_marker_insert = "INSERT INTO `geo_poet`(`geoId`, `poetId`) VALUES (%s, %s)"
            sql_marker_insert_data = (marker["id"], data["id"])
            if not db_instance.execute_sql(sql_marker_insert, sql_marker_insert_data):
                print("  At {}'s marker {}".format(file_name, marker["location"]))

    # handle each file
    input_file_list = os.listdir(INPUT_PATH)
    input_file_list.sort()
    for input_file in input_file_list:
        handle_poet_file(input_file)

    # save json
    save_2_json_file(OUTPUT_PATH, "id2poet.json", vuex_poet_id2poet)
    save_2_json_file(OUTPUT_PATH, "poet2id.json", vuex_poet_poet2id)


def handle_geo() -> None:
    # drop the old exists data
    global db_instance
    db_instance.execute_sql("DELETE FROM geo_detail")

    vuex_geo2id = {}
    vuex_id2geo = {}

    with open(INPUT_GEO_DATAFILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    # handle
    for country_key, country_item in data.items():
        vuex_geo2id[country_key] = {
            "id": country_item["id"],
            "content": {}
        }
        vuex_id2geo[country_item["id"]] = {
            "name": country_key,
            "type": "country"
        }
        for province_key, province_item in country_item["content"].items():
            vuex_geo2id[country_key]["content"][province_key] = {
                "id": province_item["id"],
                "content": {}
            }
            vuex_id2geo[province_item["id"]] = {
                "name": province_key,
                "type": "province"
            }
            for city_key, city_item in province_item["content"].items():
                vuex_geo2id[country_key]["content"][province_key]["content"][city_key] = {
                    "id": city_item["id"],
                    "content": {}
                }
                vuex_id2geo[city_item["id"]] = {
                    "name": city_key,
                    "type": "city"
                }
                for location_key, location_item in city_item["content"].items():
                    vuex_geo2id[country_key]["content"][province_key]["content"][city_key]["content"][location_key] = {
                        "id": location_item["id"]
                    }
                    vuex_id2geo[location_item["id"]] = {
                        "name": location_key,
                        "type": "location"
                    }

                    sql_insert = "INSERT INTO `geo_detail`(`id`, `country`, `province`, `city`, `location`)" \
                                 "VALUES (%s, %s, %s, %s, %s)"
                    sql_insert_data = (location_item["id"], country_key, province_key, city_key, location_key)
                    db_instance.execute_sql(sql_insert, sql_insert_data)

    save_2_json_file(OUTPUT_PATH, "geo2id.json", vuex_geo2id)
    save_2_json_file(OUTPUT_PATH, "id2geo.json", vuex_id2geo)


def main() -> None:
    print("Execute SQLs...")

    handle_poets()
    print("Handle poets DONE.")
    handle_geo()
    print("Handle geo DONE.")

    print("ALL DONE!")


if __name__ == '__main__':
    main()
