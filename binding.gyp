{
	"conditions" : [
		["OS==\"mac\"", {
				"libraries" : ["-ljpeg"],
				"cflags" : ["-fexceptions", "-Dcimg_display=0", "-Dcimg_use_jpeg"],
				"cflags_cc" : ["-fexceptions", "-Dcimg_display=0", "-Dcimg_use_jpeg"],
			}
		],
		["OS==\"linux\"", {
				"libraries" : ["-ljpeg"],
				"cflags" : ["-fexceptions", "-Dcimg_display=0", "-Dcimg_use_jpeg"],
				"cflags_cc" : ["-fexceptions", "-Dcimg_display=0", "-Dcimg_use_jpeg"]
			}
		],
		["OS==\"win\"", {
				"libraries" : [],
				"cflags" : ["-fexceptions", "-Dcimg_display=0"],
				"cflags_cc" : ["-fexceptions", "-Dcimg_display=0"]
			}
		]
	],
	"targets": [
		{
		  "target_name": "binding"
		}
	]
}