//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
var x, y, z, sym, zmax, zmin, nmin, nmax, num, i, j, if_next, if_num, res, nr1, nr2, fuhao, jieguo, jieguo_panduan, jieguo_num;
var all_text = "";

$(document).ready(
	init
);

function init() {
	$("#show [name='sub']").click(doAdd);
	$("#show [name='point_text']").click(doPrint);
}

function doCanshu(nr, sym_in) {
	this.a = [];
	this.ra = Math.random();
	this.ress = '';
	this.nmax = 0;
	this.nmin = 0;
	this.nzc = 0;
	this.ni = 0;
	this.nres = 0;
	if(nr.indexOf(",") > 0) {
		this.a = nr.split(",");

		for(var m = 0; m < this.a.length; m++) {
			if(this.ra > m / this.a.length && this.ra <= (m + 1) / this.a.length) {
				this.ress = this.a[m];
				if(this.ress.indexOf(">") > 0) {
					var res_r = this.ress.split(">");
					this.nmax = parseInt(res_r[0]);
					this.nmin = parseInt(res_r[1]);
					if(this.nmax != res_r[0] || this.nmin != res_r[1]) {
						return -10000000000;
					} else {
						return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
					}
				} else {
					if(parseInt(this.ress) != this.ress) {
						return -10000000000;
					} else {
						return parseInt(this.ress);
					}
				}
			}
		}
	} else if(nr.indexOf(">") > 0) {
		this.a = nr.split(">");
		this.nmax = parseInt(this.a[0]);
		this.nmin = parseInt(this.a[1]);
		if(this.nmax != this.a[0] || this.nmin != this.a[1]) {
			return -10000000000;
		} else {
			return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
		}
	} else if(nr.indexOf("!") > 0) {
		this.canshu_fanwei = nr.split("!")
		if(sym_in == "jia") {
			this.nmax = parseInt(this.canshu_fanwei[0]);
			this.nmin = parseInt(this.canshu_fanwei[1]);
			if(this.nmax != this.canshu_fanwei[0] || this.nmin != this.canshu_fanwei[1]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if(sym_in == "jian") {
			this.nmax = parseInt(this.canshu_fanwei[2]);
			this.nmin = parseInt(this.canshu_fanwei[3]);
			if(this.nmax != this.canshu_fanwei[2] || this.nmin != this.canshu_fanwei[3]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if(sym_in == "cheng") {
			this.nmax = parseInt(this.canshu_fanwei[4]);
			this.nmin = parseInt(this.canshu_fanwei[5]);
			if(this.nmax != this.canshu_fanwei[4] || this.nmin != this.canshu_fanwei[5]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if(sym_in == "chu") {
			this.nmax = parseInt(this.canshu_fanwei[6]);
			this.nmin = parseInt(this.canshu_fanwei[7]);
			if(this.nmax != this.canshu_fanwei[6] || this.nmin != this.canshu_fanwei[7]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
	} else if(nr.indexOf("%") > 0) {
		this.a = nr.split("%");
		this.nzc = parseInt(this.a[0]);
		this.nmax = parseInt(this.a[1]);
		this.nmin = parseInt(this.a[2]);
		if(this.nzc != this.a[0] || this.nmax != this.a[1] || this.nmin != this.a[2]) {
			return -10000000000;
		} else {
			while(this.ni <= 1) {
				this.nres = Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
				if(this.nres % this.nzc == 0) {
					this.ni++;
					return this.nres;
				}

			}
		}
	} else {
		if(parseInt(nr) == nr) {
			return parseInt(nr);
		} else {
			return -10000000000;
		}
	}
}

function doFuhao(fuhao_in) {
	this.radom_fuhao = Math.random();
	for(var l = 0; l < fuhao_in.length; l++) {
		if(this.radom_fuhao > l / fuhao_in.length && this.radom_fuhao < (l + 1) / fuhao_in.length) {
			return fuhao_in[l];
		}

	}
}

function doJieguo(jieguo_in) {

	if(parseInt(jieguo_in) == 0 || jieguo_in == "") {
		this.jieguo_jieguo = "kong";

	} else if(jieguo_in.indexOf(">") > 0) {
		var jieguo_r = jieguo_in.split(">");
		this.jieguo_max = parseInt(jieguo_r[0]);
		this.jieguo_min = parseInt(jieguo_r[1]);
		if(this.jieguo_max != jieguo_r[0] || this.jieguo_min != jieguo_r[1]) {
			this.jieguo_jieguo = "cuowu";
		} else {
			this.jieguo_jieguo = "fanwei";
		}

	} else if(jieguo_in.indexOf("%") > 0) {
		alert("zhengchu");
		var zhengchu_r = jieguo_in.split("%");
		this.zhengchu = parseInt(zhengchu_r[0]);
		this.jieguo_max = parseInt(zhengchu_r[1]);
		this.jieguo_min = parseInt(zhengchu_r[2]);
		if(this.zhengchu != zhengchu_r[0] || this.jieguo_max != zhengchu_r[1] || this.jieguo_min != zhengchu_r[2]) {
			this.jieguo_jieguo = "cuowu";
		} else {
			this.jieguo_jieguo = "zhengchu";
		}
	} else if(jieguo_in.indexOf("!") > 0) {
		this.fuhao_fanwei = jieguo_in.split("!");
		for(var m = 0; m < this.fuhao_fanwei.length; m++) {
			if(this.fuhao_fanwei[m] != parseInt(this.fuhao_fanwei[m])) {
				this.jieguo_jieguo = "cuowu";
				break;
			} else {
				this.jieguo_jieguo = "fuhao_fanwei";
			}
		}
	} else if(jieguo_in.indexOf("w") > 0) {

		this.weishu = jieguo_in.split("w");
		for(var m = 0; m < this.weishu.length; m++) {
			if(this.weishu[m] != parseInt(this.weishu[m])) {
				this.jieguo_jieguo = "cuowu";
				break;
			} else {
				this.jieguo_jieguo = "weishu";
			}
		}
	} else if(parseInt(jieguo_in) == jieguo_in) {
		this.zhengshu = parseInt(jieguo_in);
		this.jieguo_jieguo = "zhengshu";

	} else {

		this.jieguo_jieguo = "cuowu"
	}

}

function doPanduan(jieguo_num_in, jieguo_panduan_in, sym_in, x_in, y_in) {

	if(jieguo_panduan_in.jieguo_jieguo == "kong") {
		alert("确定不设置结果范围吗？");
		return true;
	} else if(jieguo_panduan_in.jieguo_jieguo == "fanwei") {
		if(jieguo_num_in <= jieguo_panduan_in.jieguo_max && jieguo_num_in >= jieguo_panduan_in.jieguo_min) {
			return true;
		}
	} else if(jieguo_panduan_in.jieguo_jieguo == "zhengchu") {
		if(jieguo_num_in % jieguo_panduan_in.zhengchu == 0 && jieguo_num_in <= jieguo_panduan_in.jieguo_max && jieguo_num_in >= jieguo_panduan_in.jieguo_min) {
			return true;
		}
	} else if(jieguo_panduan_in.jieguo_jieguo == "zhengshu") {
		if(jieguo_num_in == jieguo_panduan_in.zhengshu) {
			return true;
		}
	} else if(jieguo_panduan_in.jieguo_jieguo == "fuhao_fanwei") {
		if(sym_in == "jia") {

			if(jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[1] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[0]) {
				return true;
			}
		}
		if(sym_in == "jian") {
			if(jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[3] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[2]) {
				return true;
			}
		}
		if(sym_in == "cheng") {
			if(jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[5] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[4]) {
				return true;
			}
		}
		if(sym_in == "chu") {
			if(jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[7] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[6]) {
				return true;
			}
		}
	} else if(jieguo_panduan_in.jieguo_jieguo == "weishu") {
		var num_in_tostring = jieguo_num_in.toString();
		var x_in_tostring = x_in.toString();
		if(jieguo_num_in >= jieguo_panduan_in.weishu[3] && jieguo_num_in <= jieguo_panduan_in.weishu[2]) {
			if(parseInt(jieguo_panduan_in.weishu[0]) == -1) {
				if(parseInt(jieguo_panduan_in.weishu[1]) == 1) {
					if(num_in_tostring.length != x_in_tostring.length) {

						return true;
					}
				}else if (parseInt(jieguo_panduan_in.weishu[1]) == 0) {
					if(num_in_tostring.length == x_in_tostring.length) {

						return true;
					}
				}

			} else if(parseInt(jieguo_panduan_in.weishu[0]) == 1) {
				var num_in_i=Math.floor(jieguo_num_in / 10 % 10);
				var x_in_i=Math.floor(x_in / 10 % 10);
				var y_in_i=Math.floor(y_in / 10 % 10);
				if(parseInt(jieguo_panduan_in.weishu[1]) == 0) {
					if(num_in_i ==( x_in_i + y_in_i) || num_in_i ==( x_in_i - y_in_i)) {
						return true;
					}
				}else if(parseInt(jieguo_panduan_in.weishu[1]) == 1) {
					if(num_in_i !=( x_in_i + y_in_i) && num_in_i !=( x_in_i - y_in_i)) {
						return true;
					}
				}
			}
		}
	}
}

function doAdd() {

	res = " ";
	fuhao = []
	$("#show_table").remove();
	i = 1;
	last_num = 0;
	//参数
	nr1 = $("#show [name='nr1']").val();
	nr2 = $("#show [name='nr2']").val();
	jieguo = $("#show [name='jieguo']").val();
	jieguo_panduan = new doJieguo(jieguo);
	//alert(jieguo_panduan.jieguo_max);

	//符号
	$("#show [name='fuhao']:checked").each(function() {
		fuhao.push($(this).val())
	});

	num = parseInt($("#show [name='num']").val());
	$("#show").append("<!--startprint-->");
	res += "<div class='center-block' id='show_table'><h1 class='text-center'>一年二班刘墨瞳口算作业</h1><h3 class='text-center'>日期（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）正确（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）时间（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）</h3><table class='table table-responsive'>";
	if(jieguo_panduan.jieguo_jieguo == "cuowu") {
		alert("结果格式输入错误");
	} else if(doCanshu(nr1) == -10000000000 || doCanshu(nr2) == -10000000000) {
		alert("参数格式输入错误")
	} else {
		while(i <= num) {

			if(last_num != i) {
				if(i == 1) {
					res += "<tr><td>";
					//alert(res)
				}
				if(i != 1 && i % 3 == 1) {
					res += "</td></tr><tr><td>";
					//alert(res)
				}
				if(i != 1 && i % 3 != 1) {
					res += "</td><td>";
					//alert(res)
				}
				last_num++;
			}
			sym = doFuhao(fuhao);
			x = doCanshu(nr1, sym);
			y = doCanshu(nr2, sym);
			if(sym == "jia") {
				jieguo_num = x + y;
				if(doPanduan(jieguo_num, jieguo_panduan, sym, x, y)) {
					res += i + "、" + x + "+" + y + "=";
					i++;
				}

			}
			if(sym == "jian") {
				jieguo_num = x - y;
				if(doPanduan(jieguo_num, jieguo_panduan, sym, x, y)) {
					res += i + "、" + x + "-" + y + "=";
					i++;
				}
			}
			if(sym == "cheng") {
				jieguo_num = x * y;
				if(doPanduan(jieguo_num, jieguo_panduan, sym, x, y)) {
					res += i + "、" + x + "×" + y + "=";
					i++;
				}
			}
			if(sym == "chu") {
				if(y != 0) {
					jieguo_num = x / y;
					if(doPanduan(jieguo_num, jieguo_panduan, sym, x, y)) {
						res += i + "、" + x + "÷" + y + "=";
						i++;
					}
				}

			}
		}
	}

	res += "</td></tr></table></div>";
	$("#text_show").append(res);
	$("#text_show").append("<!--endprint-->");
	//$("#text_show").select();
	//document.execCommand("copy");
	all_text = $("body").html();
}

function doPrint() {

	$("body").html($("#show_table").html());
	window.print();
	setTimeout(function() {
		if(all_text != "") {
			$("body").html(all_text);
			$("#show [name='nr1']").val(nr1);
			$("#show [name='nr2']").val(nr2);
			for(var var_fuhao = 0; var_fuhao < fuhao.length; var_fuhao++) {

				$("#show [value='" + fuhao[var_fuhao] + "']").attr("checked", true);
			}
			//$("#show [type='checkbox']").attr("checked", true);
			$("#show [name='jieguo']").val(jieguo);
			$("#show [name='num']").val(num);
			//$("#show [name='if_next']").val(if_next);
			init();

		}
	}, 2000)
}