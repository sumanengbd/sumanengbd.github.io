document.addEventListener('DOMContentLoaded', () => {
    const pnameInput = document.getElementById('pname');

    pnameInput.addEventListener('input', () => {
        const pnameValue = pnameInput.value.trim();
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,};
        const currentDateTime = now.toLocaleString('en-US', options);

        document.title = pnameValue ? `${pnameValue} এর ছাড়পত্র - ${currentDateTime}` : 'রোগীর ছাড়পত্র';
    });
});

$(document).ready(function () {
    document.getElementById('print').addEventListener('click', function() {
        window.print();
    });

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
            var listItem = `<li class="ui-state-default"><input type="text" placeholder="নতুন তালিকা ${$counter}"><button class="remove">✖</button></li>`;
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
    $.datepicker.regional['bn'] = {
        closeText: 'বন্ধ',
        prevText: 'আগে',
        nextText: 'পরে',
        currentText: 'আজ',
        monthNames: ['জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
            'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
        monthNamesShort: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রি', 'মে', 'জুন',
            'জুল', 'আগ', 'সেপ', 'অক', 'নভে', 'ডিসে'],
        dayNames: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
        dayNamesShort: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
        dayNamesMin: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
        weekHeader: 'হপ্তা',
        dateFormat: 'dd MM, yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    
    $.datepicker.setDefaults($.datepicker.regional['bn']);
    
    function convertToBengaliNumber(num) {
        const englishToBengaliMap = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
        };
        return num.replace(/\d/g, function (digit) {
            return englishToBengaliMap[digit];
        });
    }

    $(".datepicker").datepicker({
        isRTL: false,
        changeYear: true,
        changeMonth: true,
        dateFormat: "dd MM, yy",
        onSelect: function(dateText) {
            $(this).val(convertToBengaliNumber(dateText));
        }
    });

    var currentDate = $.datepicker.formatDate('dd MM, yy', new Date());
    $(".datepicker").val(convertToBengaliNumber(currentDate));

    $(document).ready(function() {
        let medicineOptions = [];

        Papa.parse("images/medicine.csv", {
            download: true,
            header: true,
            complete: function(results) {
                results.data.forEach(function(medicine) {
                    if (medicine.Name && medicine.DrugTypeShort) { 
                        const optionValue = medicine.Strength ? `${medicine.DrugTypeShort}. ${medicine.Name} - ${medicine.Strength}` : `${medicine.DrugTypeShort}. ${medicine.Name}`;

                        const option = new Option(optionValue, optionValue, false, false);

                        medicineOptions.push(option);
                    }
                });

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
                                    <option value="">১ + ১ + ১</option>
                                    <option value="">১ + ১ + ০</option>
                                    <option value="">১ + ০ + ১</option>
                                    <option value="">০ + ১ + ১</option>
                                    <option value="">১ + ০ + ০</option>
                                    <option value="">০ + ১ + ০</option>
                                    <option value="">০ + ০ + ১</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div class="state-filter">
                                <select name="">
                                    <option value="">ভরা পেটে খাবেন</option>
                                    <option value="">খালি পেতে খাবেন</option>
                                    <option value="">খাবার আগে খাবেন</option>
                                    <option value="">খাওয়ার পরে খাবেন</option>
                                    <option value="">চুষে খাবেন</option>
                                </select>
                            </div>
                        </li>
                        <li><span contenteditable="true">৭ দিন</span></li>
                    </ul>
                    <button type="button" class="remove-item">✖</button>
                </li>
            `;

            $list.append(newItem);
            const $newSelect = $list.find('select.medicine-select').last();

            // Add the stored options to the new select element
            medicineOptions.forEach(option => $newSelect.append(option.cloneNode(true)));

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

    // Function to update output div based on input value
    function updateOutput(inputElement, outputDiv) {
        outputDiv.textContent = inputElement.value.trim();
    }

    // Handle 'Name of operation' input field
    const inputField = document.getElementById('operation-name');
    const nameOutputDiv = document.getElementById('name-output-text');

    inputField.addEventListener('input', () => updateOutput(inputField, nameOutputDiv));

    // Handle textarea for operation details
    const textarea = document.getElementById('operation-details');
    const detailsOutputDiv = document.getElementById('details-output-text');

    textarea.addEventListener('input', () => updateOutput(textarea, detailsOutputDiv));

    // Handle disease input (Bangla)
    const diseaseField = document.getElementById('disease');
    const diseaseOutputDiv = document.getElementById('disease-output-text');

    diseaseField.addEventListener('input', () => updateOutput(diseaseField, diseaseOutputDiv));

    // Initialize output divs with current content
    updateOutput(inputField, nameOutputDiv);
    updateOutput(textarea, detailsOutputDiv);
    updateOutput(diseaseField, diseaseOutputDiv);

});