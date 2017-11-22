function ScrollIndicator(settings) {

    if (!settings) settings = {}

    //Default Settings
    var el = settings.el || "indicator"
    var CHANGE_TO_ARROW = settings.changeToArrow || 80
    var CHANGE_TIME = settings.changeTime || true
    var TOTAL_TIME = settings.totalTime || 5
    var units = settings.units || "min"

    //Inject template
    var parent = document.getElementById(el)
    parent.innerHTML = getTemplate()

    var elIndicator = parent.getElementsByClassName("scroll-indicator")[0]

    //Component elements
    var elements = {
        content: elIndicator.getElementsByClassName("progress-content")[0],
        text: elIndicator.getElementsByClassName("percentage")[0],
        unitText: elIndicator.getElementsByClassName("units")[0],
        arrowUp: elIndicator.getElementsByClassName("arrow-up")[0],
        circle: elIndicator.getElementsByClassName("circle")[0],
        circleBg: elIndicator.getElementsByClassName("circle-bg")[0]
    }

    //----------------
    //Setup
    //----------------
    elements.text.innerHTML = TOTAL_TIME
    elements.unitText.innerHTML = units
    updateCircle(0)

    //----------------
    // Methods
    //----------------
    function updateCircle(percentage100) {
        if (percentage100 > 1) {
            elIndicator.classList.add("border-active");
        } else {
            elIndicator.classList.remove("border-active");
        }
    }

    //----------------
    // Handlers
    //----------------
    elIndicator.onclick = function() {
        window.scrollTo(0, 0);
    }

    window.onscroll = function render() {
        var el = document.body
        var max = el.scrollHeight - el.clientHeight
        var percentage = el.scrollTop / max
        var percentage100 = Math.round(percentage * 100)

        updateCircle(percentage100) //Show or hide the circle + circlebg

        if (CHANGE_TIME) {
            elements.text.innerHTML = TOTAL_TIME - Math.round(TOTAL_TIME * percentage)
        }

        if (percentage100 > CHANGE_TO_ARROW) {
            elIndicator.classList.add("arrow-active");
        } else {
            elIndicator.classList.remove("arrow-active");
        }

        elements.circle.setAttribute("stroke-dasharray", percentage100 + ", 100");
    }


    function getTemplate() {
        return `
    <div class="scroll-indicator">
    <svg viewbox="0 0 36 36" class="circular-chart orange">
        <path class="circle-bg-stroke" d="M18 2
        a 15 15 0 0 1 0 31
        a 15 15 0 0 1 0 -31" />
      <path class="circle-bg" d="M18 2
                a 15 15 0 0 1 0 31
                a 15 15 0 0 1 0 -31" />
                <path class='circle' stroke-dasharray="0, 100" d="M18 2
                a 15 15 0 0 1 0 31
                a 15 15 0 0 1 0 -31" />    
      <g class='progress-content'>
        <text x="18" y="19.00" class='percentage'></text>
        <text x="18" y="25.00"  class="units">min</text>
      </g>
      <g class="arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g class="Group" transform="scale(0.7) translate(18.000000, 15.000000)" stroke="#666666" stroke-width="2">
              <path d="M8,19 L8,1"></path>
              <polyline points="0 8 8 0 15 8"></polyline>
          </g>
      </g>
    </svg>
    </div>
  `
    }
}