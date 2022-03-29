# all results are incremental by year
import os
import json
import DBConnectConfig
from DBClass import DBClass

POETS_PATH = os.path.abspath("../2.AddAttributes/completeGeoInfo")
GEO_PATH = os.path.abspath("../2.AddAttributes/data/locations.json")
DEBUG = False

db_instance = DBClass(
    host=DBConnectConfig.host,
    port=DBConnectConfig.port,
    db=DBConnectConfig.db,
    user=DBConnectConfig.user,
    psw=DBConnectConfig.psw
)

MIN_YEAR = 580
MAX_YEAR = 1315
# MAX_REMAIN_ITEMS = 30

edges_cache = {}
points_cache = {}
edges_result = {}
points_result = {}


def form_years_struct() -> dict:
    result = {}

    year = MIN_YEAR
    while year <= MAX_YEAR:
        result[year] = {}
        year += 1

    return result


def handle_all():
    global edges_cache
    global points_cache
    global edges_result
    global points_result

    poet_filename_list = os.listdir(POETS_PATH)
    poet_filename_list.sort()

    # poet
    for poet_filename in poet_filename_list:
        poet_filepath = os.path.join(POETS_PATH, poet_filename)
        with open(poet_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        # marker
        pre_marker = None
        for line in data["travelDetail"]["lines"]:
            for marker in line["markers"]:
                year = marker["visitYear"]
                location_id = marker["id"]
                lng = marker["lng"]
                lat = marker["lat"]

                # handle points cache
                if location_id in points_cache:  # already cached
                    points_cache[location_id]["degree"] += 1
                else:  # new cached key
                    points_cache[location_id] = {
                        "lng": lng,
                        "lat": lat,
                        "degree": 1
                    }

                # handle points result, degree just copy from cached
                if location_id in points_result[year]:
                    points_result[year][location_id]["degree"] = points_cache[location_id]["degree"]
                else:
                    points_result[year][location_id] = {
                        "lng": lng,
                        "lat": lat,
                        "degree": points_cache[location_id]["degree"]
                    }

                # handle edge cache and result
                if pre_marker is not None:  # can form a path
                    key = pre_marker["id"] + "-" + location_id

                    if key in edges_cache:  # already cached
                        edges_cache[key]["times"] += 1
                    else:  # new cached key
                        edges_cache[key] = {
                            "fromLng": pre_marker["lng"],
                            "fromLat": pre_marker["lat"],
                            "toLng": lng,
                            "toLat": lat,
                            "times": 1
                        }

                    # handle edges result, times just copy from cached
                    if key in edges_result[year]:
                        edges_result[year][key]["times"] = edges_cache[key]["times"]
                    else:
                        edges_result[year][key] = {
                            "fromLng": pre_marker["lng"],
                            "fromLat": pre_marker["lat"],
                            "toLng": lng,
                            "toLat": lat,
                            "times": edges_cache[key]["times"]
                        }

                # next used
                pre_marker = marker


def formate_result(data: dict, result_type: str) -> dict:
    output = {}

    if result_type == "edges":
        for year, things in data.items():
            output[year] = []
            for k, v in things.items():
                from_id = k.split("-")[0]
                to_id = k.split("-")[1]
                output[year].append({
                    "from": from_id,
                    "to": to_id,
                    "fromLng": v["fromLng"],
                    "fromLat": v["fromLat"],
                    "toLng": v["toLng"],
                    "toLat": v["toLat"],
                    "times": v["times"]
                })

    elif result_type == "points":
        for year, things in data.items():
            output[year] = []
            for k, v in things.items():
                output[year].append({
                    "id": k,
                    "lng": v["lng"],
                    "lat": v["lat"],
                    "degree": v["degree"]
                })

    return output


def main():
    global edges_result
    global points_result
    global db_instance

    if not DEBUG:
        db_instance.execute_sql("DELETE FROM space_scale")

    edges_result = form_years_struct()
    points_result = form_years_struct()

    handle_all()

    if DEBUG:
        with open(os.path.abspath("./VSpaceScaleRelated/edges.json"), "w+", encoding="utf-8") as f:
            json.dump(formate_result(edges_result, "edges"), f, ensure_ascii=False, indent=2)
        with open(os.path.abspath("./VSpaceScaleRelated/points.json"), "w+", encoding="utf-8") as f:
            json.dump(formate_result(points_result, "points"), f, ensure_ascii=False, indent=2)
    else:
        for index, item in enumerate([("edges", edges_result), ("points", points_result)]):
            db_instance.execute_sql(
                "INSERT INTO `space_scale`(`id`, `type`, `content`) VALUES(%s, %s, %s)",
                (index + 1, item[0], json.dumps(formate_result(item[1], item[0]), ensure_ascii=False))
            )

    print("DONE")


if __name__ == '__main__':
    main()
