import os
import json
import colorama as c
from tqdm import tqdm
from typing import Optional

INPUT_DIR_LABELED = os.path.abspath("./labeled")
INPUT_DIR_NEW_ID = os.path.abspath("./recoding")
OUTPUT_DIR = os.path.abspath("./merged")
LOGS_INFO = []


def merge_poet_data(filename: str) -> dict:
    """
    Merge the poet's labeled data to new id file

    Args:
        filename: the target filename such as `0_魏征.json`

    Returns:
        if both labeled file and new id file exist, return the merged json data
        if only new id file exist, return the new id file's data
    """
    data_labeled: Optional[dict] = None
    data_new_id: Optional[dict] = None
    data_return: Optional[dict] = None

    filepath_new_id = os.path.join(INPUT_DIR_NEW_ID, filename)
    filepath_labeled = os.path.join(INPUT_DIR_LABELED, filename)

    with open(filepath_new_id, "r", encoding="utf-8") as f:
        data_new_id = json.load(f)

    if not os.path.exists(filepath_labeled):
        LOGS_INFO.append("Just Return the {0} because the labeled file don't exist.".format(filename))
        return data_new_id

    with open(filepath_labeled, "r", encoding="utf-8") as f:
        data_labeled = json.load(f)

    data_return = data_new_id
    for index_line, line in enumerate(data_return["travelDetail"]["lines"]):
        for index_marker, marker in enumerate(line["markers"]):
            labeled_year = data_labeled["travelDetail"]["lines"][index_line]["markers"][index_marker]["visitYear"]
            marker["visitYear"] = labeled_year

    return data_return


def save_json_2_file(data: dict, filepath: str) -> None:
    """
    save files

    Args:
        data: json data
        filepath: target save filename
    """
    with open(filepath, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main() -> None:
    input_file_list = os.listdir(INPUT_DIR_NEW_ID)
    input_file_list.sort()

    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            merged_data = merge_poet_data(input_file)
            output_file_path = os.path.join(OUTPUT_DIR, input_file)
            save_json_2_file(merged_data, output_file_path)

            process_bar.update(1)
        process_bar.set_description("Handle All Files DONE")

    print(c.Fore.YELLOW + c.Style.NORMAL + "HANDLE LOGS:\n" + "\n".join(LOGS_INFO))
    print(c.Fore.GREEN + c.Style.BRIGHT + "DONE")


if __name__ == '__main__':
    main()
