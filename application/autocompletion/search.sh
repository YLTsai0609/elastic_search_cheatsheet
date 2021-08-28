HOST=$1
PORT=$2
INDEX=$3
while true
do
 IFS= read -rsn1 char
 INPUT=$INPUT$char
 echo $INPUT
 http get $HOST:$PORT/$INDEX/_search query:='{"term":{"ngram":"'"$INPUT"'"}}'\
 | jq '.hits.hits[]._source.poi_name' | grep -i "$INPUT"
done
