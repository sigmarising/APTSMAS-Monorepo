import os
import json

POETS_PATH = os.path.abspath("../../2.AddAttributes/completeGeoInfo")


def main() -> None:
    filename_list = os.listdir(POETS_PATH)
    filename_list = sorted(filename_list, key=lambda x: int(x.split("_")[0]))

    result = []

    for filename in filename_list:
        with open(os.path.join(POETS_PATH, filename), "r", encoding="utf-8") as f:
            data = json.load(f)

        name = data["name"]
        points_num = len(data["travelDetail"]["lines"][0]["markers"])

        result.append({"name": name, "num": points_num})

    result = sorted(result, key=lambda x: x["num"])

    for i in result:
        print(i)


if __name__ == '__main__':
    main()
