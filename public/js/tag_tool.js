$(document).ready(function() {
  prep_tags();
  $('#search-form').submit(event => {
    event.preventDefault();
    let tag = $('#tag-search-box').val();
    let user_id = $('#user_id').val();
    $.ajax({
      type: "POST",
      url: "/tags/create",
      data: {
        tag,
        user_id
      },
      success: prep_tags,
      dataType: "json"
    });
  });
});

function prep_tags() {
  console.log('prepping tags');
  let user_id = $('#user_id').val();
  //get tag titles for this user
  $.get(`tags/user/${user_id}`, (data) => {
    show_tags(data);
  });

}

function show_tags(data) {
  //console.log("showing tags ",data);
  $('#user_tag_list').html('');
  data.forEach(tag => {
    $('#user_tag_list').append(`<li class="tag">${tag}</li>`);
  });
}

function remove_tag_from_user() {
  let tag_name = '';
  let user_id = $('#user_id').val();
  $.ajax({
    type: "DELETE",
    url: "/tags/delete",
    data: {
      tag_name,
      user_id
    },
    success: prep_tags,
    dataType: "json"
  });
}
