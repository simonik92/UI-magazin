var editId;

var API_URL = {
    READ: 'http://localhost:8011/magazin/6'
};


var allProducts = [];
window.Magazin = {
    getRow: function (product) {
        // ES6 string template
    return `<div class="product" data-id="${product.id}">

            <img class="image" src="imgs${product.ulrImage}" ></img>
            <div class="name"> Nume: ${product.name} </div>
            <div class="pret"> Pret: ${product.pret}</div>
            <button class="adauga in cos" data-id="${product.id}" class='addToCart'> Adauga in cos</button>
            </div>`
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET"
        }).done(function (magazin) {
            console.info('done: magazin', magazin);

            Magazin.display(magazin);
            Magazin.bindEvents();
        });
    },

    getActionRow: function () {
        // ES5 string concatenation
        var majorOptions = '';
        for (i = 0; i < allMajors.length; i++) {
            major = allMajors[i];
            majorOptions += `<option value='${major.id}'> ${major.name}</option>`;
        }

        return '<tr>' +
            '<td><input type="text" required name="firstName" placeholder="Enter first name"></td>' +
            '<td><input type="text" name="lastName" placeholder="Enter last name"></td>' +
            '<td><input type="text" required name="averageScore" placeholder="Enter average score"></td>' +

            '<td><input type="text" required name="major" placeholder="Enter major"></td>' +
            '<td><select name="majorId">'+
            majorOptions+
            '</select></td>'+
            '<td><button type="submit">Save</button></td>' +
            '</tr>';
    },

    add: function (student, majorId) {
        console.log(student);
        $.ajax({
            url: API_URL.CREATE_STUDENT+majorId+"/student",
            headers: {

                "Content-Type": "application/json"
            },
            method: "POST",
            data: JSON.stringify(student, null, 2)
        }).done(function (response) {
            if (response.success) {
                Magazin.load();
            }
        });
    },

    save: function (student) {
        console.log(student);
        $.ajax({
            url: API_URL.UPDATE + student.id,
            method: "PUT",
            headers: {

                "Content-Type": "application/json"
            },
            data: JSON.stringify(student)
        }).done(function (response) {
            if (response.success) {
                editId = '';
                Magazin.load();
            }
        });
    },

    bindEvents: function () {
        $('a.edit').click(function () {
            var id = $(this).data('id');
            var collegeId = Number($('tr#'+id + " select").val());
            Magazin.edit(id, collegeId);
        });

        $(".add-form").submit(function () {
            var majorId=$('select[name=majorId]').val();
            const student = {
                firstName: $('input[name=firstName]').val(),
                lastName: $('input[name=lastName]').val(),
                averageScore: $('input[name=averageScore]').val(),
                majorOption: $('input[name=major]').val()
            };
            Magazin.add(student, majorId);
            Magazin.load();

        });
    },

    edit: function (id, collegeId) {
        // ES5 function systax inside find
        var editPersonBody = {"studentId":id,
            "majorId": collegeId
        };

        $.ajax({
            url: API_URL.EDIT,
            method: "PUT",
            headers: {

                "Content-Type": "application/json"
            },
            data: JSON.stringify(editPersonBody)
        }).done(function (response) {
            if (response.success) {
                editId = '';
                console.log("success save");
                Magazin.load();
            }
        });


    },


    display: function (magazin) {
        window.college = magazin;
        var rows = '';
        allProducts = magazin.products;
        alert(allProducts);
        // ES6 function systax inside forEach
        magazin.products.forEach(product => rows += Magazin.getRow(product));
        // rows += Magazin.getActionRow();
        $('#products').html(rows);
    }
};

var magazin = [];
console.info('loading producst');
Magazin.load();