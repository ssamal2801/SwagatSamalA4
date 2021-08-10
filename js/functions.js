$(document).ready(function () {
  var pcodeRegex = /^(\d{5}(-\d{4})?|\d[A-Z]\d ?[A-Z]\d[A-Z])$/;
  var phoneRegex = /^\(?\d{3}\)?[-]?\d{3}[\s.-]\d{4}$/;
  var emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
  if (userInfo.length > 0) {
    $(".record").removeClass("dnone");
  }

  let formValidation = function () {
    let flag = true;
    $(".form-field").each((index, item) => {
      if ($(item).val() == null || $(item).val() === "") {
        alert("Please fill all the fields!");
        flag = false;
        return false;
      }
    });
    if (flag) {
      if (!pcodeRegex.test($(".container .form input[name='pcode']").val())) {
        flag = false;
        alert(
          "Postal Code (Acceptable format: NAN ANA – where 'A' is any alphabetic character and 'N' is avalid numeric digit)"
        );
      }
      if (!phoneRegex.test($(".container .form input[name='phone']").val())) {
        flag = false;
        alert("Acceptable formats: 123-123-1234, or (123)123-1234");
      }
      if (!emailRegex.test($(".container .form input[name='email']").val())) {
        flag = false;
        alert("Email should be in format 'example@smail.com'");
      }
      if (flag) {
        var formData = $(".container .form").serializeArray();
        var userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
        var info = {};
        formData.forEach((item) => {
          info[item.name] = item.value;
        });
        userInfo.push(info);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        $(".record").removeClass("dnone");
        alert("Welcome! You are a member now.");
      }
    }
  };

  $("#register").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    formValidation();
  });
});
