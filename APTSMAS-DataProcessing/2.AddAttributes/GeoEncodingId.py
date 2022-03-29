import os
import json
import colorama as c
from tqdm import tqdm
from typing import Optional


INPUT_DIR = os.path.abspath("./output")
OUTPUT_DIR = os.path.abspath("./recoding")
GEO_PATH = os.path.abspath("./data/locations.json")
GEO_ID_PATH = os.path.abspath("./data/locationsId.json")
GEO_STORE = {}
LOGS_INFO = []


def handle_geo_raw_data(raw_data: dict) -> dict:
    """
    Handle the raw geography json obj
    Encoding all level locations and return the new json obj

    Args:
        raw_data: origin json data read from GEP_PATH

    Returns:
        {
            "中国": {
                "id": 123,
                "content": {
                    "河北省": {
                        "id": 1231,
                        "content: {
                            "沧州市": {
                                "id": 12312,
                                "content": {
                                    "河间": {
                                        "id": 123123,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    """
    result = {}

    country_int_id = 0
    for country, country_content in raw_data.items():

        country_int_id += 1
        country_str_id = str(country_int_id).zfill(3)

        result[country] = {
            "id": country_str_id,
            "content": {}
        }

        province_int_id = 0
        for province, province_content in country_content.items():
            if province == "provinceList":
                continue

            province_int_id += 1
            province_str_id = country_str_id + str(province_int_id).zfill(3)

            result[country]["content"][province] = {
                "id": province_str_id,
                "content": {}
            }

            city_int_id = 0
            for city, city_content in province_content.items():
                if city == "cityList":
                    continue

                city_int_id += 1
                city_str_id = province_str_id + str(city_int_id).zfill(4)

                result[country]["content"][province]["content"][city] = {
                    "id": city_str_id,
                    "content": {}
                }

                location_int_id = 0
                for location in city_content:

                    location_int_id += 1
                    location_str_id = city_str_id + str(location_int_id).zfill(4)

                    result[country]["content"][province]["content"][city]["content"][location] = {
                        "id": location_str_id
                    }

    return result


def _lookup_marker_id(marker: dict, filename: str) -> Optional[str]:
    """
    lookup marker's location id

    Args:
        marker: the marker obj, should contain the key country, province, city, location
        filename: the filename

    Returns:
        lookup success: string id
        lookup failed: None
    """
    global GEO_STORE

    country = marker["country"]
    province = marker["province"]
    city = marker["city"]
    location = marker["location"]

    if country in GEO_STORE:
        if province in GEO_STORE[country]["content"]:
            if city in GEO_STORE[country]["content"][province]["content"]:
                if location in GEO_STORE[country]["content"][province]["content"][city]["content"]:
                    return GEO_STORE[country]["content"][province]["content"][city]["content"][location]["id"]
                else:
                    LOGS_INFO.append("{}-{}-{}-{}-{}'s id lookup failed.".format(
                        filename, country, province, city, location
                    ))
                    return None
            else:
                LOGS_INFO.append("{}-{}-{}-{}'s id lookup failed.".format(
                    filename, country, province, city
                ))
                return None
        else:
            LOGS_INFO.append("{}-{}-{}'s id lookup failed.".format(
                filename, country, province
            ))
            return None
    else:
        LOGS_INFO.append("{}-{}'s id lookup failed.".format(
            filename, country
        ))
        return None


def handle_poet_data(data: dict, filename: str) -> dict:
    """
    handle the poet json data, re-encoding the location's id

    Args:
        data: the poet's json data
        filename: the filename

    Returns:
        new poet's json data after re-encoding id
    """
    # handle id information in lines
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            encoding_id = _lookup_marker_id(marker, filename)
            marker["id"] = encoding_id
            marker["regionId"] = encoding_id

    # handle id information in markers
    for marker in data["travelDetail"]["markers"]:
        encoding_id = _lookup_marker_id(marker, filename)
        marker["id"] = encoding_id
        marker["regionId"] = encoding_id

    return data


def save_json_2_file(data: dict, filepath: str) -> None:
    """
    save files

    Args:
        data: json data
        filepath: target save filename
    """
    with open(filepath, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main():
    print(c.Fore.GREEN + c.Style.NORMAL + "Handle GEO file and re-encoding id...")
    with open(GEO_PATH, "r", encoding="utf-8") as f:
        global GEO_STORE
        GEO_STORE = handle_geo_raw_data(json.load(f))

    input_file_list = os.listdir(INPUT_DIR)
    input_file_list.sort()

    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            input_file_path = os.path.join(INPUT_DIR, input_file)
            with open(input_file_path, "r", encoding="utf-8") as f:
                input_data = json.load(f)

            output_data = handle_poet_data(input_data, input_file)
            output_file_path = os.path.join(OUTPUT_DIR, input_file)
            save_json_2_file(output_data, output_file_path)

            process_bar.update(1)
        process_bar.set_description("Handle All Files DONE")

    save_json_2_file(GEO_STORE, GEO_ID_PATH)

    print(c.Fore.YELLOW + c.Style.NORMAL + "HANDLE LOGS:\n" + "\n".join(LOGS_INFO))
    print(c.Fore.GREEN + c.Style.BRIGHT + "DONE")


if __name__ == '__main__':
    c.init(autoreset=True)
    main()
    c.deinit()
