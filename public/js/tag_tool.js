$(document).ready(function() {
  var tag_id_arr = [];
  prep_tags();
  $('#search-form').submit(event => {
    event.preventDefault();
    let tag_title = $('#tag-search-box').val();
    let user_id = $('#user_id').val();
    $('#tag-search-box').val('');
    $.post('/tags/create', {
      tag_title,
      user_id
    }, (data) => {
      prep_tags();
    });
  });
  $('#search_button').on('click', start_search);
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
  tag_id_arr = [];
  data.forEach(tag => {
    tag_id_arr.push(tag.id);
    $('#user_tag_list').append(`<li class="tag" id="tag_${tag.title}">${tag.title}<input type="button" class="tag_button" tag_title="${tag.title}" tag_id="${tag.id}" value="X" id="tag_b_${tag.id}"></input></li>`);
    $(`#tag_b_${tag.id}`).on('click', remove_tag_from_user);
  });
}

function remove_tag_from_user() {
  let tag_id = this.getAttribute('tag_id');
  let tag_title = this.getAttribute('tag_title');
  $(`#tag_b_${tag_id}`).off('click');
  let user_id = $('#user_id').val();
  let del_data = {
    tag_id,
    tag_title,
    user_id
  };
  $.ajax({
    url: `/tags/delete`,
    type: "DELETE",
    data: del_data,
    success: prep_tags
  });
}

function start_search() {
  let search_ids = false;
  if ($('#check_limit').prop('checked')) { //checkbox is checked
    //only search on tag_id_arr
    search_ids = tag_id_arr;
  }
  console.log('started search ', search_ids);
  $.get('/events/search', {search_ids});
}

function nothing() {
  //literally nothing
}
