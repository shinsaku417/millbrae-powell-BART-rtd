# Millbrae-Powell BART RTD

Simple and customizable chrome extension that allows you to see real time
departures for BART trains that go from Millbrae to Powell Street or vice versa
while browsing on Google Chrome.

![Demo](https://s3.amazonaws.com/f.cl.ly/items/2g1F2q150d2H0h2G173t/Screen%20Recording%202015-01-09%20at%2010.11%20AM.gif)

## Step by Step Customization

1. Go to [BART API Registration](http://api.bart.gov/api/register.aspx) and obtain an API key.
2. Fork and Clone this repo or download zip.
3. Open app.js in the file. In the url section of ajax, change the following:
  * Specify the station by changing orig=mlbr. You can see full list of
  station abbreviations [here](http://api.bart.gov/docs/overview/abbrev.aspx).
  * Insert your API key in key=insert-key-here.
4. In the getEtd function, change the first if statement to specify
line colors that you want. 'color' variable can be 'RED', 'BLUE', 'GREEN',
'YELLOW', or 'ORANGE'.
5. Open Google Chrome and enter chrome://extensions on the address bar.
6. Check the Developer mode on the top-right, and click Load unpacked extension.
7. Select folder that you cloned or downloaded, and you're ready to use it!
