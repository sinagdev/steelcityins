import {
  slideToggle,
  slideUp,
  slideDown,
} from "../../../util/slideUpDownToggle";

document.addEventListener("DOMContentLoaded", () => {
  const searchButtons = document.querySelectorAll(".search-button");
  const searchInputContainer = document.querySelector(
    ".searchform .input-group--overlay"
  );
  const searchInput = document.querySelector(".form-control");
  const hoverSpeed = 300;

  let focusTrapActive = false;

  const closeSearchInput = () => {
    slideUp(searchInputContainer, hoverSpeed);
    focusTrapActive = false;
    searchButtons.forEach((button) => button.focus());
  };

  const closeSubMenus = () => {
    // Close submenus from header-toggle.js
    const menuItems = document.querySelectorAll(".menu > li.dropdown-click");
    menuItems.forEach((menuItem) => {
      const parentLink = menuItem.querySelector("a");
      const subMenu = menuItem.querySelector("ul.sub-menu");

      if (parentLink.classList.contains("open-sub-menu")) {
        slideUp(subMenu, hoverSpeed);
        parentLink.classList.remove("open-sub-menu");
      }
    });

    // Close submenus from header-hover.js
    const subMenuBtnHover = document.querySelectorAll(
      ".menu li.dropdown-hover > ul.sub-menu"
    );
    subMenuBtnHover.forEach((submenu) => slideUp(submenu, hoverSpeed));
  };

  const handleSearchInputKeyup = (e) => {
    if (e.key === "Escape" || e.keyCode === 27) {
      if (focusTrapActive) {
        closeSearchInput();
        closeSubMenus(); // Close submenus when the search input is closed
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  const handleSearchButtonKeyup = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      slideDown(searchInputContainer, hoverSpeed);
      setTimeout(() => {
        searchInput.focus();
      }, hoverSpeed);
      focusTrapActive = true;
      closeSubMenus(); // Close submenus when the search input is opened
    }
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    slideToggle(searchInputContainer, hoverSpeed);

    if (!focusTrapActive) {
      setTimeout(() => {
        searchInput.focus();
      }, hoverSpeed);
      focusTrapActive = true;
      closeSubMenus(); // Close submenus when the search input is opened
    } else {
      closeSearchInput();
    }
  };

  if (searchButtons) {
    searchButtons.forEach((searchButton) => {
      searchButton.addEventListener("keyup", handleSearchButtonKeyup);
      searchButton.addEventListener("click", handleSearchButtonClick);

      searchButton.setAttribute("role", "button");
      searchButton.setAttribute("tabindex", "0");
      searchButton.setAttribute("aria-label", "Search");
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", handleSearchInputKeyup);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.keyCode === 9) {
        // Tab key
        if (searchInput.value.trim() === "") {
          // Check if the input field is empty
          e.preventDefault();
          closeSearchInput();
          closeSubMenus(); // Close submenus when the search input is closed
        }
      }
    });
  }

  // Close the search input if a click occurs outside of it
  document.addEventListener("click", (e) => {
    if (
      focusTrapActive &&
      !searchInputContainer.contains(e.target) &&
      !Array.from(searchButtons).some((button) => button.contains(e.target))
    ) {
      closeSearchInput();
      closeSubMenus(); // Close submenus when the search input is closed
    }
  });
});
