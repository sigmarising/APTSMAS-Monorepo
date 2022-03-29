import os
import json
import colorama as c
from tqdm import tqdm

INPUT_DIR = os.path.abspath("./merged")
OUTPUT_DIR = os.path.abspath("./mergedNewId")
LOGS_INFO = []
POETS_ID = {}
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
    "陆游 ",
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
    "谢翱 "
]


def generate_poets_new_id() -> None:
    """
    generated the new poets id and store in global POETS_ID
    """
    for index, item in enumerate(POETS_LIST):
        POETS_ID[item.strip()] = index


def handle_file(old_filename) -> None:
    """
    update the old file's id inside, and output with the new id's filename

    Args:
        old_filename: the old filename such as `0_魏征.json`
    """
    old_filepath = os.path.join(INPUT_DIR, old_filename)
    with open(old_filepath, "r", encoding="utf-8") as f:
        json_data = json.load(f)

    # update with the new id
    poet_name = json_data["name"]
    new_id = POETS_ID[poet_name]
    json_data["id"] = new_id

    new_filename = str(new_id) + "_" + poet_name + ".json"
    new_filepath = os.path.join(OUTPUT_DIR, new_filename)
    with open(new_filepath, "w+", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)


def main() -> None:
    generate_poets_new_id()
    print(c.Fore.GREEN + c.Style.BRIGHT + "GENERATE NEW ID DONE!")

    input_file_list = os.listdir(INPUT_DIR)
    input_file_list.sort()

    if not os.path.exists(OUTPUT_DIR):
        os.mkdir(OUTPUT_DIR)

    with tqdm(total=len(input_file_list), dynamic_ncols=True, unit="file", colour="blue") as process_bar:
        for input_file in input_file_list:
            process_bar.set_description("Handling {0}".format(input_file))

            handle_file(input_file)

            process_bar.update(1)
        process_bar.set_description("Handle All Files DONE")

    print(c.Fore.YELLOW + c.Style.NORMAL + "HANDLE LOGS:\n" + "\n".join(LOGS_INFO))
    print(c.Fore.GREEN + c.Style.BRIGHT + "ALL DONE!")


if __name__ == '__main__':
    main()
