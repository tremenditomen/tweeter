$(document).ready(function () {
  const max = 140;
  let remainder;
  $("#tweet-text").on("keyup", function () {
    let length = $(this).val().length;
    remainder = max - length;
    $(".counter").text(remainder);
    console.log("REMAINDER",remainder)
    if (remainder < 0) {
      $(".counter").css("color", "red");
    } else if (remainder >= 0) {
      $(".counter").css("color", "#54514A");
    }
  });
});
