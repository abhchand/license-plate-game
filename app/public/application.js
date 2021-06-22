document.addEventListener('DOMContentLoaded', (event) => {
  //
  // State button onClick behavior
  //

  var stateButtons = document.getElementsByClassName('state-btn');

  for(var i=0; i < stateButtons.length; i++) {
    var btnEl = stateButtons[i];

    btnEl.addEventListener('click', (e) => {
      // Set the name of the state in the display text
      var display = document.getElementsByClassName('state-name')[0];
      display.innerText = e.target.dataset.name;

      // Set the state in the hidden form field
      var display = document.getElementsByClassName('field--state')[0];
      display.value = e.target.dataset.id;

      // Open the modal
      var modal = document.getElementsByClassName('sighting-modal')[0];
      modal.classList.add('open');
    });
  }

  //
  // Form button disabled/enabled behavior
  //

  var playerNames = document.getElementsByClassName('field--player-id');

  for(var i=0; i < playerNames.length; i++) {
    var inputEl = playerNames[i];

    inputEl.addEventListener('click', (e) => {
      // As soon as any radio button selection is made, enable the form submit
      var submitBtn = document.getElementsByClassName('modal-btn--submit')[0];
      submitBtn.disabled = false;
    });
  }

  //
  // Cancel Button
  //

  document.getElementsByClassName('modal-btn--close')[0].addEventListener('click', (e) => {
    // Open the modal
    var modal = document.getElementsByClassName('sighting-modal')[0];
    modal.classList.remove('open');

    // Disable the form submit
    var submitBtn = document.getElementsByClassName('modal-btn--submit')[0];
    submitBtn.disabled = true;

    // Reset the form
    document.getElementsByTagName('form')[0].reset();
  });

  //
  // Prompt for deletion when deleting sighting
  //

  var deleteLinks = document.querySelectorAll('.delete');

  for (var i = 0; i < deleteLinks.length; i++) {
    deleteLinks[i].addEventListener('click', (e) => {
      e.preventDefault();

      var choice = confirm('Are you sure you want to delete this sighting?');

      if (choice) {
        window.location.href = e.target.getAttribute('href');
      }
    });
  }
});
