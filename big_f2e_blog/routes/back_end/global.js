
var Memu=[
	{
		name:"首页",
		href:"/admin/home",
		memuName:"home",
		ico:"ico-home"
	},
	{
		name:"会员管理",
		href:"/admin/member_mana",
		memuName:"member_mana",
		ico:"ico-user",
		mid:1,
		level:[
			{
				name:"基本管理",
				href:"javascript:void(0)"
			},
			{
				name:"会员博客管理",
				href:"javascript:void(0)"
			}
		]
	},
	{
		name:"文章管理",
		href:"/admin/article_mana",
		memuName:"article_mana",
		ico:"ico-article",
		mid:2,
		level:[
			{
				name:"管理员发布管理",
				href:"javascript:void(0)",
				level:[
					{
						name:"新闻公告",
						href:"javascript:void(0)"

					},
					{
						name:"关于我们",
						href:"javascript:void(0)"

					},
					{
						name:"普通文章",
						href:"/admin/article_mana/articles"

					}
				]

			},
			{
				name:"会员发布管理",
				href:"javascript:void(0)"
			}
			
		]
	},
	{
		name:"图片管理",
		href:"/admin/pice_mana",
		memuName:"pice_mana",
		ico:"ico-pice",
		mid:3,
		level:[
			{
				name:"首页轮波图管理",
				href:"javascript:void(0)"
			},
			{
				name:"banner管理",
				href:"javascript:void(0)"
			},
			{
				name:"广告图",
				href:"javascript:void(0)"
			},
			{
				name:"logo",
				href:"javascript:void(0)"
			},
			{
				name:"站长生活照",
				href:"javascript:void(0)"
			},

		]
	},
	{
		name:"时光轴",
		href:"/admin/timeline_mana",
		memuName:"timeline_mana",
		ico:"ico-timeline",
		mid:4,
		level:[
			{
				name:"时间轴管理",
				href:"javascript:void(0)"
			},
			{
				name:"添加时间轴",
				href:"javascript:void(0)"
			},

		]
	},
	{
		name:"统计管理",
		href:"/admin/statistic_mana",
		memuName:"statistic_mana",
		ico:"ico-statistics",
		mid:5,
		level:[
			{
				name:"会员统计",
				href:"javascript:void(0)"
			},
			{
				name:"文章统计",
				href:"javascript:void(0)"
			},
			{
				name:"访问量",
				href:"javascript:void(0)"
			}

		]
	},
	{
		name:"系统配置",
		href:"/admin/system_config",
		memuName:"system_config",
		ico:"ico-set",
		mid:6,
		level:[
			{
				name:"前台系统管理",
				href:"javascript:void(0)",
				level:[
					{
						name:"关键词/描述",
						href:"javascript:void(0)"

					},
					{
						name:"网站介绍",
						href:"javascript:void(0)"

					},
					{
						name:"菜单配置",
						href:"/admin/article_management/articles"

					},
					{
						name:"其他",
						href:"/admin/article_management/articles"

					}
				]

			},
			{
				name:"系统参数配置",
				href:"javascript:void(0)",
				level:[
					{
						name:"消息管理",
						href:"javascript:void(0)"

					},
					{
						name:"邮件管理",
						href:"javascript:void(0)"

					},
					{
						name:"系统配置",
						href:"javascript:void(0)"

					}
				]

			},
			{
				name:"后台系统管理",
				href:"javascript:void(0)",
				level:[
					{
						name:"修改密码",
						href:"javascript:void(0)"

					},
					{
						name:"添加管理员",
						href:"javascript:void(0)"

					},
					{
						name:"分配权限",
						href:"javascript:void(0)"

					},
					{
						name:"后台图片管理",
						href:"javascript:void(0)"

					},
					{
						name:"操作日志",
						href:"javascript:void(0)"

					}
				]

			},
		]
	}
]
exports.global=function(req,res){
	return {
		hostname:req.host,
		Memu:Memu

	}
}