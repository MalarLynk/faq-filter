document.addEventListener("DOMContentLoaded", () => {

    const categoryFilter =
        document.getElementById("categoryFilter");

    const searchBox =
        document.getElementById("searchBox");

    function applyFilters() {

        const category =
            categoryFilter.value.toLowerCase();

        const search =
            searchBox.value.toLowerCase();

        document.querySelectorAll(".section-row")
            .forEach(row => {

                const rowCategory =
                    row.querySelector("th")
                        .innerText
                        .toLowerCase();

                const text =
                    row.innerText.toLowerCase();

                const categoryMatch =
                    !category ||
                    rowCategory === category;

                const searchMatch =
                    !search ||
                    text.includes(search);


                if (categoryMatch && searchMatch) {
                    row.style.display = "table-row";
                }
                else {
                    row.style.display = "none";
                }
            });

        document.querySelectorAll(".section-header")
            .forEach(header => {

                const section =
                    header.dataset.section;

                const visible =
                    document.querySelectorAll(
                        ".section-row." + section +
                        ":not([style*='display: none'])"
                    ).length;

                header.style.display =
                    visible ? "table-row" : "none";
            });
    }

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

    searchBox.addEventListener(
        "keyup",
        applyFilters
    );


    // COLLAPSIBLE SECTIONS

    document.querySelectorAll(".section-header")
        .forEach(header => {

            const button =
                header.querySelector(".toggle-section");

            const section =
                header.dataset.section;

            const rows =
                document.querySelectorAll(
                    ".section-row." + section
                );

            button.addEventListener(
                "click",
                () => {

                    const collapsed =
                        rows[0]
                            .classList
                            .contains("hidden");

                    rows.forEach(row => {
                        row.classList.toggle(
                            "hidden"
                        );
                    });

                    button.textContent =
                        collapsed ? "-" : "+";
                });
        });
});