# An Index Is Split Into Shards

<img src='../assets/98_1.png'><img>

1. your index will be broken down into shards

<img src='../assets/98_2.png'><img>

2. index has two primary shards and two replicas
   1. replicas for fault tolerance
   2. replicas for read capacity(read can be map reduce via primary or replica)

3. the scarce resource(稀缺資源) here is primary shards (which handling writing data)

# Read a lot / write a little

You need more replicas, primary shards are not your issue.

- e.g. search on your own wiki

# Write a lot / read a little

ingesting(擷取) hug amounts of log all the time

primary shards more, less replicas

e.g. IoT sensors data warehouse

<img src='../assets/98_3.png'><img>

# How Many Shards Do I Need?

1. You can't add more shards later witnhout re-indexing.

<img src='../assets/98_4.png'><img>

<img src='../assets/98_5.png'><img>

No formula =(

<img src='../assets/98_6.png'><img>

Read request can be scalable =)
