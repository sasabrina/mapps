window.onload = function () {

    var form = document.getElementById("my-form");
    var pristine = new Pristine(form);

    form.addEventListener('submit', function (e) {
       e.preventDefault();
       var valid = pristine.validate();
    });
};

