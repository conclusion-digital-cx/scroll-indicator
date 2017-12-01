'use strict';

function ScrollIndicator(settings) {
    if (!settings) {
        throw 'Error. You need to define settings';
    }
    // Setup global variables
    const globals = {
        element: settings.element || 'indicator',
        targetElement: settings.targetElement || false,
        targetElementOffset: settings.targetElementOffset || 0,
        percentileToActivate: settings.percentileToActivate || 1,
        percentileChangeToArrow: settings.percentileChangeToArrow || 80,
        updateTimeValue: 'updateTimeValue' in settings ? settings.updateTimeValue : true,
        totalTime: settings.totalTime || 10,
        units: settings.units || 'min'
    }

    // Create rootComponent and attach the template
    const rootComponent = document.getElementById(globals.element);
    rootComponent.innerHTML = returnTemplate();

    // Setup DOM Element Variables
    const domElements = {
        clickTarget: rootComponent.getElementsByClassName('scroll-indicator')[0],
        arrowUp: rootComponent.getElementsByClassName('arrow-up')[0],
        circle: rootComponent.getElementsByClassName('circle-progress-stroke')[0],
        text: rootComponent.getElementsByClassName('percentage')[0],
        units: rootComponent.getElementsByClassName('units')[0],
        targetElement: globals.targetElement ? document.getElementById(globals.targetElement) : false
    }

    function updateCircle(percentage) {
        // First assess wether the border should be activated or not;
        if (percentage > globals.percentileToActivate) {
            rootComponent.classList.add('border-active');
        } else {
            rootComponent.classList.remove('border-active');
        }

        // Then, assess whether the arrow should be visible or not
        if (percentage > globals.percentileChangeToArrow) {
            rootComponent.classList.add('arrow-active');
        } else {
            rootComponent.classList.remove('arrow-active');
        }

        // Then, update the time accordingly (if it says so in the settings)
        if (globals.updateTimeValue) {
            domElements.text.innerHTML = globals.totalTime - Math.round(globals.totalTime * (percentage / 100));
        }

        // Lastly, update the border width
        domElements.circle.setAttribute('stroke-dasharray', percentage + ', 100');
    }

    domElements.clickTarget.onclick = function() {
        window.scrollTo({
            behavior: 'smooth', // This will not work in IE nor Edge. They will fallback to regular scrollTo, no animation (https://caniuse.com/#feat=css-scroll-behavior)
            left: 0,
            top: 0
        });
    }

    window.onload = function() {
        updateCircle(0);
        domElements.text.innerHTML = globals.totalTime;
        domElements.units.innerHTML = globals.units;
    }

    window.onscroll = function() {
        const body = document.body;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        let max = body.scrollHeight - clientHeight;
        if(domElements.targetElement){
            max -= (max - (domElements.targetElement.clientHeight + domElements.targetElement.offsetTop + globals.targetElementOffset));
        }
        const percentage = Math.round((body.scrollTop / max) * 100);
        updateCircle(percentage);
    }

    function returnTemplate() {
        return `<svg viewbox="0 0 36 36" class="circular-chart scroll-indicator">
        <path class="circle-bg-stroke" d="M18 2
        a 15 15 0 0 1 0 31
        a 15 15 0 0 1 0 -31" />
        <path class="circle-bg" d="M18 2
        a 15 15 0 0 1 0 31
        a 15 15 0 0 1 0 -31" />
        <path class="circle-progress-stroke" stroke-dasharray="0, 100" d="M18 2
        a 15 15 0 0 1 0 31
        a 15 15 0 0 1 0 -31" />
        <g class="progress-content">
        <text x="18" y="19.00" class="percentage">0</text>
        <text x="18" y="25.00"  class="units"></text>
        </g>
        <g class="arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g class="Group" transform="scale(0.7) translate(18.000000, 15.000000)" stroke="#666666" stroke-width="2">
        <path d="M8,19 L8,1"></path>
        <polyline points="0 8 8 0 15 8"></polyline>
        </g>
        </g>
        </svg>`
    }
}