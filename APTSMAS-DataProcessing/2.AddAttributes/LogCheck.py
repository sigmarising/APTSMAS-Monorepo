import csv
import json
import os
from typing import Tuple

INPUT_DATA_DIR = os.path.abspath("./dist")
OUTPUT_DIR = os.path.abspath("./data")
LOG_FOREIGN = os.path.abspath("./log/ForeignLocationLuyou.log")
LOG_DETAIL = os.path.abspath("./log/MissDetailLuyou.log")


def check_location_in_line(data: dict, location: str) -> bool:
    """
    Check whether the location is in data["travelDetail"]["lines"]

    Args:
        data: the json data
        location: the location string

    Returns:
        in: True
        not in: False
    """
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            if marker["location"] == location:
                return True

    return False


def find_marker_locations_coordinate(data: dict, location: str) -> Tuple[float, float]:
    """
    Find the location's coordinate in data["travelDetail"]["markers"]

    Args:
        data: the json data
        location: the location string

    Returns:
        lng, lat or 0.0, 0.0

    """
    for marker in data["travelDetail"]["markers"]:
        if marker["location"] == location:
            return marker["lng"], marker["lat"]

    return 0.0, 0.0


def find_lines_locations_coordinate(data: dict, location: str) -> Tuple[float, float]:
    """
    Find the location's coordinate in data["travelDetail"]["lines"]

    Args:
        data: the json data
        location: the location string

    Returns:
        lng, lat or 0.0, 0.0

    """
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            if marker["location"] == location:
                if marker["city"] is None and marker["province"] is None and marker["country"] is None:
                    return marker["lng"], marker["lat"]

    return 0.0, 0.0


def handle_log_detail() -> None:
    """
    Read MissDetail.log and rewrite into csv file
    """
    with open(LOG_DETAIL, "r", encoding="utf-8") as f1:
        with open(os.path.join(OUTPUT_DIR, "MissDetailLuyou.csv"), "w", encoding="gbk", newline="") as f2:
            csv_writer = csv.writer(f2)
            csv_writer.writerow(["file", "location", "lng", "lat", "isInLine"])

            for line in f1:
                line_split = line.split(" ")
                filename = line_split[0]
                location = line_split[1]

                filepath = os.path.join(INPUT_DATA_DIR, filename)
                with open(filepath, "r", encoding="utf-8") as f3:
                    json_data = json.load(f3)

                is_location_in_file = check_location_in_line(json_data, location)

                lng, lat = find_marker_locations_coordinate(json_data, location)

                csv_writer.writerow([filename, location, lng, lat, is_location_in_file])


def handle_log_foreign() -> None:
    """
    Read ForeignLocation.log and rewrite into csv file
    """
    files_list = []
    with open(LOG_FOREIGN, "r", encoding="utf-8") as f1:
        for line in f1:
            files_list.append(line.split(" ")[0])

    with open(os.path.join(OUTPUT_DIR, "ForeignLocationLuyou.csv"), "w", encoding="gbk", newline="") as f2:
        csv_writer = csv.writer(f2)
        csv_writer.writerow(["file", "location", "lng", "lat", "city", "province", "country"])

        for file in files_list:
            filepath = os.path.join(INPUT_DATA_DIR, file)
            with open(filepath, "r", encoding="utf-8") as f3:
                json_data = json.load(f3)

            for line in json_data["travelDetail"]["lines"]:
                for marker in line["markers"]:
                    if marker["city"] is None and marker["province"] is None and marker["country"] is None:
                        csv_writer.writerow([
                            file, marker["location"], marker["lng"], marker["lat"], marker["city"], marker["province"],
                            marker["country"]
                        ])

            for marker in json_data["travelDetail"]["markers"]:
                if marker["city"] is None and marker["province"] is None and marker["country"] is None:
                    csv_writer.writerow([
                        file, marker["location"], marker["lng"], marker["lat"], marker["city"], marker["province"],
                        marker["country"]
                    ])


def main() -> None:
    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    print("Handling Log Detail...")
    handle_log_detail()
    print("Handling Log Foreign...")
    handle_log_foreign()
    print("ALL HANDLE DONE")


if __name__ == '__main__':
    main()

