$(document).ready(function() {

  $('#search-form').submit(event => {
    event.preventDefault();
    let tag = $('#tag-search-box').val();
    let user_id = $('#user_id').val();
    console.log(tag + ' ' + user_id);
    $.ajax({
      type: "POST",
      url: "/events/check_tag/",
      data: {tag, user_id},
      success: display_tags,
      dataType: "json"
    });
  });

  function display_tags() {
    console.log('displaying tags');
  }
});


//method="POST" action="/events/check_tag/"
