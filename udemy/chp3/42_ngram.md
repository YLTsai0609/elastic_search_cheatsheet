# ngram & edge ngram

Query time searching is a little bitresource intensive compare to Index-based solution.

<img src='./assets/42_1.png'><img>

Why it called `Edge-ngram`?

When you use edge ngram

, Edge N-grams are built only on the neginning of each term(for moemory friendly)

# Completion Suggesters

You can also upload a list of all possible completions ahead of time using completion suggesters

In 7.14 doc - compeltion suggesters is optimized for speed. The suggesters uses data structure that enable fast lookups, but are costly to build and store in memory.

https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html#completion-suggester
