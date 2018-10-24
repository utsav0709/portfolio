
// getting the hero text
const hero = document.querySelector('.hero-container--desktop')
const heroText = document.getElementById('heroText').firstElementChild;
const welcomeImg = document.getElementById('welcomeImg');
const textElem = document.querySelectorAll('.text-elem')
    // initial animation sequence
    function initialAnimationSequence(textArea) {
      const text = textArea.innerText;
      const to = text.length,
        from = 0;

        promiseAnimate({
          duration: 1000,
          timing: linear,
          draw: function(progress) {

          }
        }).then(function(result) {
          return new Promise(function(resolve) {
            textElem[0].classList.add('animated')
            textElem[0].classList.add('fadeInUp')
            resolve(1);
          })
        }).then(function(result) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              textElem[1].classList.add('animated')
              textElem[1].classList.add('fadeInUp')
              resolve(1);
            }, 1000)
          })
        })
        promiseAnimate({
          duration: 9000,
          timing: bounce,
          draw: function(progress) {
            const result = (to - from) * progress + from;
            textArea.innerHTML = text.substr(0, Math.ceil(result))
          }
        }).then(function (result) {
          promiseAnimate({
            duration: 1000,
            timing: circ,
            draw: function (progress) {
              heroText.style.width = (100 - 50 * progress) + '%';
            }
          }).then(function(result) {
            return new Promise(function(resolve) {
              hero.classList.add('hinge');
              resolve(1);
              })
          }).then(function(result) {
            return new Promise(function(resolve) {
              setTimeout(() => {
                promiseAnimate({
                  duration: 900,
                  timing: linear,
                  draw: function(progress) {
                    let currentScroll = window.pageYOffset;
                    let finalScroll = currentScroll + (topCoord[0] - currentScroll) * progress;
                    window.scrollTo(0, finalScroll);
                  }
                })
                resolve(1)
              }, 1200)
            })
          }).then(function(result) {
            return new Promise(function(resolve) {
              setTimeout(() => {
                document.body.style.overflow = 'scroll';
                  resolve(1)
              }, 700)
            })
          })
    })
}


    // calling the text animateText

    document.addEventListener('DOMContentLoaded', function () {
      initialAnimationSequence(heroText)
    })
    // section array

    const nav = document.querySelector('.nav-container--mobile');
    const exp = document.querySelector('.exp-container--desktop');
    const work = document.querySelector('.work-container--desktop');
    const about = document.querySelector('.me-container--desktop');
    const contact = document.querySelector('.contact-container--desktop');
    const navLinks = document.querySelectorAll('.nav-links--mobile span')


    const sectionArr = [nav, work, exp, about, contact];

    const topCoord = sectionArr.map(function (elem) {
      return getTopCoordinates(elem);
    })

    // event listener for navLinks
    navLinks.forEach(function (node, i) {
      node.addEventListener('click', function() {
        promiseAnimate({
          duration: 600,
          timing: linear,
          draw: function(progress) {
            let currentScroll = window.pageYOffset;
            let finalScroll = currentScroll + (topCoord[i + 1] - currentScroll) * progress;
            window.scrollTo(0, finalScroll);
          }
        })
      })
    })

    // scroll reveal

    const cardArr = document.querySelectorAll('.card-reveal')
    let isScrolling = false;
    function throttleScroll(e) {
      if (isScrolling == false) {
        window.requestAnimationFrame(function() {
          scrolling(e);
          isScrolling = false;
        });
      }
      isScrolling = true;
    }
    function scrolling(e) {
      cardArr.forEach(function(card) {
        if(isPartiallyVisible(card)) {
          card.classList.add('animated')
          card.classList.add('fadeInUp')
        }
      })
    }
    window.addEventListener('scroll', () => {
      throttleScroll()
    })
