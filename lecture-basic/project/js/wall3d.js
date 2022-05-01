(function () {
  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  const selectCharacterElem = document.querySelector('.select-character')
  const mousePos = { x: 0, y: 0 }
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

  window.addEventListener('mousemove', function(e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
  })

  window.addEventListener('resize', resizeHandler);

  stageElem.addEventListener('click', function(e) {
    console.log(e.clientX / window.innerWidth * 100);
    new Character({
      xPos: e.clientX / window.innerWidth * 100,
      speed: Math.random() * 0.5
    })
  })

  selectCharacterElem.addEventListener('click', function(e) {
    const vlaue = e.target.getAttribute('data-char')
    document.body.setAttribute('data-char', vlaue)
  })
})();
