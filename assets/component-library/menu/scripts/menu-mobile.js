import { slideUp, slideDown } from '../../../util/slideUpDownToggle'; 

document.addEventListener("DOMContentLoaded", () => {
  // Initialize a flag to track the mobile menu state
  let mobileMenuOpen = false;

  // Select necessary DOM elements
  const menuBtn = document.querySelector("header button.mobile-menu-button");
  const nav = document.querySelector("header nav.nav-primary");
  const navPrimaryLinks = document.querySelectorAll(".menu > li > a");
  const toggleDropdownMenuClass = "open-sub-menu";

  // Function to hide the header sub-menu
  const headerSubMenuHide = () => {
    // Remove the open class from all primary menu items
    navPrimaryLinks.forEach((link) =>
      link.parentNode.classList.remove(toggleDropdownMenuClass)
    );

    // Set 'aria-expanded' attribute to 'false' for all primary menu links
    navPrimaryLinks.forEach((link) =>
      link.setAttribute("aria-expanded", "false")
    );

    // Use your custom slideUp function here
    slideUp(nav);
  };

  // Function to show the mobile header menu
  const headerMobileShow = (element) => {
    // Add 'is-active' class to the hamburger icon
    element.querySelector(".hamburger").classList.add("is-active");

    // Add 'nav-open' class to the body to show the mobile menu
    document.body.classList.add("nav-open");

    // Use your custom slideDown function here
    slideDown(nav);
    // Update the mobile menu state
    mobileMenuOpen = true;
  };

  // Function to hide the mobile header menu
  const headerMobileHide = (element) => {
    // Remove 'is-active' class from the hamburger icon
    element.querySelector(".hamburger").classList.remove("is-active");

    // Remove 'nav-open' class from the body to hide the mobile menu
    document.body.classList.remove("nav-open");

    // Use your custom slideUp function here
    slideUp(nav);
    // Update the mobile menu state
    mobileMenuOpen = false;
  };

  // Function to handle header behavior
  const sinagHeader = () => {

    // Add a click event listener for the mobile menu button
    menuBtn.addEventListener("click", () => {
      if (!mobileMenuOpen) {
        // Show the mobile menu
        headerMobileShow(menuBtn);
      } else {
        // Hide the mobile menu
        headerMobileHide(menuBtn);
      }
    });

    // Add a click event listener to close sub-menus when clicking outside header, main, or footer
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        !target.closest("header") &&
        !target.closest("main") &&
        !target.closest("footer")
      ) {
        headerSubMenuHide();
      }
    });
  };

  // Check if the screen width is less than or equal to 768px (tablet and mobile)
  if (window.innerWidth <= 768) {
    // Initialize the header behavior
    sinagHeader();
  }
});
