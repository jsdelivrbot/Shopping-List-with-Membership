$(document).ready(function(){

  $('#todo-add').on('submit', function(){

      var item = $('#todo-add input').val();

      var username = $('#username').val();
      console.log(username);

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: {
          item: item,
          username: username
        },
        success: function(){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('#todo-table li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
