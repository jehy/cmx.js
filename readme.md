# cmx.js - a library for authoring [xkcd-style](http://xkcd.com) comixes

# This fork is working
Code in [source repository](https://github.com/darwin/cmx.js) is really hard to launch, since it uses ancient technologies
like bower, yeoman, ruby, grunt, coffeescript, and only works on ancient node versions.

But...

![wasthere.png](wasthere.png)

So I removed all unused deps, upgraded some, and it looks like no deps besides Node are required.

You can run it with node 22 (I used 22.4.0), simply `npm ci` and `npm start`.

Or you can use [docker image](docker-compose.yml).

I did not publish it as service because it contains many critical vulnerabilities and I don't recommend doing it.

No other changes besides fixes are done - it should look exactly like many years ago. All credits go to original author.
