document.addEventListener("DOMContentLoaded", ()=> {
  // Defining text characters for the empty and full hearts for you to use later.
  const EMPTY_HEART = '♡'
  const FULL_HEART = '♥'
  let heart;
  // Your JavaScript code goes here!

  const likes = document.querySelectorAll("article.media-post li.like")
  const hearts = document.querySelectorAll("span.like-glyph")
  const modal = document.getElementById("modal")
  const modalP = document.getElementById("modal-message")

  hearts.forEach(function(like){
    like.addEventListener("click", function(e){
      heart = e.target.innerText;
      if (heart === EMPTY_HEART) {
        mimicServerCall()
        .then(resp => {
          e.target.innerText = FULL_HEART;
          e.target.classList += " activated-heart";
        }).catch(error => {
            modal.classList.remove("hidden");
            modalP.innerText = error;
            setTimeout( () => {
              modal.className += "hidden";
          }, 5000)
        })
      } else {
        e.target.innerText = EMPTY_HEART
        e.target.classList.remove("activated-heart")
      };
    });
  });
})

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
