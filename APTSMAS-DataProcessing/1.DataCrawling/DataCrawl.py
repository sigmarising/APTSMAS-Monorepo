import json
import requests
import random
import os
import time
import colorama as c
from random_user_agent.user_agent import UserAgent
from random_user_agent.params import HardwareType, SoftwareType

POETS_LIST = [
    "魏征 ",
    "王绩 ",
    "卢照邻 ",
    "骆宾王 ",
    "杨炯 ",
    "王勃 ",
    "宋之问 ",
    "沈佺期 ",
    "孟浩然 ",
    "王昌龄 ",
    "高适 ",
    "王维 ",
    "李白 ",
    "杜甫 ",
    "萧颖士 ",
    "岑参 ",
    "刘长卿 ",
    "钱起 ",
    "韦应物 ",
    "孟郊 ",
    "权德舆 ",
    "令狐楚 ",
    "韩愈 ",
    "柳宗元 ",
    "周贺 ",
    "姚合 ",
    "张彻 ",
    "贾岛 ",
    "牛僧孺 ",
    "李德裕 ",
    "皇甫湜 ",
    "李贺 ",
    "令狐绹 ",
    "段成式 ",
    "方干 ",
    "喻凫 ",
    "李频 ",
    "郑巢 ",
    "陆龟蒙 ",
    "贯休 ",
    "罗隐 ",
    "皮日休 ",
    "司空图 ",
    "鱼玄机 ",
    "杜荀鹤 ",
    "郑谷 ",
    "崔涂 ",
    "徐铉 ",
    "晁迥 ",
    "王禹偁 ",
    "寇准 ",
    "丁谓 ",
    "林逋 ",
    "杨亿 ",
    "释保暹 ",
    "张先 ",
    "宋庠 ",
    "包拯 ",
    "曾公亮 ",
    "富弼 ",
    "文彦博 ",
    "张方平 ",
    "欧阳修 ",
    "赵抃 ",
    "苏洵 ",
    "吴中复 ",
    "苏颂 ",
    "冯京 ",
    "郑獬 ",
    "章楶 ",
    "杨绘 ",
    "徐积 ",
    "吕陶 ",
    "孙觉 ",
    "王令 ",
    "程颢 ",
    "程颐 ",
    "苏轼 ",
    "孔文仲 ",
    "苏辙 ",
    "孔武仲 ",
    "孔平仲 ",
    "黄庭坚 ",
    "晁端礼 ",
    "曾肇 ",
    "秦观 ",
    "陈师道 ",
    "贺铸 ",
    "晁补之 ",
    "陈瓘 ",
    "晁说之 ",
    "范寥 ",
    "惠洪 ",
    "晁冲之 ",
    "程俱 ",
    "宇文虚中 ",
    "王灼 ",
    "胡舜陟 ",
    "李清照 ",
    "曾几 ",
    "胡宪 ",
    "蔡伸 ",
    "洪皓 ",
    "释宗杲 ",
    "王以宁 ",
    "秦桧 ",
    "陈与义 ",
    "刘勉之 ",
    "张元干 ",
    "邓肃 ",
    "王铚 ",
    "李侗 ",
    "陈康伯 ",
    "施元之 ",
    "黄公度 ",
    "倪称 ",
    "洪适 ",
    "曾协 ",
    "洪遵 ",
    "萧德藻 ",
    "郑伯熊 ",
    "尤袤 ",
    "徐梦莘 ",
    "王明清 ",
    "杨万里 ",
    "袁枢 ",
    "张孝祥 ",
    "张栻 ",
    "管鉴 ",
    "薛季宣 ",
    "丘崇 ",
    "王质 ",
    "唐仲友 ",
    "吕祖谦 ",
    "陈傅良 ",
    "沈焕 ",
    "辛弃疾 ",
    "叶适 ",
    "刘过 ",
    "李壁 ",
    "李埴 ",
    "施宿 ",
    "戴复古 ",
    "卢祖皋 ",
    "王遂 ",
    "岳珂 ",
    "许棐 ",
    "严羽 ",
    "吴潜 ",
    "吴文英 ",
    "姚勉 ",
    "舒岳祥 ",
    "谢枋得 ",
    "刘辰翁 ",
    "文天祥 ",
    "张炎 ",
    "谢翱 ",
    "陆游 "
]
USER_AGENT_GENERATOR = None
REQUEST_URL = "https://api.sou-yun.cn/api/Biography"
RANDOM_SLEEP_RANGE = (10, 15)
OUTPUT_DIR = "./dist"


def get_data(poet_name: str) -> dict:
    """
    Get the specific poet's info from api
    :param poet_name: the poet's name
    :return: the response json
    """
    print(c.Fore.YELLOW + c.Style.NORMAL + "* GET data of " + poet_name, end="")

    headers = {
        "user-agent": USER_AGENT_GENERATOR.get_random_user_agent()
    }
    params = {
        "scope": "",
        "author": poet_name,
        "beginYear": 0,
        "endYear": 0
    }

    r = requests.get(REQUEST_URL, headers=headers, params=params)

    print(c.Fore.YELLOW + c.Style.NORMAL + " DONE")
    return r.json()


def random_sleep() -> None:
    """
    Random sleep for some seconds
    :return: None
    """
    rand_time = random.randrange(RANDOM_SLEEP_RANGE[0], RANDOM_SLEEP_RANGE[1])
    print(c.Fore.BLUE + c.Style.BRIGHT + "RANDOM SLEEP " + str(rand_time) + " seconds", end="")

    for i in range(rand_time):
        print(c.Fore.BLUE + c.Style.BRIGHT + ".", end="")
        time.sleep(1)

    print(c.Fore.BLUE + c.Style.BRIGHT + " DONE")


def save_data(filename: str, data: dict) -> None:
    """
    Save the json data to json file
    :param filename: specific filename
    :param data: the json data
    :return: None
    """
    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    filename += ".json"
    file_path = os.path.join(OUTPUT_DIR, filename)
    with open(file_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(c.Fore.YELLOW + c.Style.NORMAL + "* SAVE " + filename + " DONE")


def main() -> None:
    print(c.Fore.GREEN + c.Style.BRIGHT + "- START CRAWLING - ")

    for index, poet in enumerate(POETS_LIST):
        name = poet.strip()
        filename = str(index) + "_" + name

        if os.path.exists(os.path.join(OUTPUT_DIR, filename + ".json")):
            continue

        print(c.Fore.YELLOW + c.Style.BRIGHT + "HANDLE: " + name)

        data = get_data(name)
        save_data(filename, data)

        random_sleep()

    print(c.Fore.GREEN + c.Style.BRIGHT + "- CRAWLING DONE " + str(len(POETS_LIST)) + " POETS - ")


if __name__ == '__main__':
    c.init(autoreset=True)
    print(c.Fore.RED + c.Style.BRIGHT + "INIT UserAgent RandomGenerator... ", end="")
    USER_AGENT_GENERATOR = UserAgent(
        HardwareType=[HardwareType.COMPUTER, HardwareType.LARGE_SCREEN],
        SoftwareType=[SoftwareType.WEB_BROWSER]
    )
    print(c.Fore.RED + c.Style.BRIGHT + "DONE")

    main()

    c.deinit()
