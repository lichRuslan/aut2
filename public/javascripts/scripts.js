$(function(){var o=!0;$(".switch-button").on("click",function(r){r.preventDefault(),$("input").val(""),$("p.error").remove(),$("input").removeClass("error"),o?(o=!1,$(".register").show("slow"),$(".login").hide()):(o=!0,$(".login").show("slow"),$(".register").hide())}),$("input").on("focus",function(){$("p.error").remove(),$("input").removeClass("error")}),$(".register-button").on("click",function(r){r.preventDefault(),$("p.error").remove(),$("input").removeClass("error");var o={login:$("#register-login").val(),password:$("#register-password").val(),passwordConfirm:$("#register-password-confirm").val()};$.ajax({type:"POST",data:JSON.stringify(o),contentType:"application/json",url:"/api/auth/register"}).done(function(r){r.ok?$(location).attr("href","/"):($(".register h2").after('<p class="error">'+r.error+"</p>"),r.fields&&r.fields.forEach(function(r){$("input[name="+r+"]").addClass("error")}))})}),$(".login-button").on("click",function(r){r.preventDefault(),$("p.error").remove(),$("input").removeClass("error");var o={login:$("#login-login").val(),password:$("#login-password").val()};$.ajax({type:"POST",data:JSON.stringify(o),contentType:"application/json",url:"/api/auth/login"}).done(function(r){r.ok?$(location).attr("href","/"):($(".login h2").after('<p class="error">'+r.error+"</p>"),r.fields&&r.fields.forEach(function(r){$("input[name="+r+"]").addClass("error")}))})})});