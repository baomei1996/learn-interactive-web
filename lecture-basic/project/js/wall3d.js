(function () {
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar')
  let maxScrollValue = document.body.offsetHeight  - window.innerHeight
  window.addEventListener('scroll', function() {
    //console.log(this.pageYOffset);
    // console.log( pageYOffset / maxScrollValue);

    // z scroll
    const scrollPer = pageYOffset / maxScrollValue
    const zMove =  scrollPer * 980 - 490;
    houseElem.style.transform = 'translateZ(' + zMove + 'vw)'

    // progress bar
    barElem.style.width = scrollPer * 100 + '%'
  })
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight  - window.innerHeight
  }

  window.addEventListener('resize', resizeHandler)
})();
