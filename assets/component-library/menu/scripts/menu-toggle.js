import { slideUp, slideDown } from "../../../util/slideUpDownToggle";

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu > li.dropdown-click");
  const hoverSpeed = 200;

  menuItems.forEach((menuItem) => {
    const parentLink = menuItem.querySelector("a");
    const subMenu = menuItem.querySelector("ul.sub-menu");

    parentLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = parentLink.classList.toggle("open-sub-menu");
      if (isOpen) {
        // Close the search input if open
        closeSearchInput();
        closeOtherSubMenus(menuItem);
        slideDown(subMenu, hoverSpeed);
        const firstSubMenuItem = subMenu.querySelector("li:first-child a");
        if (firstSubMenuItem) {
          firstSubMenuItem.focus();
        }
      } else {
        slideUp(subMenu, hoverSpeed);
      }
    });

    // Function to close the search input
    // Function to close the search input
    const closeSearchInput = () => {
      const searchInputContainer = document.querySelector(
        ".searchform .input-group--overlay"
      );
      if (
        searchInputContainer &&
        searchInputContainer.style.display !== "none"
      ) {
        slideUp(searchInputContainer, hoverSpeed);
      }
    };

    // Function to close other sub-menus
    function closeOtherSubMenus(currentMenuItem) {
      menuItems.forEach((menuItem) => {
        if (menuItem !== currentMenuItem) {
          const parentLink = menuItem.querySelector("a");
          const subMenu = menuItem.querySelector("ul.sub-menu");

          if (parentLink.classList.contains("open-sub-menu")) {
            parentLink.classList.remove("open-sub-menu");
            slideUp(subMenu, hoverSpeed);
          }
        }
      });
    }
  });

  // Add event listener to document for clicks outside of open sub-menus
  document.addEventListener("click", (e) => {
    menuItems.forEach((menuItem) => {
      const parentLink = menuItem.querySelector("a");
      const subMenu = menuItem.querySelector("ul.sub-menu");

      if (parentLink.classList.contains("open-sub-menu")) {
        const isClickInsideSubMenu = subMenu.contains(e.target);
        if (!isClickInsideSubMenu) {
          parentLink.classList.remove("open-sub-menu");
          slideUp(subMenu, hoverSpeed);
        }
      }
    });
  });

  // Add event listener to document for ESC key
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      menuItems.forEach((menuItem) => {
        const parentLink = menuItem.querySelector("a");
        const subMenu = menuItem.querySelector("ul.sub-menu");

        if (parentLink.classList.contains("open-sub-menu")) {
          e.preventDefault();
          slideUp(subMenu, hoverSpeed);
          parentLink.focus();
        }
      });
    }
  });
});