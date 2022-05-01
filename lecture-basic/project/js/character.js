function Character(info) {
  this.mainElem = document.createElement('div');
  this.mainElem.classList.add('character');
  this.mainElem.innerHTML = ''
      + '<div class="character-face-con character-head">'
       + '<div class="character-face character-head-face face-front"></div>'
       + '<div class="character-face character-head-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-torso">'
       + '<div class="character-face character-torso-face face-front"></div>'
       + '<div class="character-face character-torso-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-arm character-arm-right">'
        + '<div class="character-face character-arm-right-face face-front"></div>'
        + '<div class="character-face character-arm-right-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-arm character-arm-left">'
        + '<div class="character-face character-arm-left-face face-front"></div>'
        + '<div class="character-face character-arm-left-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-leg-right">'
        + '<div class="character-face character-leg-right-face face-front"></div>'
        + '<div class="character-face character-leg-right-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-leg-left">'
        + '<div class="character-face character-leg-left-face face-front"></div>'
        + '<div class="character-face character-leg-left-face face-back"></div>'
      + '</div>'
  this.mainElem.style.left = info.xPos + '%';
  // 스크롤 중인지 아닌지
  this.scrollState = false;
  // 바로 마지막 스크롤 위치
  this.lastScrollTop = 0;
  // 캐릭터의 스피드
  this.xPos = info.xPos;
  this.speed = info.speed;
  this.direction;
  // 좌우 이동 중인지 아닌지를 판별
  this.runningState = false;
  this.rafId;
  document.querySelector('.stage').appendChild(this.mainElem);
  this.init()
}
Character.prototype = {
  consturctor: Character,
  init: function() {
    const that = this
    window.addEventListener('scroll', function() {
      clearTimeout(that.scrollState);

      if(!that.scrollState) {
        that.mainElem.classList.add('running');
      }

      that.scrollState = this.setTimeout(function() {
        that.scrollState = false;
        that.mainElem.classList.remove('running');
      }, 500)

      // 이전 스크롤 위취와 현채 스크롤 위치를 비교
      if(that.lastScrollTop > this.pageYOffset) {
        // 이전 스크롤 위치가 크다면: 스크롤 올림 backward
        that.mainElem.setAttribute('data-direction', 'backward')
      } else {
        // 현재 스크롤 위차가 크다면: 스크롤 내림 forward
        that.mainElem.setAttribute('data-direction', 'forward')
      }
      console.log('lastScrollTop: '+that.lastScrollTop);
      console.log('pageYoffset: ' + pageYOffset);
      that.lastScrollTop = pageYOffset
    });

    window.addEventListener('keydown', function(e) {
      if(that.runningState) return;
      if(e.keyCode == 37) {
        that.mainElem.setAttribute('data-direction', 'left')
        that.mainElem.classList.add('running');
        that.direction = 'left';
        that.run();
        that.runningState = true;
      } else if(e.keyCode == 39) {
        that.mainElem.setAttribute('data-direction', 'right')
        that.mainElem.classList.add('running');
        that.direction = 'right';
        that.run();
        that.runningState = true;
      }
    })

    window.addEventListener('keyup', function() {
      that.mainElem.classList.remove('running');
      cancelAnimationFrame(that.rafId)
      that.runningState = false;
    })
  },
  run: function() {
    const that = this;
    if(that.direction ==  'left') {
      that.xPos -= that.speed 
    } else if(that.direction == 'right') {
      that.xPos += that.speed 
    }
    if(that.xPos < 2) {
      that.xPos = 2
    }
    if(that.xPos > 88) {
      that.xPos = 88
    }

    that.mainElem.style.left = `${that.xPos}%`
    // requestAnimationFrame(function() {
    //   // 인자를 받아 처리하는 방법
    //   that.run(that)
    // });
    that.rafId = requestAnimationFrame(that.run.bind(that));
  }
}