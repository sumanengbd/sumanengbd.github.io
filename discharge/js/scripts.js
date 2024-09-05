$(document).ready(function () {
    // Function to add a new list item with an incremented counter
    $(function() {
        $(".list").sortable({
            placeholder: "ui-state-highlight"
        });

        // Add new list item
        $(".addnew").click(function () {
            var targetListId = $(this).data('target');
            var $list = $(targetListId);
            var $counter = $list.find('li').length + 1;
            var listItem = `<li class="ui-state-default"><input type="text" placeholder="Please Add New List ${$counter}"><button class="remove">✖</button></li>`;
            $list.append(listItem);
        });

        // Remove list item
        $(document).on('click', '.remove', function () {
            $(this).parent().remove();
        });
    });

    // Time
    function setCurrentTime() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var currentTime = hours + ':' + minutes;

        document.getElementById('current_time').value = currentTime;
    }

    setCurrentTime();

    // Datepicker
    $(function() {
        $(".datepicker").datepicker({
            dateFormat: "d MM, yy"
        });

        var currentDate = $.datepicker.formatDate('d MM, yy', new Date());
        $(".datepicker").val(currentDate);
    });

    $(document).ready(function() {
        // Parse the CSV file and store the options
        let medicineOptions = [];

        Papa.parse("images/medicine.csv", {
            download: true,
            header: true,
            complete: function(results) {
                console.log("CSV Loaded: ", results.data); // For debugging

                // Store the options in an array
                results.data.forEach(function(medicine) {
                    if (medicine.Name && medicine.Strength) {  // Check for valid data
                        const option = new Option(`${medicine.Name} - ${medicine.Strength}`, `${medicine.Name} - ${medicine.Strength}`, false, false);
                        medicineOptions.push(option);
                    }
                });

                // Initialize existing Select2 elements
                $('.medicine-select').each(function() {
                    const $select = $(this);
                    medicineOptions.forEach(option => $select.append(option.cloneNode(true)));
                    $select.select2({
                        placeholder: "Select a medicine",
                        allowClear: true
                    });
                });
            }
        });

        function addNewListItem(targetListId) {
            var $list = $(targetListId);
            var newItem = `
                <li class="rxcard_list--item">
                    <div class="select_option">
                        <select class="select2 medicine-select" name="medicine"></select>
                    </div>
                    <ul class="select_option-wrap list-unstyled">
                        <li>
                            <div class="state-filter">
                                <select name="">
                                    <option value="">1 + 1 + 1</option>
                                    <option value="">1 + 1 + 0</option>
                                    <option value="">1 + 0 + 1</option>
                                    <option value="">0 + 1 + 1</option>
                                    <option value="">1 + 0 + 0</option>
                                    <option value="">0 + 1 + 0</option>
                                    <option value="">0 + 0 + 1</option>
                                </select>
                            </div>
                        </li>
                        <li><span contenteditable="true">ভরা পেটে খাবেন</span></li>
                        <li><span contenteditable="true">৭ দিন</span></li>
                    </ul>
                    <button type="button" class="remove-item">✖</button>
                </li>
            `;

            $list.append(newItem);
            const $newSelect = $list.find('select.select2').last();

            // Add the stored options to the new select element
            medicineOptions.forEach(option => $newSelect.append(option.cloneNode(true)));

            // Initialize the new Select2 element
            $newSelect.select2({
                width: '100%',
                placeholder: "Select an option",
                allowClear: true
            });

            // Attach event listener to the remove button
            $list.find('.remove-item').last().click(function () {
                $(this).closest('.rxcard_list--item').remove();
            });
        }

        // Event listener for adding new list items
        $(".addnew_rx").click(function () {
            addNewListItem($(this).data('target'));
        });
    });

});