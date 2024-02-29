/**
 * Counters JavaScript
 *
 * This file defines Counters
 * behavior.
 */

// eslint-disable-next-line no-console
import { CountUp } from 'countup.js';
import { debounce } from "debounce";

document.addEventListener('DOMContentLoaded', function () {
    var didCounters = false;
  
    function doCounters() {
      if (didCounters === true) {
        return;
      }
      var counters = document.querySelectorAll('.counters__number');
  
      counters.forEach(function (counter) {
        var defaults = {
          startVal: 0,
          duration: 2,
          useEasing: false,
          useGrouping: false,
          separator: ',',
          decimal: '.',
          decimalPlaces: 0,
        };
  
        var id = counter.id;
        var number = counter.getAttribute('data-counter-number');
        var config = JSON.parse(counter.getAttribute('data-config'));
  
        var options = Object.assign({}, defaults, config);
        var countUp = new CountUp(id, number, options);
  
        var startCounter = debounce(function () {
          if (isInViewport(counter)) {
            if (!countUp.error) {
              countUp.start();
              didCounters = true;
            } else {
              console.error(countUp.error);
            }
          }
        }, 100);
  
        window.addEventListener('scroll', startCounter);
        startCounter();
      });
    }
  
    doCounters();
  
    var i = setInterval(function () {
      var editorContent = document.querySelector('#editor .interface-interface-skeleton__content');
      if (editorContent) {
        var counters = document.querySelectorAll('.counters__number');
        if (counters.length > 0) {
          editorContent.addEventListener('scroll', doCounters);
          clearInterval(i);
        }
      }
    }, 10);
  
    function isInViewport(element) {
      var elementTop = element.getBoundingClientRect().top;
      var elementBottom = elementTop + element.offsetHeight;
      var viewportTop = window.scrollY;
      var viewportBottom = viewportTop + window.innerHeight;
  
      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
  });
  