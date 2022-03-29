import csv
import json
import os
import colorama as c
from tqdm import tqdm

INPUT_DATA_DIR = os.path.abspath("./dist")
OUTPUT_DATA_DIR = os.path.abspath("./output")
REF_FOREIGN_DIR = "./data/DONE-ForeignLocationLuyou.csv"
REF_DETAIL_DIR = "./data/DONE-MissDetailLuyou.csv"
STORE_FOREIGN = {}
STORE_DETAIL = {}
HANDLE_LOG = []


def read_ref_foreign() -> None:
    """
    Read the DONE-ForeignLocation.csv to dict
    {
        FileName: {
            Location1: {},
            Location2: {}
        }
    }
    """
    with open(REF_FOREIGN_DIR, "r", encoding="utf-8") as f:
        reader = csv.reader(f)

        for line_arr in reader:
            if reader.line_num == 1:
                continue
            else:
                file, location, lng, lat, city, province, country = line_arr
                obj = {
                    "lng": float(lng),
                    "lat": float(lat),
                    "city": city,
                    "province": province,
                    "country": country
                }

                if file in STORE_FOREIGN:
                    if location in STORE_FOREIGN[file]:
                        pass
                    else:
                        STORE_FOREIGN[file][location] = obj
                else:
                    STORE_FOREIGN[file] = {}
                    STORE_FOREIGN[file][location] = obj


def read_ref_detail() -> None:
    """
    Read the DONE-MissDetail.csv to dict
    {
        FileName: {
            Location1: {},
            Location2: {}
        }
    }
    """
    with open(REF_DETAIL_DIR, "r", encoding="utf-8") as f:
        reader = csv.reader(f)

        for line_arr in reader:
            if reader.line_num == 1:
                continue
            else:
                file, location, lng, lat, is_in_line, action = line_arr
                obj = {
                    "lng": lng,
                    "lat": lat,
                    "isInLine": is_in_line,
                    "action": action
                }

                if file in STORE_DETAIL:
                    if location in STORE_DETAIL[file]:
                        pass
                    else:
                        STORE_DETAIL[file][location] = obj
                else:
                    STORE_DETAIL[file] = {}
                    STORE_DETAIL[file][location] = obj


def _handle_missed_poi(marker: dict, filename: str) -> None:
    """
    Judge the marker whether need to add poi information

    Args:
        marker: the marker dict obj
        filename: the filename
    """
    if marker["city"] is None and marker["province"] is None and marker["country"] is None:
        location = marker["location"]
        if location in STORE_FOREIGN[filename]:
            marker["city"] = STORE_FOREIGN[filename][location]["city"]
            marker["province"] = STORE_FOREIGN[filename][location]["province"]
            marker["country"] = STORE_FOREIGN[filename][location]["country"]

            HANDLE_LOG.append("Handle the {0}'s marker {1}'s poi information.".format(
                filename, location
            ))


def handle_input_data(data: dict, filename: str) -> dict:
    """
    Handle the input data, add poi info and remove the detail == 0

    Args:
        data: input json data
        filename: the filename

    Returns:
        handled done json data
    """
    def __dont_need_remove(x: dict) -> bool:
        """
        Used in handle_input_data, filter all detail len == 0 obj

        Args:
            x: the dict obj

        Returns:
            don't need remove: True
            need remove: False
        """
        if len(x["detail"]) == 0:
            if x["location"] in STORE_DETAIL[filename]:
                HANDLE_LOG.append("Remove the {0}'s marker {1}.".format(filename, x["location"]))
                return False

        return True

    # decorate poi information in lines
    for line in data["travelDetail"]["lines"]:
        for marker in line["markers"]:
            _handle_missed_poi(marker, filename)

    # decorate poi information in markers
    for marker in data["travelDetail"]["markers"]:
        _handle_missed_poi(marker, filename)

    # remove the detail len == 0
    data["travelDetail"]["markers"] = list(filter(__dont_need_remove, data["travelDetail"]["markers"]))

    return data


def save_files(data: dict, filename: str) -> None:
    """
    save files

    Args:
        data: json data
        filename: target save filename
    """
    if not os.path.exists(OUTPUT_DATA_DIR):
        os.mkdir(OUTPUT_DATA_DIR)

    filepath = os.path.join(OUTPUT_DATA_DIR, filename)
    with open(filepath, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main() -> None:
    print(c.Fore.GREEN + c.Style.NORMAL + "Init csv to dict....")
    read_ref_detail()
    read_ref_foreign()

    input_file_list = os.listdir(INPUT_DATA_DIR)
    input_file_list.sort()

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            input_file_path = os.path.join(INPUT_DATA_DIR, input_file)
            with open(input_file_path, "r", encoding="utf-8") as f:
                input_data = json.load(f)

            output_data = handle_input_data(input_data, input_file)
            save_files(output_data, input_file)

            process_bar.update(1)
        process_bar.set_description("Handle All Files DONE")

    print(c.Fore.YELLOW + c.Style.NORMAL + "HANDLE LOG:\n" + "\n".join(HANDLE_LOG))
    print(c.Fore.BLUE + c.Style.BRIGHT + "Total handle action is {}.".format(len(HANDLE_LOG)))


if __name__ == '__main__':
    c.init(autoreset=True)
    main()
    c.deinit()
