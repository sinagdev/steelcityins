import { slideUp, slideDown } from "../../../util/slideUpDownToggle";

document.addEventListener("DOMContentLoaded", () => {
  const subMenuBtnHover = document.querySelectorAll(".menu li.dropdown-hover");
  const subMenuHover = document.querySelectorAll(
    ".menu li.dropdown-hover > ul.sub-menu"
  );
  const hoverSpeed = 200; // milliseconds
  const mobileWidth = 768; // Adjust this to your desired mobile breakpoint

  // Function to check if it's mobile
  function isMobile() {
    return window.innerWidth < mobileWidth;
  }

  subMenuBtnHover.forEach((btn) => {
    let isHovered = false;

    function toggleSubMenu() {
      isHovered = !isHovered;
      handleSubMenu(isHovered, btn);
      closeOtherToggleSubMenus();
    }

    btn.addEventListener("mouseenter", () => {
      if (!isMobile()) {
        // Only toggle the submenu, don't set focus
        toggleSubMenu();
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (!isMobile()) {
        // Only toggle the submenu, don't set focus
        toggleSubMenu();
      }
    });

    btn.addEventListener("click", (e) => {
      if (isMobile()) {
        e.preventDefault();
        toggleSubMenu();
      }
    });

    // Added event listener for Enter key (key code 13)
    btn.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        isHovered = !isHovered;
        handleSubMenu(isHovered, btn);
        closeOtherToggleSubMenus();
        // Set focus when opened with keyboard
        if (isHovered) {
          const submenu = btn.querySelector(".sub-menu");
          const firstSubmenuItem = submenu.querySelector("li");
          if (firstSubmenuItem) {
            firstSubmenuItem.querySelector("a").focus();
          }
        }
      }
    });

    // Added event listener for Tab key (key code 9)
    btn.addEventListener("keydown", (e) => {
      if (e.keyCode === 9) {
        if (isHovered) {
          // Check if it's mobile and the last sub-menu item is focused
          if (isMobile()) {
            const submenuLinks = btn.querySelectorAll(".sub-menu a");
            const lastSubmenuLink = submenuLinks[submenuLinks.length - 1];
            if (document.activeElement === lastSubmenuLink) {
              e.preventDefault();
              toggleSubMenu();
              // Shift focus back to the parent menu link
              btn.focus();
            }
          }
        }
      }
    });

    // Prevent focus styles when hovering with the cursor
    btn.addEventListener("focus", () => {
      if (!isMobile() && !isHovered) {
        btn.blur();
      }
    });
  });

  subMenuHover.forEach((submenu) => {
    submenu.addEventListener("mouseenter", () => {
      clearTimeout(submenu.slideUpTimeout);
    });

    submenu.addEventListener("mouseleave", () => {
      submenu.slideUpTimeout = setTimeout(
        () => slideUp(submenu, hoverSpeed),
        100
      );
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      subMenuHover.forEach((submenu) => slideUp(submenu, hoverSpeed));
    }
  });

  function handleSubMenu(isOpen, btn) {
    // Close the search input if open
    closeSearchInput();

    if (isOpen) {
      btn.classList.add("dropdown-hover-open");
      const submenu = btn.querySelector(".sub-menu");
      if (submenu) {
        slideDown(submenu, hoverSpeed);
      }
    } else {
      btn.classList.remove("dropdown-hover-open");
      const submenu = btn.querySelector(".sub-menu");
      if (submenu) {
        slideUp(submenu, hoverSpeed);
      }
    }
  }

  function closeOtherToggleSubMenus() {
    const menuItems = document.querySelectorAll(".menu > li.dropdown-click");
    menuItems.forEach((menuItem) => {
      const parentLink = menuItem.querySelector("a");
      const subMenu = menuItem.querySelector("ul.sub-menu");

      if (parentLink.classList.contains("open-sub-menu")) {
        slideUp(subMenu, hoverSpeed);
        parentLink.classList.remove("open-sub-menu");
      }
    });
  }

  // Function to close the search input
  function closeSearchInput() {
    const searchInputContainer = document.querySelector(
      ".searchform .input-group--overlay"
    );
    if (searchInputContainer && searchInputContainer.style.display !== "none") {
      slideUp(searchInputContainer, hoverSpeed);
    }
  }
});
