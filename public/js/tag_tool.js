$(document).ready(function() {

  $('#search-form').submit(event => {
    event.preventDefault();
    let tag = $('#tag-search-box').val();
    let user_id = $('#user_id').val();
    $.ajax({
      type: "POST",
      url: "/tags/create",
      data: {tag, user_id},
      success: prep_tags,
      dataType: "json"
    });
  });
});

function prep_tags() {
  console.log('prepping tags');
  let user_id = $('#user_id').val();
  $.ajax({
    type: "GET",
    url: `/user/${user_id}`,
    success: show_tags,
    dataType: "json"
  })
}

function show_tags() {
  console.log("showing tags");
}

function remove_tag_from_user() {
  let tag_name = '';
  let user_id = $('#user_id').val();
  $.ajax({
    type: "DELETE",
    url: "/tags/delete",
    data: {tag_name, user_id},
    success: prep_tags,
    dataType: "json"
  });
}
