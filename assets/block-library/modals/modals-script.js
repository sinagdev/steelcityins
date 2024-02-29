/**
 * Modals JavaScript
 *
 * This file defines Modals
 * behavior.
 */

// eslint-disable-next-line no-console
// console.log('modals script has loaded'); 
document.addEventListener('DOMContentLoaded', function () {
    // Select all modal wrapper elements
    const modalsContainer = document.querySelectorAll('.modals-container');
    
    // Loop through each modal wrapper
    modalsContainer.forEach(wrapper => {
        // Get the modal-target attribute value
        const modalTarget = wrapper.getAttribute('modal-target');
        
        // Find the modal trigger element within the wrapper
        const modalTrigger = wrapper.querySelector('.modal-trigger');
        // Set the href attribute of the modal trigger
        modalTrigger.setAttribute('href', `#modal-target-${modalTarget}`);
        
        // Find the modal content element within the wrapper
        const modalContent = wrapper.querySelector('.modal');
        // Set the id attribute of the modal content
        modalContent.setAttribute('id', `modal-target-${modalTarget}`);
        
        // Initialize the modal using your preferred library (e.g., M.Modal.init)
        // Be sure to select the modal content element using the updated ID
        // Example: M.Modal.init(modalContent);
    });
});
