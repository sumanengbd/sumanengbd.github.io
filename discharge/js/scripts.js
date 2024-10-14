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

    // Function to update output div based on input value
    function updateOutput(inputElement, outputDiv) {
        if (outputDiv) {
            if (inputElement.tagName === 'SELECT' && inputElement.multiple) {
                const selectedOptions = Array.from(inputElement.selectedOptions)
                    .map((option, index) => `${index + 1}. ${option.value}`)
                    .join(', ');
                outputDiv.textContent = selectedOptions;
            } else {
                outputDiv.textContent = inputElement.value.trim();
            }
            console.log(`Updating output: ${outputDiv.textContent}`);
        }
    }

    ['operation-name', 'operation-details', 'disease', 'anesthetist', 'surgeon', 'assistant'].forEach(id => {
        const element = document.getElementById(id);
        const output = document.getElementById(`${id}-output-text`); 
        
        if (element && output) {
            const eventType = element.tagName === 'SELECT' ? 'change' : 'input';
            element.addEventListener(eventType, () => updateOutput(element, output));
        }
    });

    // Array to hold medicine options
    let medicineOptions = [];

    Papa.parse("images/medicine.csv", {
        download: true,
        header: true,
        complete: function(results) {
            medicineOptions = results.data.filter(medicine => medicine.Name && medicine.DrugTypeShort);
            initializeSelect2($('.medicine-select'));
        }
    });

    // Function to initialize Select2
    function initializeSelect2($selectElement) {
        $selectElement.select2({
            width: '100%',
            placeholder: "Select a medicine",
            allowClear: true,
            minimumInputLength: 2,
            ajax: {
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term
                    };
                },
                processResults: function (data, params) {
                    const searchTerm = params.term ? params.term : '';

                    // Create a regex pattern to match any part of the string, handling special characters
                    const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

                    // Use regex to filter results
                    const results = medicineOptions.filter(medicine => {
                        const name = medicine.Name ? medicine.Name : '';
                        const drugType = medicine.DrugTypeShort ? medicine.DrugTypeShort : '';
                        const strength = medicine.Strength ? medicine.Strength : '';

                        return regex.test(`${drugType} ${name} ${strength}`);
                    });

                    return {
                        results: results.map(medicine => ({
                            id: `${medicine.DrugTypeShort}. ${medicine.Name} - ${medicine.Strength || ''}`,
                            text: `${medicine.DrugTypeShort}. ${medicine.Name} - ${medicine.Strength || ''}`,
                        }))
                    };
                },
                cache: true
            }
        });

        const $existingListings = $selectElement.data('existing-values');
        if ($existingListings && $existingListings.length) {
            $selectElement.val($existingListings).trigger('change');
        }
    }

    function addNewListItem(targetListId) {
        const $list = $(targetListId);
        const newItem = `<li class="rxcard_list--item"><div class="select_option"><select class="select2 medicine-select" name="medicine"></select></div><ul class="select_option-wrap list-unstyled"><li><div class="state-filter"><select name=""><option value="">১ + ১ + ১</option><option value="">১ + ১ + ০</option><option value="">১ + ০ + ১</option><option value="">০ + ১ + ১</option><option value="">১ + ০ + ০</option><option value="">০ + ১ + ০</option><option value="">০ + ০ + ১</option></select></div></li><li><div class="state-filter"><select name=""><option value="">ভরা পেটে খাবেন</option><option value="">খালি পেতে খাবেন</option><option value="">খাবার আগে খাবেন</option><option value="">খাওয়ার পরে খাবেন</option><option value="">ক্ষত স্থানে লাগাবেন</option><option value="">কাটা স্থানে লাগাবেন</option><option value="">চুষে খাবেন</option></select></div></li><li><span contenteditable="true">৭ দিন</span></li></ul><button type="button" class="remove-item">✖</button></li>`;

        $list.append(newItem);
        const $newSelect = $list.find('select.medicine-select').last();
        
        // Initialize Select2 for the newly added select element
        initializeSelect2($newSelect);

        // Remove item event handler
        $list.find('.remove-item').last().click(function () {
            $(this).closest('.rxcard_list--item').remove();
        });
    }

    $(".addnew_rx").click(function () {
        addNewListItem($(this).data('target'));
    });
});