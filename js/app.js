var deck = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond']
var shown = []
var moveCount = 0
var seconds = 0
var timer
var isTimerRunning = false

// provided function for shuffling
function shuffle (array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  $('.card').each(function (index) {
    $(this).attr('data-card', deck[index])
    $(this).append($('<i class="fa fa-' + deck[index] + '"></i>'))
  })
  return array
}
// intiating shuffle and onclick function
shuffle(deck)
onclicks()
// setuping onclicks for restart and card clicks also with checking for moves, stars, and timer
function onclicks () {
  $('.restart').on('click', function () {
    restart()
  })
  $('.card').on('click', function () {
    if (!$('.card').hasClass('show')) {moveCount++}
    flip($(this))
    $('.moves').text(moveCount)
    updateStars()
    if (isTimerRunning == false) {
      timerStart()
    }
  })
}
// logic for star grading
function updateStars () {
  if (moveCount == 20) {
    $('.fa-star').first().addClass('fa-star-o').removeClass('fa-star')
  }
  if (moveCount == 25) {
    $('.fa-star').first().addClass('fa-star-o').removeClass('fa-star')
  }
}
// single card flip
function flip (card) {
  card.addClass('open show')

  checkMatch()
  checkWin()
}

// checking if two selected cards match if so pushed into shown array
function checkMatch () {
  if ($('.open').length === 2) {
    if ($('.open').first().attr('data-card') == $('.open').last().attr('data-card')) {
      shown.push($('.open').first().attr('data-card'))
      shown.push($('.open').last().attr('data-card'))
      $('.open').addClass('match')
      $('.open').removeClass('open show')
    }else {
      setTimeout(remove, 1000)
    }
  }
  if ($('.open').length === 3) {
    remove()
  }
}

// timer for game
function timerStart () {
  isTimerRunning = true
  timer = setInterval(increment, 1000)
}

function increment () {
  seconds++
  $('.timer').text(seconds)
}

// restarting game reshufling array and hiding all cards
function restart () {
  remove()
  $('.card').each(function (index) {
    $(this).empty()
    $(this).removeClass('open selected match  ')
    moveCount = 0
  })
  shuffle(deck)
  $('.moves').text(moveCount)
  $('.stars .fa').removeClass('fa-star-o').addClass('fa-star')
  seconds = 0
  clearInterval(timer)
  $('.timer').text(seconds)
  isTimerRunning = false
}

function remove () {
  $('.open').removeClass('open show')
}

function checkWin () {
  if (shown.length === 16) {
    clearInterval(timer)
    modal.style.display = 'block'
    $('.inTime').text(`It took you ${seconds} seconds`)
    $('.gottenStars').text(`And you get ${$('fa-star').length} stars`)
    shown = []
  }
}
// modal logic w3schools
var modal = document.getElementById('myModal')
var span = document.getElementsByClassName('close')[0]
var btn = document.getElementsByClassName('playAgain')[0]

span.onclick = function () {
  modal.style.display = 'none'
}

btn.onclick = function () {
  restart()
  modal.style.display = 'none'
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
