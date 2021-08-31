# Resource

1. 用Elasticsearch搭建叢集搜尋引擎(書)
2. pixnet private ppt
4. [Third party - 用 Docker 架設 Elasticsearch 實驗環境](https://myapollo.com.tw/zh-tw/docker-elasticsearch/)
5. [elasticsearch - official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)

Q : ElasticSearch 是什麼?

A : 分散式、可擴充、近即時的高性能搜尋和資料分析引擎，基於 Apache Lucene 建置，採用 Java 撰寫，使用 Laucene 建置索引、提供搜尋功能，ElasticSearch 的目標是讓群文檢索的落地變得更簡單

Q : Is Elasticsearch in memory?

A : 
The Elasticsearch process is very memory intensive. Elasticsearch uses a JVM (Java Virtual Machine), and close to 50% of the memory available on a node should be allocated to JVM. The JVM machine uses memory because the Lucene process needs to know where to look for index values on disk.

https://opster.com/elasticsearch-glossary/elasticsearch-memory-usage/

# Elasticsearch 7 and the Elastic Stack: In Depth and Hands On

https://www.udemy.com/course/elasticsearch-7-and-elastic-stack/learn/lecture/14728134#overview

chapter|start|complete
-----|-----|-----
1 Installing and Understanding ElasticsSearch|0809|0809
2 Mapping and Indexing Data|0811|0811
3 Searching with Elasticsearch|0811|0820
4 Importing data into your index, big or small|0809|0809
8 ElasticSearch Operations|0820|

# Installtion

1. [x] - docker pull elastic-search official image
2. [x] - docker pull kibina official image (UI for elastic-search), make them connected.

# Basic Usage

1. [x] - dev tools - 001
2. [x] - search - `match_all`, `sort` - 002, 003
3. [x] - post data - `_doc`, `_bulk` - 004

# Concept

1. [x] - words

# Application

1. [x] - autocomplete
