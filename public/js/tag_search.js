$(document).ready(function(){
  $('#search-form').submit(function(){
    event.preventDefault();
    console.log($('#search-box').val());
    let search_val = $('#search-box').val();
    console.log(); //all_tags
  });
});
