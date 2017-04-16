$( document ).ready(function() {
  $('.ui.dropdown').dropdown();  
  $("#stock-image").on("mousedown", function() {
    $('.ui.modal').modal('show');  
  });
});