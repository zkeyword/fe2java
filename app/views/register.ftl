<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
	<form action="/register" method="post">
		<input type="text" name="username" id="username" />
		<input type="password" name="password" id="password" />
		<input type="password" name="confirmpwd" id="confirmpwd" />
		<input type="text" name="email" id="email" />
		<input type="hidden" name="_csrf" value="${token}" />
		<input type="submit" value="提交"/>
		
		${aa!}
	</form>
	<script src="/js/mobile/kefuCommon.js"></script>
	<script type="text/javascript">
	function join_favorite(siteUrl, siteName){  
	  try{                               
		window.external.addFavorite(siteUrl,siteName);                
	  } 
	  catch(e){          
		alert("加入收藏夹失败，请使用Ctrl+D快捷键进行添加操作!");   
	  }
	}
	</script>
	<style>
		.daohang{
			float:left; display:inline;
			width:1000px;
			margin:0px 0px 0px 10px;
		}
		.daohang ul{
		   margin:0px; padding:0px;
		}
		.daohang ul li{
			float:left; display:inline;
			width:105px;
			text-align:center;
		}
		.daohang ul li a{
			 color:#FFFFFF;
			 font-family:宋体;
			 font-weight:bold;
			 text-align:center;
			 line-height:35px;
			 height:35px;
			 width:105px;
		}

		.daohang ul li a:hover{
		   color:#000000;
		   background:#d5e6fe;
		   height:35px;
		   line-height:35px;
			width:105px;
		}
	</style>
	
</body>
</html>


<#function CDN x y>
	<#return (x + y) / 2>
</#function>

 ${CDN(100)} 