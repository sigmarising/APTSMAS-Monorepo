# Clustering

For realistic reason, you can use any embedding core such as doc2vec to get the trajectory embedding for our un-supervisor dataset.

So this project contains three tasks:
1. Convert the whole poets' trajectories to the id-sequence.
2. Use the embedding core such as doc2vec to get the embedding vector of each trajectory.
3. Use different clustering methods to get the outlier poets.

## Virtual Env

The base python version is 3.7.3. And all requirements are in [requirements.txt](./requirements.txt).

> We suggest you change the pip source to ali-source
>
> See [this link for detail.](https://blog.csdn.net/sigmarising/article/details/83009483)

## Step 1. Convert the trajectories to id-sequence.

We use the data from the [2.AddAttributes/completeGeoInfo](../2.AddAttributes/CompleteGeoInfo/). Then we will store the data to the `./GeoSequence/` folder.

We will output each poet in just one file `IdSeq.json` and the content will be like:
```json
{
  "seqList": [
      {
        "poetId": 0,
        "poetName": "魏征",
        "idSequenceLocation": [
            "",
            ""
        ],
        "idSequenceCity": [
            "",
            ""
        ],
        "idSequenceProvince": [
            "",
            ""
        ],
        "idSequenceCountry": [
            "",
            ""
        ],
      }
  ]
}
```

## Step 2. & Step 3. etc.

These parts use some works from who are not willing to open-sourced their code.

---

> **For more realistic reason, all the detail of `3.Clustering` will not be open sourced, but we offer parts of the workflow above.**
