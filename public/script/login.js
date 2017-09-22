$(document).ready(function(){
  $('#login-form').on('submit', function(){
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    $.ajax({
      type: 'POST',
      url: '/login',
      async: false,
      data:{
        username: username,
        password: password
      },
      success: function(respond){
        if(respond.success){
          alert(respond.username + ' login successfully');
          location.href = "/todo";
        }else{
          alert('Email or Password is not correct');
          $("input[name='username']").val('');
          $("input[name='password']").val('');
          return;
        }
      }
    });
    return false;
  });
});
