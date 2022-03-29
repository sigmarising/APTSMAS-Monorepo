import os
import json
import colorama as c

DATA_DIR = "./dist"


def main() -> None:
    print(c.Fore.GREEN + c.Style.NORMAL + "Start checking data...")

    files_list = os.listdir(DATA_DIR)
    files_list.sort()
    name_check_dict = {}
    abnormal_count = 0

    for filename in files_list:
        filepath = os.path.join(DATA_DIR, filename)

        # 1. Check the duplicate of poet's name
        name = filename.split(".json")[0].split("_")[1]
        if name not in name_check_dict:
            name_check_dict[name] = [filename]
        else:
            abnormal_count += 1
            name_check_dict[name].append(filename)
            print(c.Fore.RED + c.Style.BRIGHT + "Abnormal of duplicate names: " + str(name_check_dict[name]))

        with open(filepath, "r", encoding="utf-8") as f:
            s = json.load(f)
            # 2. Check the top level key
            if "Traces" in s and len(s) == 1:
                # 3. Check the Traces' length
                if len(s["Traces"]) == 1:
                    pass
                else:
                    print(c.Fore.RED + c.Style.BRIGHT + "Abnormal in " + filename + ": more than one trace.")
                    abnormal_count += 1
            else:
                print(c.Fore.RED + c.Style.BRIGHT + "Abnormal in " + filename + ": more than one top level key.")
                abnormal_count += 1

    # Final output
    print(c.Fore.GREEN + c.Style.BRIGHT + "There is total ", end="")
    if abnormal_count == 0:
        print(c.Fore.GREEN + c.Style.BRIGHT + "0 abnormal of all data.")
    else:
        print(
            c.Fore.RED + c.Style.BRIGHT + str(abnormal_count) +
            c.Fore.GREEN + c.Style.BRIGHT + " abnormal of all data."
        )


if __name__ == '__main__':
    c.init(autoreset=True)
    main()
    c.deinit()
