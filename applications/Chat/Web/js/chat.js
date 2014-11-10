

// 输入姓名
function show_prompt(){  
    name = prompt('输入你的名字：', '');
    if(!name){  
        alert('姓名输入为空，请重新输入！');  
        show_prompt();
    }
}  

// 提交对话
function onSubmit() {
  var input = document.getElementById("textarea");
  var to_client_id = $("#client_list option:selected").attr("value");
  var to_client_name = $("#client_list option:selected").text();
  ws.send(JSON.stringify({"type":"say","to_client_id":to_client_id,"to_client_name":to_client_name,"content":input.value}));
  input.value = "";
  input.focus();
}

// 刷新用户列表框
function flush_client_list(client_list){
	var userlist_window = $("#userlist");
	var client_list_slelect = $("#client_list");
	userlist_window.empty();
	client_list_slelect.empty();
	userlist_window.append('<h4>在线用户</h4><ul>');
	client_list_slelect.append('<option value="all" id="cli_all">所有人</option>');
	for(var p in client_list){
		userlist_window.append('<li id="'+client_list[p]['client_id']+'">'+client_list[p]['client_name']+'</li>');
		client_list_slelect.append('<option value="'+client_list[p]['client_id']+'">'+client_list[p]['client_name']+'</option>');
    }
	$("#client_list").val(select_client_id);
	userlist_window.append('</ul>');
}

// 发言
function say(from_client_id, from_client_name, content, time){
	$("#dialog").append('<div class="speech_item"><img src="http://lorempixel.com/38/38/?'+from_client_id+'" class="user_icon" /> '+from_client_name+' <br> '+time+'<div style="clear:both;"></div><p class="triangle-isosceles top">'+content+'</p> </div>');
}

$(function(){
	select_client_id = 'all';
  $("#client_list").change(function(){
       select_client_id = $("#client_list option:selected").attr("value");
  });
});
