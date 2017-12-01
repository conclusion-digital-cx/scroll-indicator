Install
---

npm install https://github.com/conclusion-digital-cx/scroll-indicator.git

Usage
---
include the index.js file

    <style>
        #indicator {
            position: fixed;
            top: 100px;
            right: 20px;
        }
    </style>

    <div id="indicator"></div>
    <div id="article-content">
        The contents of your article go here
    </div>
    <script>
        new ScrollIndicator({
            element: 'indicator',
            targetElement: 'article-content',
            targetElementOffset: 250,
            percentileToActivate: 1,
            percentileChangeToArrow: 90,
            updateTimeValue: true,
            totalTime: 10,
            units: 'min'
        })
    </script>

Calculating the time
---
For a very basic calculation of the readtime, you can use the following calculation. Make sure to have a fallback in case something goes wrong. A more elaborate way would be to not only use text, but also images in your calculations. That's the way Medium does it (https://blog.medium.com/read-time-and-you-bc2048ab620c)

    <script>
        const WORDS_PER_MIN = 250;
        const text = document.getElementById('text').innerText

        function WordCount(str) {
            return str.split(' ').length;
        }

        new ScrollIndicator({
            element: 'indicator',
            targetElement: 'article-content',
            targetElementOffset: 250,
            percentileToActivate: 1,
            percentileChangeToArrow: 90,
            updateTimeValue: true,
            totalTime: Math.round(WordCount(text) / WORDS_PER_MIN) || 10,
            units: 'min'
        })
    </script>