# Building Index

[ref : elasticsearch from the bottom up, part1](https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up)

[[ELK] Elasticsearch Index 管理與效能優化技巧](https://chentsungyu.github.io/2021/06/06/DevOps/ELK/Elasticsearch%20Index%20%E7%AE%A1%E7%90%86%E8%88%87%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96%E6%8A%80%E5%B7%A7/)

When building inverted indexes, we'll focus on 

1. search speed
2. index compactness(壓縮程度)
3. indexing speed

search speed and index compactness are related.

# Searching speed, compactness and elasticsearch strategy

searching over a smaller index, less data need to be processed, more of it will fit in memory. --> compactness, comes at the cost of index speed.

to minimize index size, there are smoe comprrssion tech such as [`delta-encoding`](https://zh.wikipedia.org/zh-tw/%E5%B7%AE%E5%88%86%E7%B7%A8%E7%A2%BC)

keep the data structure small means `sacrificing the possibility to efficiently update them` - In fact, Lucene does not update them at all.

when you delete a document from an index. the document is marked as such in a special deletion files (which is actually just a bitmap which is cheap to update.)

# How about updating a doc?

1. mark original doc as deletion
2. re-insertion the target doc

which means updating a document is even more expensive than adding it in the first place.

`rapidly changing counters in a Lucene index is usually not a good idea`


# Index Segments

Lucene index is made up of one or more immutable index segments.

when a search performs

1. does the search on every segment
2. filter out any deletions
3. merge thr result from all the segments
   
`Lucene occasionally merges segments according to some merge pilocy as new segments are added`

more segmnet files, slower search (merge result by network IO)

# Shards

# Transcations


Levels :

`Index` (可視唯一張資料表) > `Shard` (一個 lucene index 的儲存單位，裡面存有多個segment file，也是 cluster 資料搬移的最小單位) > `Segment`(實際寫入disk的唯讀檔案) > `Document`(一筆筆的資料)
