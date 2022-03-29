import os
import json
import colorama as c
from tqdm import tqdm

INPUT_DIR = os.path.abspath("./mergedNewId")
OUTPUT_DIR = os.path.abspath("./completeGeoInfo")
LOGS_INFO = []


def save_json_2_file(data: dict, filepath: str) -> None:
    """
    save files

    Args:
        data: json data
        filepath: target save filename
    """
    with open(filepath, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def handle_poet(filename: str) -> None:
    input_filepath = os.path.join(INPUT_DIR, filename)
    with open(input_filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    geo_summary = {}
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            location_id = marker["id"]
            visit_year = marker["visitYear"]

            if location_id in geo_summary:
                geo_summary[location_id]["visitTimes"] += 1
                geo_summary[location_id]["visitYears"].append(visit_year)
            else:
                geo_summary[location_id] = {
                    "visitTimes": 1,
                    "visitYears": [visit_year]
                }

    for marker in data["travelDetail"]["markers"]:
        marker_id = marker["id"]
        if marker_id in geo_summary:
            marker["visitTimes"] = geo_summary[marker_id]["visitTimes"]
            marker["visitYears"] = geo_summary[marker_id]["visitYears"]
        else:
            LOGS_INFO.append("Can't get the {0}-{1}'s detail geo info.".format(filename, marker["location"]))

    output_filepath = os.path.join(OUTPUT_DIR, filename)
    with open(output_filepath, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main() -> None:
    input_file_list = os.listdir(INPUT_DIR)
    input_file_list.sort()

    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            handle_poet(input_file)

            process_bar.update(1)
        process_bar.set_description("Handle All Files DONE")

    print(c.Fore.YELLOW + c.Style.NORMAL + "HANDLE LOGS:\n" + "\n".join(LOGS_INFO))
    print(c.Fore.GREEN + c.Style.BRIGHT + "DONE")


if __name__ == '__main__':
    main()
