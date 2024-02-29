/**
 * Tabs JavaScript
 *
 * This file defines Tabs
 * behavior.
 */

// eslint-disable-next-line no-console
console.log('tabs script has loaded'); // replace with your own code
window.onload = function() {
    const tabBlocks = document.querySelectorAll('.wp-block-sinag-tabs');

    tabBlocks.forEach((tabBlock, i) => {
        const tabLabels = tabBlock.querySelectorAll('.tab-label');
        const tabPanels = tabBlock.querySelectorAll('.tab-panel');

        const setIDs = (tabItems, role) => {
            tabItems.forEach((element, index) => {
                tabItems[index].id = `${role}-${i}-${index}`;
            });
        }

        setIDs(tabLabels, 'tab');
        setIDs(tabPanels, 'tabpanel');

        const setAriaAttributes = (tabItems, role) => {
            tabItems.forEach((element, index) => {
                if (role === 'tab') {
                    tabItems[index].setAttribute('aria-controls', `tabpanel-${i}-${index}`);
                } else if (role === 'tabpanel') {
                    tabItems[index].setAttribute('aria-labelledby', `tab-${i}-${index}`);
                }
            });
        }

        setAriaAttributes(tabLabels, 'tab');
        setAriaAttributes(tabPanels, 'tabpanel');

        const toggleEvent = (e) => {
            if (e.type === 'click' || (e.type === 'keypress' && (e.charCode === 32 || e.keyCode === 13))) {
                return true;
            } else {
                return false;
            }
        }

        const toggleAttributes = (label, tabIndex) => {
            const activeTab = tabBlock.querySelector('.tab-label.active');
            const activePanel = tabBlock.querySelector('.tab-panel.active');

            if (activeTab) {
                activeTab.classList.remove('active');
                activeTab.setAttribute('tabindex', 0);
                activeTab.setAttribute('aria-selected', false);
            }

            label.classList.add('active');
            label.setAttribute('tabindex', -1);
            label.setAttribute('aria-selected', true);

            if (activePanel) {
                activePanel.classList.remove('active');
                activePanel.setAttribute('tabindex', 0);
                activePanel.setAttribute('aria-selected', false);
                activePanel.setAttribute('hidden', true);
            }

            if (tabPanels[tabIndex]) {
                tabPanels[tabIndex].classList.add('active');
                tabPanels[tabIndex].removeAttribute('hidden');
            }
        }

        tabLabels.forEach((label, tabIndex) => {
            if (label.classList.contains('active')) {
                toggleAttributes(label, tabIndex);
            }

            label.addEventListener('click', (e) => {
                if (toggleEvent(e) === true) {
                    toggleAttributes(label, tabIndex);
                }
            });

            label.addEventListener('keypress', (e) => {
                if (toggleEvent(e) === true) {
                    toggleAttributes(label, tabIndex);
                }
            });
        });
    });
};
