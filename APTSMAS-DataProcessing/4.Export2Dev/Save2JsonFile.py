import os
import json


def save_2_json_file(output_path: str, file_name: str, json_data: dict) -> None:
    """
    Save json data to file, if the output path don't exist, create it first
    :param output_path: the output_path
    :param file_name: the file_name like `a.json`
    :param json_data: the json data
    :return: None
    """
    if not os.path.exists(output_path):
        os.mkdir(output_path)

    full_file_path: str = os.path.join(output_path, file_name)

    with open(full_file_path, "w+", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)
