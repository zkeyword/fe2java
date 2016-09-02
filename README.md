####目录结构

	/ 根目录
	|__ app 后端开发目录
	|   |__ views 模板目录
	|   |__ db 数据目录
	|__ static 前端开发目录
	|   |__ fonts 字体文件
	|   |__ img 图片目录
	|   |__ less 样式目录
	|   |   |__ app 业务代码
	|   |   |__ core 通用可移植的代码
	|   |   |__ lib 第三方基本库
	|   |   |__ *.less 各个模块统一入口
	|   |__ js 目录
	|   |   |__ app 业务代码
	|   |   |__ core 通用可移植的代码
	|   |   |__ lib 第三方基本库
	|__ gulpfile.js gulp配置文件
	|__ package.json npm依赖管理

##### 前端说明：

现在css的预编译语言比较多种，后面逐步转换成less + postcss。