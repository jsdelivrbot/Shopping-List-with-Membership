$(document).ready(function(){
  $('#register-form').on('submit', function(){
    let oldpassword = $("input[name='oldpassword']").val();
    let password = $("input[name='password']").val();
    let repassword = $("input[name='rePassword']").val();
    if(password!==repassword){
      alert('Passwords don’t match.');
      return;

    }else{
      $.ajax({
        type: 'POST',
        url: '/changePassword',
        data: {
          oldpassword: oldpassword,
          password: password
        },
        success: function(result){
          alert('Success');
          location.href = "/";
        }
      });
    }

  return false;

  });

});
