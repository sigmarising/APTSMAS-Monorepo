import os
from tqdm import tqdm

LOG_DIR = os.path.abspath("./log")
MSG_FOREIGN = "maybe a foreign country location"
MSG_DETAIL = "don't have the Detail Field"


def handle_msg_foreign_line(line: str) -> str:
    """
    Handle the msg line of MSG_FOREIGN

    Args:
        line: the origin string

    Returns:
        the handled simplify string msg
    """
    line_split = line.split(" ")

    file_name = line_split[2].split("'")[0]
    locations = line_split[4]

    return file_name + " " + locations + " MaybeAForeignCountry."


def handle_msg_detail_line(line: str) -> str:
    """
    Handle the msg line of MSG_DETAIL

    Args:
        line: the origin string

    Returns:
        the handled simplify string msg
    """
    line_split = line.split(" ")

    file_name = line_split[2].split("'")[0]
    locations = line_split[4]

    return file_name + " " + locations + " DontHaveDetailField."


def save_file(filepath: str, msg_list: list) -> None:
    with open(filepath, "w+", encoding="utf-8") as f:
        f.write("\n".join(msg_list))


def main() -> None:
    msg_foreign_final_list = []
    msg_detail_final_list = []

    # Handle each warning file
    files_list = os.listdir(LOG_DIR)
    with tqdm(total=len(files_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for filename in files_list:
            process_bar.set_description("Handling {0}".format(filename))

            if filename.startswith("Warning"):
                file_path = os.path.join(LOG_DIR, filename)

                with open(file_path, "r", encoding="utf-8") as f:
                    for line in f:
                        if MSG_FOREIGN in line:
                            msg_foreign_final_list.append(handle_msg_foreign_line(line))
                        elif MSG_DETAIL in line:
                            msg_detail_final_list.append(handle_msg_detail_line(line))

            process_bar.update(1)

        process_bar.set_description("Handle All Files DONE")

    # Save Final Files
    save_file(os.path.join(LOG_DIR, "ForeignLocationLuyou.log"), msg_foreign_final_list)
    save_file(os.path.join(LOG_DIR, "MissDetailLuyou.log"), msg_detail_final_list)


if __name__ == '__main__':
    main()
