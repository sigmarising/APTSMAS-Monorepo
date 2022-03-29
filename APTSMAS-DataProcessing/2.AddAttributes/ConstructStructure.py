import os
import json
import re
import requests
import random
import datetime
import time
import traceback
import colorama as c
from tqdm import tqdm
from typing import Dict, Tuple, Optional

DATA_DIR = os.path.abspath("../1.DataCrawling/dist")
OUTPUT_DIR = os.path.abspath("./dist")
LOG_DIR = os.path.abspath("./log")
AMPA_API_CONVERT = "https://restapi.amap.com/v3/assistant/coordinate/convert"
AMPA_API_RE_SEARCH = "https://restapi.amap.com/v3/geocode/regeo"
AMPA_API_KEY = "350da9ed6b67377c548de3a6b1419cf8"
RE_HTML_TAG = re.compile(r"<[^>]*>")
RE_AGE_MODE_1 = re.compile(r"^[\d]+岁$")
RE_AGE_MODE_2 = re.compile(r"^[\d]+-[\d]+岁$")
# RE_AGE_MODE_1_DOT = re.compile(r"^，[\d]+岁$")
# RE_AGE_MODE_2_DOT = re.compile(r"^，[\d]+-[\d]+岁$")
RE_YEAR_MODE_1 = re.compile(r"^[\d]+年$")
RE_YEAR_MODE_2 = re.compile(r"^[\d]+-[\d]+年$")
RE_YEAR_MODE_1_DOT = re.compile(r"^[\d]+年")
RE_YEAR_MODE_2_DOT = re.compile(r"^[\d]+-[\d]+年")
ERROR_LIST = []
WARNING_LIST = []
RANDOM_SLEEP_MS_RANGE = (10, 100)
RANDOM_SLEEP_DISABLE = True


def random_sleep() -> None:
    """
    Random sleep for a while to avoid the frequency api access
    """
    if not RANDOM_SLEEP_DISABLE:
        rand_time = random.randrange(RANDOM_SLEEP_MS_RANGE[0], RANDOM_SLEEP_MS_RANGE[1])
        time.sleep(float(rand_time) / 1000.0)


def coordinate_convert(lng: float, lat: float) -> Tuple[Optional[float], Optional[float]]:
    """
    Using AMap Api to convert baidu coordinate

    Args:
        lng: baidu lng, float
        lat: baidu lat, float

    Returns:
        Convert Success: (amap_lng: float, amap_lat: float)
        Convert Failed: (None, None)
    """
    random_sleep()

    params = {
        "locations": str(lng) + "," + str(lat),
        "coordsys": "baidu",
        "key": AMPA_API_KEY
    }

    r = requests.get(AMPA_API_CONVERT, params=params)
    res = r.json()

    if res["status"] == "1":
        locations = res["locations"].split(",")
        amap_lng = round(float(locations[0]), 6)
        amap_lat = round(float(locations[1]), 6)

        return amap_lng, amap_lat
    else:
        err_msg = "[ERROR]: Wrong when convert baidu coordinate of lng:{0} lat:{1}. Err Msg is {2}.".format(
            lng, lat, res["info"]
        )
        ERROR_LIST.append(err_msg)

        return None, None


def re_geography_search(lng: float, lat: float) -> Optional[Dict[str, Optional[str]]]:
    """
    Re-Search the coordinate's geography information

    Args:
        lng: amap lng, float
        lat: amap lat, float

    Returns:
        API request Success:
            obj = {"city", "province", "country"}
            if all three obj keys is None, This is a foreign country coordinate
        API request Failed:
            None
    """
    random_sleep()

    params = {
        "location": str(lng) + "," + str(lat),
        "extensions": "base",
        "key": AMPA_API_KEY
    }

    r = requests.get(AMPA_API_RE_SEARCH, params=params)
    res = r.json()

    if res["status"] == "1":
        obj = {
            "city": res["regeocode"]["addressComponent"]["city"],
            "province": res["regeocode"]["addressComponent"]["province"],
            "country": res["regeocode"]["addressComponent"]["country"]
        }

        if obj["city"] and obj["province"] and obj["country"]:
            return obj
        else:
            return {"city": None, "province": None, "country": None}
    else:
        err_msg = "[ERROR]: Wrong when re-search coordinate of lng:{0} lat:{1}. Err Msg is {2}.".format(
            lng, lat, res["info"]
        )
        ERROR_LIST.append(err_msg)

        return None


def remove_html_tag(raw_str: str) -> str:
    """
    Remove the html tag in raw str, and remove the \u3000
    The remove part will be replaced with | for future use

    Args:
        raw_str: str wait to process

    Returns:
        the processed str
    """
    s = RE_HTML_TAG.split(raw_str)
    s = "|".join(list(filter(None, s)))
    s = s.replace("\u3000", "|")

    return s


def handle_raw_data(raw_data: dict, filename: str) -> Dict[str, any]:
    """
    handle the raw data, and add all attributes fields

    Args:
        raw_data: the raw json
        filename: origin filename

    Returns:
        Handled Done json
    """
    data = raw_data["Traces"][0]
    target = {
        "id": None,
        "name": None,
        "dynasty": None,
        "lifeDuration": [0, 0],
        "mapConfig": {
            "center": {
                "lat": 0.0,
                "lng": 0.0
            },
            "scaleLevel": 1
        },
        "reference": [],
        "agesDetail": [],
        "travelDetail": {
            "lines": [],
            "markers": []
        },
        "trajectoryEmbedding": {}
    }

    # Fill in id, name and dynasty
    filename_splits = filename.split(".json")[0].split("_")
    target["id"] = int(filename_splits[0])
    target["name"] = filename_splits[1]
    target["dynasty"] = "唐" if target["id"] <= 46 else "宋"

    # Fill in life duration
    title_splits = remove_html_tag(data["Title"]).split("|")
    title_splits = title_splits[1].split("-")
    target["lifeDuration"][0] = int(title_splits[0].split("(")[1])
    target["lifeDuration"][1] = int(title_splits[1].split(")")[0])

    # Fill in mapConfig
    amap_center_lng, amap_center_lat = coordinate_convert(lng=data["CenterLongitude"], lat=data["CenterLatitude"])
    if amap_center_lng is not None and amap_center_lat is not None:
        target["mapConfig"]["center"]["lng"] = amap_center_lng
        target["mapConfig"]["center"]["lat"] = amap_center_lat
    else:
        warning_msg = "[WARNING]: file {0}'s map center lat and lng convert failed.".format(filename)
        WARNING_LIST.append(warning_msg)
    target["mapConfig"]["scaleLevel"] = data["ZoomLevel"]

    # Fill in references and ages detail
    detail_splits = remove_html_tag(data["Detail"]).split("|")
    for detail_item in detail_splits:
        if "引用书目" in detail_item:
            target["reference"] = [
                "《" + y + "》"
                for y in [x.split("》")[0] for x in detail_item.split("《")][1:]
            ]
        elif RE_AGE_MODE_1.search(detail_item) is not None:
            obj = {
                "agesDuration": [0, 0],
                "correspondPath": []
            }
            obj["agesDuration"][0] = int(detail_item.split("岁")[0])
            obj["agesDuration"][1] = obj["agesDuration"][0]
            target["agesDetail"].append(obj)
        elif RE_AGE_MODE_2.search(detail_item) is not None:
            obj = {
                "agesDuration": [0, 0],
                "correspondPath": []
            }
            detail_item_splits = detail_item.split("-")
            obj["agesDuration"][0] = int(detail_item_splits[0])
            obj["agesDuration"][1] = int(detail_item_splits[1].split("岁")[0])
            target["agesDetail"].append(obj)
        elif "录入整理" not in detail_item and "→" not in detail_item:
            last_index = len(target["agesDetail"]) - 1
            last_obj = target["agesDetail"][last_index]
            last_obj["correspondPath"].append(detail_item)

    # Fill in travelDetail->lines
    for line in data["Lines"]:
        line_obj = {
            "markers": []
        }

        for marker in line["Markers"]:
            marker_obj = {
                "id": marker["Id"],
                "lat": 0.0,
                "lng": 0.0,
                "regionId": marker["RegionId"],
                "location": marker["Title"],
                "city": None,
                "province": None,
                "country": None,
                "visitYear": None
            }

            amap_lng, amap_lat = coordinate_convert(marker["Longitude"], marker["Latitude"])
            if amap_lng is not None and amap_lat is not None:
                marker_obj["lng"] = amap_lng
                marker_obj["lat"] = amap_lat

                re_geo_obj = re_geography_search(lng=amap_lng, lat=amap_lat)
                if re_geo_obj is not None:
                    if re_geo_obj["city"] and re_geo_obj["province"] and re_geo_obj["country"]:
                        marker_obj["city"] = re_geo_obj["city"]
                        marker_obj["province"] = re_geo_obj["province"]
                        marker_obj["country"] = re_geo_obj["country"]
                    else:
                        warning_msg = "[WARNING]: file {0}'s location {1} maybe a foreign country location.".format(
                            filename, marker["Title"]
                        )
                        WARNING_LIST.append(warning_msg)
                else:
                    warning_msg = "[WARNING]: file {0}'s location {1} re-geo search failed.".format(
                        filename, marker["Title"]
                    )
                    WARNING_LIST.append(warning_msg)

            else:
                warning_msg = "[WARNING]: file {0}'s location {1} lng:{2} lat:{3} convert failed.".format(
                    filename, marker["Title"], marker["Longitude"], marker["Latitude"]
                )
                WARNING_LIST.append(warning_msg)

            line_obj["markers"].append(marker_obj)

        target["travelDetail"]["lines"].append(line_obj)

    # Fill in travelDetail->markers
    for marker in data["Markers"]:
        obj = {
            "lat": 0.0,
            "lng": 0.0,
            "id": None,
            "regionId": marker["RegionId"],
            "location": marker["Title"].split(" ")[0],
            "city": None,
            "province": None,
            "country": None,
            "visitTimes": None,
            "visitYears": [],
            "detail": []
        }

        amap_lng, amap_lat = coordinate_convert(marker["Longitude"], marker["Latitude"])
        if amap_lng is not None and amap_lat is not None:
            obj["lng"] = amap_lng
            obj["lat"] = amap_lat

            re_geo_obj = re_geography_search(lng=amap_lng, lat=amap_lat)
            if re_geo_obj is not None:
                if re_geo_obj["city"] and re_geo_obj["province"] and re_geo_obj["country"]:
                    obj["city"] = re_geo_obj["city"]
                    obj["province"] = re_geo_obj["province"]
                    obj["country"] = re_geo_obj["country"]
                else:
                    warning_msg = "[WARNING]: file {0}'s location {1} maybe a foreign country location.".format(
                        filename, marker["Title"]
                    )
                    WARNING_LIST.append(warning_msg)
            else:
                warning_msg = "[WARNING]: file {0}'s location {1} re-geo search failed.".format(
                    filename, marker["Title"]
                )
                WARNING_LIST.append(warning_msg)

        else:
            warning_msg = "[WARNING]: file {0}'s location {1} lng:{2} lat:{3} convert failed.".format(
                filename, marker["Title"], marker["Longitude"], marker["Latitude"]
            )
            WARNING_LIST.append(warning_msg)

        if "Detail" in marker:
            detail_splits = list(filter(None, remove_html_tag(marker["Detail"]).split("|")))
            index = 0
            while index < len(detail_splits):
                detail_item = detail_splits[index]

                if RE_YEAR_MODE_1_DOT.search(detail_item) or RE_YEAR_MODE_2_DOT.search(detail_item):
                    if index + 1 < len(detail_splits):
                        detail_str = detail_item + " " + detail_splits[index + 1]
                        obj["detail"].append(detail_str)

                        index += 1
                    else:
                        pass
                else:
                    pass

                index += 1
            # while index < len(detail_splits):
            #     detail_item = detail_splits[index]
            #
            #     if RE_YEAR_MODE_1.search(detail_item) is not None:
            #         year = int(detail_item.split("年")[0])
            #
            #         if index + 1 < len(detail_splits):
            #             if RE_AGE_MODE_1_DOT.search(detail_splits[index + 1]) is not None:
            #                 age = int(detail_splits[index + 1].split("岁")[0].split("，")[1])
            #                 detail_obj = {
            #                     "yearsDuration": [year, year],
            #                     "agesDuration": [age, age],
            #                     "detail": []
            #                 }
            #
            #                 obj["detail"].append(detail_obj)
            #             else:
            #                 len_detail = len(obj["detail"])
            #                 obj["detail"][len_detail - 1]["detail"].append(
            #                     detail_item + " " + detail_splits[index + 1]
            #                 )
            #
            #             index += 1
            #         else:
            #             pass
            #     elif RE_YEAR_MODE_2.search(detail_item) is not None:
            #         year_splits = detail_item.split("-")
            #         year1 = int(year_splits[0])
            #         year2 = int(year_splits[1].split("年")[0])
            #
            #         if index + 1 < len(detail_splits):
            #             if RE_AGE_MODE_2_DOT.search(detail_splits[index + 1]) is not None:
            #                 age_splits = detail_splits[index + 1].split("-")
            #                 age1 = int(age_splits[0].split("，")[1])
            #                 age2 = int(age_splits[1].split("岁")[0])
            #                 detail_obj = {
            #                     "yearsDuration": [year1, year2],
            #                     "agesDuration": [age1, age2],
            #                     "detail": []
            #                 }
            #
            #                 obj["detail"].append(detail_obj)
            #             else:
            #                 len_detail = len(obj["detail"])
            #                 obj["detail"][len_detail - 1]["detail"].append(
            #                     detail_item + " " + detail_splits[index + 1]
            #                 )
            #
            #             index += 1
            #         else:
            #             pass
            #
            #     index += 1
        else:
            warning_msg = "[WARNING]: file {0}'s marker {1} don't have the Detail Field.".format(
                filename, marker["Title"]
            )
            WARNING_LIST.append(warning_msg)

        target["travelDetail"]["markers"].append(obj)

    return target


def save_file(filename: str, data: dict) -> None:
    """
    save the json data to files

    Args:
        filename: the filename such as 0_魏征.json
        data: the json data
    """
    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    file_path = os.path.join(OUTPUT_DIR, filename)
    with open(file_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def save_log() -> None:
    """
    Save and print the error and warning msg list.
    """
    if not os.path.exists(LOG_DIR):
        os.mkdir(LOG_DIR)

    time_name = datetime.datetime.now().strftime("%Y.%m.%d-%H.%M.%S")
    error_filepath = os.path.join(LOG_DIR, "Error_" + time_name + ".log")
    warning_filepath = os.path.join(LOG_DIR, "Warning_" + time_name + ".log")

    msg = "\n".join(ERROR_LIST)
    print("The Err Msg is:\n" + c.Fore.RED + c.Style.NORMAL + msg)
    with open(error_filepath, "w+", encoding="utf-8") as f:
        f.write(msg)

    msg = "\n".join(WARNING_LIST)
    print("The Warning Msg is:\n" + c.Fore.YELLOW + c.Style.NORMAL + msg)
    with open(warning_filepath, "w+", encoding="utf-8") as f:
        f.write(msg)


def main() -> None:
    # origin data source list
    files_list = os.listdir(DATA_DIR)
    files_list.sort()

    print(c.Fore.GREEN + c.Style.BRIGHT + "- START CONSTRUCTING FROM FILES - ")

    # process data
    try:
        with tqdm(total=len(files_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
            for filename in files_list:
                process_bar.set_description("Handling {0}".format(filename))

                filepath = os.path.join(DATA_DIR, filename)
                out_filepath = os.path.join(OUTPUT_DIR, filename)
                # because the ampa api may don't work
                # this script may not be done by one time run
                # this statement block is used for multi-run
                if os.path.exists(out_filepath):
                    process_bar.update(1)
                    continue

                with open(filepath, "r", encoding="utf-8") as f:
                    raw_data = json.load(f)

                handled_data = handle_raw_data(raw_data, filename)
                save_file(filename, handled_data)

                process_bar.update(1)
            process_bar.set_description("Handle All Files DONE")

        save_log()
        print(c.Fore.GREEN + c.Style.BRIGHT + "- CONSTRUCT DONE - ")

    except Exception as e:
        save_log()

        print(c.Fore.YELLOW + c.Style.BRIGHT + "Exception: " + str(e))
        traceback.print_exc()
        print(c.Fore.RED + c.Style.BRIGHT + "CONSTRUCT FAILED: Should re-run the script.")


if __name__ == '__main__':
    c.init(autoreset=True)
    main()
    c.deinit()
