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
    <script>
        new ScrollIndicator({
            element: "indicator",
            percentileToActivate: 1,
            percentileChangeToArrow: 90,
            updateTimeValue: true,
            totalTime: 10,
            units: 'min'
        })
    </script>