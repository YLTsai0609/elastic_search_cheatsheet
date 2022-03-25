# between http and curl

http put http://localhost/index_name @mapping_name

curl -XPUT 'http://localhost/index_name' -H 'Content-Type:application/json' -d @test_mappings.json

https://stackoverflow.com/questions/19218659/curl-x-post-d-mapping-json-mapping-not-created
