import json
import os
from tqdm import tqdm

INPUT_DATA_DIR = os.path.abspath("./output")
OUTPUT_DATA_DIR = os.path.abspath("./data/locations.json")
LOCATIONS = {}


def add_in_location(location: str, city: str, province: str, country: str) -> None:
    if country in LOCATIONS:
        if province in LOCATIONS[country]:
            if city in LOCATIONS[country][province]:
                if location in LOCATIONS[country][province][city]:
                    pass
                else:
                    LOCATIONS[country][province][city][location] = None
            else:
                LOCATIONS[country][province][city] = {}
                LOCATIONS[country][province][city][location] = None
        else:
            LOCATIONS[country][province] = {}
            LOCATIONS[country][province][city] = {}
            LOCATIONS[country][province][city][location] = None
    else:
        LOCATIONS[country] = {}
        LOCATIONS[country][province] = {}
        LOCATIONS[country][province][city] = {}
        LOCATIONS[country][province][city][location] = None


def handle_data(data: dict) -> None:
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            add_in_location(marker["location"], marker["city"], marker["province"], marker["country"])

    for marker in data["travelDetail"]["markers"]:
        add_in_location(marker["location"], marker["city"], marker["province"], marker["country"])


def add_locations_list_sort() -> dict:
    new_obj = {}

    for country_key, country in LOCATIONS.items():
        new_obj[country_key] = {}
        for province_key, province in country.items():
            new_obj[country_key][province_key] = {}
            for city_key, city in province.items():
                new_obj[country_key][province_key][city_key] = sorted(list(city.keys()))
            new_obj[country_key][province_key]["cityList"] = sorted(list(province.keys()))
        new_obj[country_key]["provinceList"] = sorted((country.keys()))

    return new_obj


def main() -> None:
    input_file_list = os.listdir(INPUT_DATA_DIR)
    input_file_list.sort()

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            input_file_path = os.path.join(INPUT_DATA_DIR, input_file)
            with open(input_file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            handle_data(data)

            process_bar.update(1)
        process_bar.set_description("All Files Handle DONE")

    new_data = add_locations_list_sort()

    with open(OUTPUT_DATA_DIR, "w+", encoding="utf-8") as f:
        json.dump(new_data, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    main()
