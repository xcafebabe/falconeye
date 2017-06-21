Node-Red-Contrib Falconeye
==========================

Node-red-contrib module to help you scrap apartments/flat results from different real state website platforms.

It will scrap supported real state portals and will give you a fancy json with usefull data able to send by email, telegram, store in db or file.

Is it based on [jobsify](https://github.com/xcafebabe/jobsify)

Real State  Currently supported:

- https://idealista.com
- https://fotocasa.es
- https://milanuncios.com
- https://pisos.com

For the moment the only way to install this node is with some development mojo. If someone is interested to include more real state portals, just open an issue with your request. Suggestions & critics are welcome as well.

Usage
-----

If you want to try it out

```
git clone https://github.com/xcafebabe/falconeye && \
docker-compose up -d && \
firefox http://localhost:1880
```
After seeing in your browser Node-Red Main page, import this [flow](https://raw.githubusercontent.com/falconeye/master/examples/example1.json).

You will get a flow like this

<a href="https://github.com/xcafebabe/falconeye/raw/master/examples/example1.png" target="_blank">
  <img alt="falconeye" src="https://github.com/xcafebabe/falconeye/raw/master/examples/example1.png" width="600px" />
</a>

Now just add some extra nodes to do what you want with data.

Nice To Have
------------s

- Support Real State Portals based on Javascript. (Use Nightmare to scrap websites)
- Test Environment and Unit tests.
- Howto about using falconeye in a live node-red service.