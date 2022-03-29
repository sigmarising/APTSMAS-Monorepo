import os
import json

POETS_PATH = os.path.abspath("../2.AddAttributes/completeGeoInfo")


def main():
    max_year = -1
    min_year = 100000
    files_list = os.listdir(POETS_PATH)
    files_list.sort()

    for filename in files_list:
        input_filepath = os.path.join(POETS_PATH, filename)
        with open(input_filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        for line in data["travelDetail"]["lines"]:
            for marker in line["markers"]:
                year = marker["visitYear"]
                if year > max_year:
                    max_year = year
                if year < min_year:
                    min_year = year

    print("min_year = ", min_year)
    print("max_year = ", max_year)


if __name__ == '__main__':
    main()
