import os
import copy
import json
import DBConnectConfig
from DBClass import DBClass

POETS_PATH = os.path.abspath("../2.AddAttributes/completeGeoInfo")
GEP_PATH = os.path.abspath("../2.AddAttributes/data/locations.json")

db_instance = DBClass(
    host=DBConnectConfig.host,
    port=DBConnectConfig.port,
    db=DBConnectConfig.db,
    user=DBConnectConfig.user,
    psw=DBConnectConfig.psw
)

MIN_YEAR = 580
MAX_YEAR = 1315
MAX_REMAIN_ITEMS = 30

result = {}
final = {}


def form_result_dict() -> dict:
    def _form_year_dict():
        year_obj = {}
        current_year = MIN_YEAR
        while current_year <= MAX_YEAR:
            year_obj[current_year] = {}
            current_year += 1

        return year_obj

    def _get_poet_dict():
        poet_obj = {}
        poet_list = os.listdir(POETS_PATH)
        for poet_item in poet_list:
            poet_str = poet_item.split("_")[1].split(".")[0]
            poet_obj[poet_str] = 0

        return poet_obj

    def _get_geo_dict():
        def _inner_adding(target, typing, keying):
            if keying in target:
                print("WARNING: duplicate `{}` {} key.".format(keying, typing))
            else:
                target[keying] = 0

        with open(GEP_PATH, "r", encoding="utf-8") as f:
            geo_data = json.load(f)

        location_obj = {}
        city_obj = {}
        province_obj = {}
        for country_key, country_item in geo_data.items():
            for province in country_item["provinceList"]:
                _inner_adding(province_obj, "province", province)
                for city in country_item[province]["cityList"]:
                    _inner_adding(city_obj, "city", city)
                    for location in country_item[province][city]:
                        _inner_adding(location_obj, "location", location)

        return location_obj, city_obj, province_obj

    def _get_time_dict():
        year_obj = {}
        decade_obj = {}
        century_obj = {}

        x = MIN_YEAR
        while x <= MAX_YEAR:
            year_obj[x] = 0
            x += 1

        i = MIN_YEAR // 10 * 10
        j = MAX_YEAR // 10 * 10 + 10
        x = i
        while x < j:
            text = str(x) + "-" + str(x + 9)
            decade_obj[text] = 0
            x += 10

        i = MIN_YEAR // 100 * 100
        j = MAX_YEAR // 100 * 100 + 100
        x = i
        while x < j:
            text = str(x) + "-" + str(x + 99)
            century_obj[text] = 0
            x += 100

        return year_obj, decade_obj, century_obj

    def _get_route_dict():
        r_location_obj = {}
        r_city_obj = {}
        r_province_obj = {}

        poet_filename_list = os.listdir(POETS_PATH)
        for poet_filename in poet_filename_list:
            poet_filepath = os.path.join(POETS_PATH, poet_filename)
            with open(poet_filepath, "r", encoding="utf-8") as f:
                data = json.load(f)

            pre_marker = None
            for line in data["travelDetail"]["lines"]:
                for marker in line["markers"]:
                    if pre_marker is not None:
                        route_location = pre_marker["location"] + "->" + marker["location"]
                        route_city = pre_marker["city"] + "->" + marker["city"]
                        route_province = pre_marker["province"] + "->" + marker["province"]

                        r_location_obj[route_location] = 0
                        r_city_obj[route_city] = 0
                        r_province_obj[route_province] = 0

                    pre_marker = marker

        return r_location_obj, r_city_obj, r_province_obj

    obj = {
        "poetTravel": {},
        "locationTravel": {},
        "cityTravel": {},
        "provinceTravel": {},
        "yearTravel": {},
        "decadeTravel": {},
        "centuryTravel": {},
        "routeLocationTravel": {},
        "routeCityTravel": {},
        "routeProvinceTravel": {},
    }
    for key in obj.keys():
        obj[key] = _form_year_dict()

    obj["poetTravel"][MIN_YEAR] = _get_poet_dict()
    obj["locationTravel"][MIN_YEAR], obj["cityTravel"][MIN_YEAR], obj["provinceTravel"][MIN_YEAR] = _get_geo_dict()
    obj["yearTravel"][MIN_YEAR], obj["decadeTravel"][MIN_YEAR], obj["centuryTravel"][MIN_YEAR] = _get_time_dict()
    obj["routeLocationTravel"][MIN_YEAR], obj["routeCityTravel"][MIN_YEAR], obj["routeProvinceTravel"][MIN_YEAR] \
        = _get_route_dict()

    return obj


def handle_with_valid_year(valid_year: int):
    def _get_decade(y: int) -> str:
        start = y // 10 * 10
        end = start + 9
        return str(start) + "-" + str(end)

    def _get_century(y: int) -> str:
        start = y // 100 * 100
        end = start + 99
        return str(start) + "-" + str(end)

    global result

    poet_filename_list = os.listdir(POETS_PATH)
    for poet_filename in poet_filename_list:
        poet_filepath = os.path.join(POETS_PATH, poet_filename)
        with open(poet_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        name = data["name"]
        pre_marker = None
        break_2_next_person = False
        for line in data["travelDetail"]["lines"]:
            if break_2_next_person:
                break
            for marker in line["markers"]:
                year = marker["visitYear"]

                if year < valid_year:
                    pre_marker = marker
                    continue
                elif year > valid_year:
                    break_2_next_person = True
                    break
                else:
                    decade = _get_decade(year)
                    century = _get_century(year)
                    province = marker["province"]
                    city = marker["city"]
                    location = marker["location"]

                    result["poetTravel"][valid_year][name] += 1
                    result["locationTravel"][valid_year][location] += 1
                    result["cityTravel"][valid_year][city] += 1
                    result["provinceTravel"][valid_year][province] += 1
                    result["yearTravel"][valid_year][year] += 1
                    result["decadeTravel"][valid_year][decade] += 1
                    result["centuryTravel"][valid_year][century] += 1

                    if pre_marker is not None:
                        route_location = pre_marker["location"] + "->" + location
                        route_city = pre_marker["city"] + "->" + city
                        route_province = pre_marker["province"] + "->" + province
                        result["routeLocationTravel"][valid_year][route_location] += 1
                        result["routeCityTravel"][valid_year][route_city] += 1
                        result["routeProvinceTravel"][valid_year][route_province] += 1

                    pre_marker = marker


def handle_all_years():
    def _deep_copy_2_next(new_year):
        def _inner_deep_copy(obj, keyword, y):
            obj[keyword][new_year] = copy.deepcopy(obj[keyword][y - 1])

        global result
        _inner_deep_copy(result, "poetTravel", new_year)
        _inner_deep_copy(result, "locationTravel", new_year)
        _inner_deep_copy(result, "cityTravel", new_year)
        _inner_deep_copy(result, "provinceTravel", new_year)
        _inner_deep_copy(result, "yearTravel", new_year)
        _inner_deep_copy(result, "decadeTravel", new_year)
        _inner_deep_copy(result, "centuryTravel", new_year)
        _inner_deep_copy(result, "routeLocationTravel", new_year)
        _inner_deep_copy(result, "routeCityTravel", new_year)
        _inner_deep_copy(result, "routeProvinceTravel", new_year)

    year = MIN_YEAR
    while year <= MAX_YEAR:
        print("\rCurrent Handling The Year {}".format(year), end="")
        if year > MIN_YEAR:
            _deep_copy_2_next(year)

        handle_with_valid_year(year)

        year += 1
    print()


def remove_zero_item():
    global result
    for key, value in result.items():
        for year, year_item in value.items():
            wait_2_remove = []
            for k, v in year_item.items():
                if v == 0:
                    wait_2_remove.append(k)
            for remove_k in wait_2_remove:
                del result[key][year][remove_k]


def remain_top_k_items():
    global result
    global final

    for k, v in result.items():
        final[k] = {}
        for year, year_item in v.items():
            final[k][year] = []
            things: list = list(year_item.keys())
            things = sorted(things, key=lambda x: result[k][year][x], reverse=True)[0: MAX_REMAIN_ITEMS]
            for thing in things:
                final[k][year].append({
                    "name": thing,
                    "value": result[k][year][thing]
                })


def execute_sql():
    global final
    item_id = 0

    db_instance.execute_sql("DELETE FROM time_variant")

    for k, v in final.items():
        item_id += 1
        db_instance.execute_sql(
            "INSERT INTO `time_variant`(`id`, `type`, `content`) VALUES(%s, %s, %s)",
            (item_id, k, json.dumps(v, ensure_ascii=False))
        )


def main():
    global result
    global final
    print("Form Dict Start......")
    result = form_result_dict()
    print("Form Dict DONE\nHandle Years Start......")
    handle_all_years()
    print("Handle Years DONE\nRemove Zero Start......")
    remove_zero_item()
    print("Remove Zero DONE\nStart Sort And Remain......")
    remain_top_k_items()
    print("Start Sort And Remain DONE\nSaving SQL......")
    # with open("./temp.json", "w+", encoding="utf-8") as f:
    #     json.dump(final, f, ensure_ascii=False, indent=2)
    execute_sql()
    print("ALL DONE")


if __name__ == '__main__':
    main()
