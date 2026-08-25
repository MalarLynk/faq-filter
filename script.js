document.addEventListener("DOMContentLoaded", () => {

    const categoryFilter = document.getElementById("categoryFilter");
    const searchBox = document.getElementById("searchBox");


    // Store the collapse state of each section
    const collapsedSections = {};


    // ==============================
    // APPLY FILTERS
    // ==============================

    function applyFilters() {

        const category = categoryFilter.value.toLowerCase().trim();
        const search = searchBox.value.toLowerCase().trim();


        document.querySelectorAll(".section-header").forEach(header => {

            const section = header.dataset.section;

            const rows = document.querySelectorAll(
                ".section-row." + section
            );


            let visibleRows = 0;


            rows.forEach(row => {

                const rowCategory =
                    row.querySelector("th")
                        .innerText
                        .toLowerCase()
                        .trim();

                const text =
                    row.innerText.toLowerCase();


                const categoryMatch =
                    !category ||
                    rowCategory === category;


                const searchMatch =
                    !search ||
                    text.includes(search);


                const matches =
                    categoryMatch &&
                    searchMatch;


                /*
                 * IMPORTANT:
                 * Filtering controls display.
                 * Collapsing controls the hidden class.
                 */
                if (matches) {

                    row.classList.remove("filtered-out");
                    visibleRows++;

                } else {

                    row.classList.add("filtered-out");

                }

            });


            // Hide section header if no rows match
            if (visibleRows === 0) {

                header.classList.add("filtered-out");

            } else {

                header.classList.remove("filtered-out");

            }

        });


        updateCollapsedSections();

    }


    // ==============================
    // UPDATE COLLAPSED SECTIONS
    // ==============================

    function updateCollapsedSections() {

        document.querySelectorAll(".section-header")
            .forEach(header => {

                const section =
                    header.dataset.section;

                const rows =
                    document.querySelectorAll(
                        ".section-row." + section
                    );


                const isCollapsed =
                    collapsedSections[section] === true;


                rows.forEach(row => {

                    /*
                     * Do not remove filtered-out here.
                     * Filtering and collapsing are separate.
                     */

                    if (isCollapsed) {

                        row.classList.add("collapsed");

                    } else {

                        row.classList.remove("collapsed");

                    }

                });


                // Update button
                const button =
                    header.querySelector(".toggle-section");


                if (button) {

                    button.textContent =
                        isCollapsed ? "+" : "-";

                }

            });

    }


    // ==============================
    // COLLAPSIBLE SECTIONS
    // ==============================

    document.querySelectorAll(".section-header")
        .forEach(header => {

            const button =
                header.querySelector(".toggle-section");

            const section =
                header.dataset.section;


            // Default state = expanded
            collapsedSections[section] = false;


            button.addEventListener("click", () => {

                collapsedSections[section] =
                    !collapsedSections[section];


                updateCollapsedSections();

            });

        });


    // ==============================
    // FILTER EVENTS
    // ==============================

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );


    searchBox.addEventListener(
        "input",
        applyFilters
    );


    // ==============================
    // INITIALIZE
    // ==============================

    applyFilters();

});