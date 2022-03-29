# Add Attributes

The Add attributes sub project contains following tasks:
1. Convert the Baidu position to AMap position
2. Add the position's province and country information
3. Add all attributes base on design format
4. Remove all HTML tags in description field

In detail, this sub project can be done with the following workflow:
1. Construct the target json first, meanwhile doing the coordinate convert and HTML text parse, output the log information
2. Merge the log to determine the next manual operation
3. Check the log's `don't have the Detail Field` whether in routes and made `foreign location` into a csv file.
4. Manual note the foreign country's location information based on log information
5. Handle the missed location information and missed detail based on manual note
6. Check country-province-city-location information
7. Check whether the marker's id and regionId are corresponding if needed, then, re-encoding the id and regionId for all geography info
8. Manual note all lines' visited years. Then auto calculate the marker's visited years and visited times
9. The trajectories embedding field fill in blank for future used.

## Virtual Env

The base python version is 3.7.3. And all requirements are in [requirements.txt](./requirements.txt).

> We suggest you change the pip source to ali-source
>
> See [this link for detail.](https://blog.csdn.net/sigmarising/article/details/83009483)

## Workflow Information

add input and output

### Python File: ConstructStructure (for workflow 1)

Used for doing workflow 1, construct the target json and meanwhile doing the coordinate convert and HTML text parse.

Because the AMap api may raise exception by timeout, this script need multi-run to finish the task.

**Notes:** the constructed descriptions are based on auto-rules, which may not reliable, the manual check is also necessary

**Notes:** in order that the python script can handle successfully, we do some correction to origin data crawled files
* file `72_吕陶.json`: `《<吕陶年谱>补正》` to `《吕陶年谱补正》`
* file `86_陈师道.json`: `1-卒后870年` to `1-30岁`

### Python File: LogMerge (for workflow 2)

Used for doing workflow 2, merge the warning logs into two files (files are classify by log message).

### Python File: LogCheck (for workflow 3)

Used for doing the workflow 3, the two log files check result is output in csv file, which can be handled by Excel later.

### Excel Handle (for workflow 4)

Convert the two csv files (from `data/`) from workflow 3 to excel file, do the analysis and note task. After the Handle, should export the csv file (to `data/`) for after used.

What have been done in Excel?
* MissDetail.xlsx
  * remove the duplicate items
  * sort by isInLine (first key), location (second key) and file name (third key)
  * highlight the `isInLine == TRUE`
  * filter all the `isInLine == TRUE` items
  * check whether `isInLine == TRUE` useful
  * after check, all items in MissDetail.xlsx is useless, just remove it in future handling
  * save to csv file (in `data/`)
* ForeignLocation.xlsx
  * remove the duplicate items
  * sort by location (first key) and file name (second key)
  * Manual note the locations based on:
    * [AMap Coordinate Picker](https://lbs.amap.com/tools/picker)
    * [AMap](https://ditu.amap.com/)
    * [Google Map](https://www.google.com/maps)
    * [Wikipedia](https://en.wikipedia.org/)
  * save to csv file (in `data/`)

### Python File: DataFix (for workflow 5)

Use the location information in workflow 4 and fix the missing information in `dist/`, meanwhile remove the useless locations. The final output folder is `output/`.

### Python File: LocationCheck (for workflow 6)

All data in `output/` will be used for construct information of country-province-city-location.

The output is in `data/locations.json`. And manual check passed (no duplicated location found).

### Python File: GeoEncodingId (for workflow 7)

> 'Check whether the marker's id and regionId are corresponding if needed' is needless

Use the `./data/locations.json` to generated id for country, province, city, location. Then re-encoding id for each poet's marker and output is `./recoding`.

The all id's dict is output to `./data/locationsId.json`

### Manual Handle: Fill in visited year (for workflow 8)

Manual label the visited years for all poets. This work will be carried on `./recoding`. What we need to fill is just the `travelDetail -> lines -> markers -> visitYear`. The marker's visited years will be calculated by program script.

> when we do manual labeling, we found that we loss the data of 陆游, so we will go through the above workflow to fit 陆游's data.
> 
> Firstly, we renamed the exists labeled folder `./recoding` to `./labeled`
> 
> 1. ConstructStructure
> 2. LogMerge & Check (all poets)
> 3. Excel Handle for all poets
> 4. DataFix for all poets (because the previous things don't change, so should only one new file generated)
> 5. LocationCheck for new locations
> 6. store the labeled file and generated new files of `./recoding`.

### Python File: MergeTwoSources.py (for workflow 8)

For labeled files in `./labeled` and new id files in `./recoding`, we merged them data into `./merged`.

### Python File: PoetsReEncodingId.py (for workflow 8)

ReEncoding the poets id in `./merged` (the poets' id is followed by birth years) and output to the `./mergedNewId`.

### Python File: CompleteGeoInfo.py (for workflow 8)

For files in `./mergedNewId`, fill all null info(visited times and visited years) and output to `./completeGeoInfo`.

## Final manual handle to `completeGeoInfo`

We found the duplicate id item (but they do have the different lng, lat) in `travelDetail\markers` in some json file, we just merge these items' information manually.
* 陆游：南昌、岳阳
* 杨万里：南昌
* 徐铉：南昌
* 苏轼：南昌

## Depended AMap API

Web Services Key: `350da9ed6b67377c548de3a6b1419cf8`

### Dumped Postman Collection

The related postman dumped APIs collection are in [`assets/`](./assets/)

### Re-GeoEncoding

[API Usage Page](https://lbs.amap.com/api/webservice/guide/api/georegeo#regeo)

#### Request Simplify

`https://restapi.amap.com/v3/assistant/coordinate/convert`:
* `locations`: lng,lat
* `coordsys`: baidu
* `key`: API Key

#### Response Simplify

```jsonc
{
    "status": "1",  // 1 成功；0 失败
    "info": "ok",  // status 为 0 时，info 返回错误原因；否则返回 “OK”
    "infocode": "10000",
    "locations": "112.603578864589,34.258930111463"
}
```

> [AMap infocode 说明](https://lbs.amap.com/api/webservice/guide/tools/info/)

### Coordinate-Convert

[API Usage Page](https://lbs.amap.com/api/webservice/guide/api/convert)

#### Request Simplify

`https://restapi.amap.com/v3/geocode/regeo`:
* `location`: lng,lat
* `extensions`: base
* `key`: API key

#### Response Simplify

For China locations：
```jsonc
{
    "status": "1",
    "regeocode": {
        "addressComponent": {
            "city": "平顶山市",
            "province": "河南省",
            "adcode": "410482",
            "district": "汝州市",
            "towncode": "410482103000",
            "streetNumber": {
                "number": [],
                "direction": [],
                "distance": [],
                "street": []
            },
            "country": "中国",
            "township": "临汝镇",
            "businessAreas": [
                []
            ],
            "building": {
                "name": [],
                "type": []
            },
            "neighborhood": {
                "name": [],
                "type": []
            },
            "citycode": "0375"
        },
        "formatted_address": "河南省平顶山市汝州市临汝镇临汝镇临汝镇人民政府"
    },
    "info": "OK",
    "infocode": "10000"
}
```

For foreign country:
```jsonc
{
    "status": "1",
    "info": "OK",
    "infocode": "10000",
    "regeocode": {
        "formatted_address": [],
        "addressComponent": {
            "country": [],
            "province": [],
            "city": [],
            "citycode": [],
            "district": [],
            "adcode": [],
            "township": [],
            "towncode": [],
            "streetNumber": {
                "street": [],
                "number": [],
                "location": "75.275852719361,42.826231745408",
                "direction": [],
                "distance": []
            }
        },
        "pois": [],
        "roads": [],
        "roadinters": [],
        "aois": []
    }
}
```
