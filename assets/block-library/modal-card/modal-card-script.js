/**
 * Modal Card JavaScript
 *
 * This file defines Modal Card
 * behavior.
 */

// eslint-disable-next-line no-console

document.addEventListener("DOMContentLoaded", function () {
  var modalContainers = document.querySelectorAll(".modal-card-container");

  modalContainers.forEach(function (modalContainer) {
      var modalTrigger = modalContainer.querySelector(".modal-card-trigger");
      var modalPopup = modalContainer.querySelector(".modal-card-popup");
      var modalOverlay = modalContainer.querySelector(".modal-card-overlay");

      modalTrigger.addEventListener("click", function () {
          modalOverlay.style.display = "block";
          modalPopup.style.display = "block";
          document.body.style.overflow = "hidden"; // Disable scrolling
          document.body.appendChild(modalOverlay); // Move the modal card popup to the end of the body
      });

      var modalClose = modalContainer.querySelector(".modal-card-close");
      modalClose.addEventListener("click", function () {
          closeModal();
      });

      modalOverlay.addEventListener("click", function (event) {
          // Check if the clicked element is the overlay itself (not its children)
          if (event.target === modalOverlay) {
              closeModal();
          }
      });

      function closeModal() {
          modalOverlay.style.display = "none";
          modalPopup.style.display = "none";
          document.body.style.overflow = "auto"; // Enable scrolling
      }
  });
});
