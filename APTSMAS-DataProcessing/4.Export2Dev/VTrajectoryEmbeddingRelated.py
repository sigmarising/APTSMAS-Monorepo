"""
isNormal Denote:
* 0: False
* 1: True
"""
import os
import json
import DBConnectConfig
from DBClass import DBClass

CATEGORIES_RESULT_PATH = os.path.abspath("./VTrajectoryEmbeddingRelated")

db_instance = DBClass(
    host=DBConnectConfig.host,
    port=DBConnectConfig.port,
    db=DBConnectConfig.db,
    user=DBConnectConfig.user,
    psw=DBConnectConfig.psw
)


def handle_data_file(file_path: str, category_name: int) -> None:
    global db_instance

    with open(file_path, "r", encoding="utf-8") as f:
        data: dict = json.load(f)

    for poet_id, item in data.items():
        is_normal = item["isNormal"]

        db_instance.execute_sql(
            "INSERT INTO `emb_result`(`type`, `poetId`, `normal`) VALUES (%s, %s, %s)",
            (int(category_name), int(poet_id), int(is_normal))
        )


def handle_manifest() -> None:
    global db_instance

    file_path = os.path.join(CATEGORIES_RESULT_PATH, "manifest.json")
    with open(file_path, "r", encoding="utf-8") as f:
        manifest: dict = json.load(f)

    for filename_suffix, type_name in manifest.items():
        db_instance.execute_sql(
            "INSERT INTO `emb_detail`(`type`, `name`) VALUES (%s, %s)",
            (int(filename_suffix), str(type_name))
        )
        handle_data_file(
            os.path.join(CATEGORIES_RESULT_PATH, filename_suffix + ".json"),
            int(filename_suffix)
        )


def main() -> None:
    global db_instance
    db_instance.execute_sql("DELETE FROM emb_result")
    db_instance.execute_sql("DELETE FROM emb_detail")

    print("Execute SQLs...")
    handle_manifest()
    print("ALL DONE!")


if __name__ == '__main__':
    main()
