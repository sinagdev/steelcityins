/*
 *  Materialize CSS Settings 
 */

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.navbar-mobile-sidenav');
  var instances = M.Sidenav.init(elems, {
    edge: 'right',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  });
});