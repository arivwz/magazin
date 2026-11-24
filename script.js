document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[name="product"]');
    const selects = document.querySelectorAll('select');
    const calcBtn = document.getElementById('calcBtn');
    const clearBtn = document.getElementById('clearBtn');
    const totalField = document.getElementById('total');
    const discountField = document.getElementById('discount');

    checkboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener('change', function () {
            selects[index].disabled = !this.checked;
            if (!this.checked) {
                selects[index].value = '1';
            }
        });
    });

    calcBtn.addEventListener('click', function () {
        const checkedItems = document.querySelectorAll('input[name="product"]:checked');

        if (checkedItems.length === 0) {
            alert('Ошибка: отсутствует выбор товара!');
            return;
        }

        let rawTotalSum = 0;
        let totalQty = 0;

        checkedItems.forEach(function (checkbox) {
            const price = parseFloat(checkbox.dataset.price);
            const row = checkbox.closest('.product-row');
            const qty = parseInt(row.querySelector('select').value, 10);

            rawTotalSum += price * qty;
            totalQty += qty;
        });

        let discountPercent = 0;
        if (totalQty > 4) {
            discountPercent = 5;
        } else if (totalQty > 2) {
            discountPercent = 3;
        }

        const discountAmount = rawTotalSum * (discountPercent / 100);
        const finalSum = rawTotalSum - discountAmount;

        totalField.value = finalSum.toFixed(0); 
        discountField.value = discountPercent;
    });

    clearBtn.addEventListener('click', function () {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        selects.forEach(function (select) {
            select.value = '1';
            select.disabled = true;
        });
        totalField.value = '';
        discountField.value = '';
    });
});