$(document).ready(function() {
  prep_tags();
  $('#search-form').submit(event => {
    event.preventDefault();
    let tag = $('#tag-search-box').val();
    let user_id = $('#user_id').val();
    $('#tag-search-box').val('');
    $.post('/tags/create', {
      tag,
      user_id
    }, (data) => {
      prep_tags();
    });
  });
});

function prep_tags() {
  let user_id = $('#user_id').val();
  //get tag titles for this user
  $.get(`tags/user/${user_id}`, (data) => {
    show_tags(data);
  });

}

function show_tags(data) {
  $('#user_tag_list').html('');
  data.forEach(tag => {
    $('#user_tag_list').append(`<li class="tag" id="tag_${tag}">${tag}<input type="button" class="tag_button" value="X" name="${tag}" id="tag_b_${tag}"></input></li>`);
    $(`#tag_b_${tag}`).on('click', remove_tag_from_user);
  });
}

function remove_tag_from_user() {
  let tag_name = this.name;
  $(`#tag_b_${tag_name}`).off('click');
  let user_id = $('#user_id').val();
  // $.post('/tags/delete', {tag_name, user_id}, (data) => {
  //    prep_tags();
  // })
  let del_data = {
    tag_name,
    user_id
  };
  $.ajax({
    url: `/tags/delete`,
    type: "DELETE",
    data: del_data,
    success: prep_tags
  });
}
