$( document ).ready(function() {
  $('.ui.dropdown').dropdown();  
  $("#stock-image").on("click", function() {
    $('.ui.modal').modal('show');  
  });
    
  $(".item").on("click", function() {
    console.log($(this).attr("data-value"));
  })
});

