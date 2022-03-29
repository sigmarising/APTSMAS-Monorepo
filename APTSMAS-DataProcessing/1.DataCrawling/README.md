# Data Crawling

The Data crawling sub project contains two tasks:
1. Crawling down all poets' trajectories information
2. Check the downloads APIs response's format

## Virtual Env

The base python version is 3.7.3. And all requirements are in [requirements.txt](./requirements.txt).

> We suggest you change the pip source to ali-source
>
> See [this link for detail.](https://blog.csdn.net/sigmarising/article/details/83009483)

## Crawling Task

This task uses `requests` as core to get the APIs response. The requests will be make with random user-agent while sleeping for a few seconds to avoid frequent access to api. The output files is in [`dist/`](./dist).

The crawling target is `https://api.sou-yun.cn/api/Biography?scope=&author=某某&beginYear=0&endYear=0`.

The code is shown in [DataCrawl.py](DataCrawl.py).

## Dumped Postman Collection

The related postman dumped APIs collection are in [`assets/`](./assets/)

## Data Checking Task

The data check task will check three rules:
1. whether the poet's name can be the primary key
2. whether the response data only contains one key `Traces`
3. whether there are only one element in `Traces` Array

The data checking process should be run after the data crawling.

### Check Result

**All check passed.**

### Notes

When we do manual data labeling, we found we lose the data of 陆游, so we add he to the poets list's tail and continue the whole work-flow.
After we handle the data done, we will re-id the poets list.
