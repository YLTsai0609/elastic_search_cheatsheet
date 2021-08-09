# Ref

[你也能做出Google：用Elasticsearch搭建叢集搜索引擎](https://www.books.com.tw/products/0010860720)

# 3.3 Elastic Search 核心理念

word|meaning|note
-----|-----|-----
node|節點|es cluster 服務的基本單元，cluster中每個執行中的伺服器都可以稱為節點(node)
cluster|叢集|es 的 cluster 是由多個具有相同 `cluster.name` (預設為 elasticsearch) 的節點組成，共同工作，實際使用時通常要將節點換名字，避免新建立的節點直接以`elasticsearch`的節點名稱加入到預設 cluster
shades|分片|當索引的資料量太大，受限於單一節點的記憶體，磁碟處理能力等，節點無法足夠快遞回應client端需求，此時會將一個索引上的資料進行水平拆分，拆分出來的每個資料都稱作為一個分片，一般來說，每個分片會被放到不同的伺服器上，**進行分片操作之後，索引的規模變大，效能也會隨之提升**|
Replicas|備份|主分片的備份，採精確複製模式，對外提供查詢服務，當進行寫入操作時，會先在主分片寫好，在備份到備份分片中，主分片壞掉時，es會選出對應的備用分片，維持可用性，並將cluster status 轉換燈號|
Index|索引|在 es 中，索引由一個或多個分片組成，是一個被查詢的實體，索引名稱在cluster中是一個唯一標誌(id)|
|Document|文件|索引中的每一筆資料被稱作一筆文件，與關連式資料庫中的使用方式類似
|Settings||Settings是對叢集中索引的定義資訊，例如預設分片數、備份數等
|Mapping||Mapping中儲存了索引中的欄位資訊，類似關連式資料庫中的shcema，在 es 中，mapping 可以被動態識別，如果沒有特殊需求，不用手動建立Mapping
|Analyser|斷詞方式的定義|一個Analyser通常由一個Tokenizer和多個Filter組成，預設的Analyser是由Tokenizer, Standard Token Filter, Lowe Case Token Filter, Stop Token Filter 所組成



Status of cluster : 

1. Green : 健康狀態，所有主分片以及備份分片都可以正常執行，100%健康
2. Yellow : 預警狀態，至少有一個備份分片不能正常執行，此時叢集仍然可以正常執行，但可用性正在降低
3. Red : 危險狀態，叢集無法正常使用，此時叢集至少有一個主分片及他的全部部分分片無法正常執行，**雖然還可以查詢，但也只能回傳部分資料，而被分配到這個分片的寫入請求將顯示出錯，最終導致資料遺失**


Hints of shades ; 

1. 當設定分片時，是透過路由來確定來確定要寫入哪個分片，**因此在建立索引時就需要指定，且一但確定就不能更改**
2. 當查詢發生時，es會在多個分片中查詢，並整理結果合併，對於上層的應用程式而言，分片是透明的，應用程式並不知道分片的存在
3. 一班預設是5個分片，·並為每個主分片建立一個備份

Hints of replicas :

1. 主分片壞掉時，es會選出對應的備用分片，維持可用性，並將cluster status 轉換燈號
2. 分片是個雙面刃，更多個分片可提升平行處理效能，但如果設定的分片數太多，在寫入操作時會增加資料同步的負擔

Hints of Mapping :

1. 假如使用斷詞器，是否斷詞，是否儲存等，就需要手動設置Mapping，Mapping一但建立，儲存資料就不能更改