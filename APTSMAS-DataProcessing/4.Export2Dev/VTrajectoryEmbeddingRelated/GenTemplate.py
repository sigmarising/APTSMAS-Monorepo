"""
isNormal Denote:
* 0: False
* 1: True
"""

import os
import json

POETS_PATH = os.path.abspath("../../2.AddAttributes/completeGeoInfo")


def main() -> None:
    filename_list = os.listdir(POETS_PATH)
    filename_list = sorted(filename_list, key=lambda x: int(x.split("_")[0]))

    result = {}

    for filename in filename_list:
        id = str(filename.split("_")[0])
        name = str(filename.split("_")[1].split(".")[0])
        result[id] = {
            "name": name,
            "isNormal": 1,
        }
    
    with open("./template.json", "w+", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    main()
