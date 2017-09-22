$(document).ready(function(){
  $('#register-form').on('submit', function(){
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    let repassword = $("input[name='rePassword']").val();
    if(password!==repassword){
      alert('Passwords don’t match.');
      return;

    }else{
      $.ajax({
        type: 'POST',
        url: '/register',
        data: {
          username: username,
          password: password
        },
        success: function(result){
          alert('Success')
          location.href = "/login";
        }
      });
    }

  return false;

  });

});

function checkUsername(username){
  $.ajax({
    type: 'POST',
    url: 'register/checkUsername',
    data: {
      username: username
    },
    success: function(result){
      if(result==='existed'){
        $('input[name="username"]').val('');
        alert('The email has been registed!');
      }else{
        return;
      }
    }
  });
  return false;
}
