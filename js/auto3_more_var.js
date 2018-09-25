//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
var x, y, z, sym, zmax, zmin, nmin, nmax, num, i, j, if_next, if_num, res, nr1, nr2, fuhao, jieguo, jieguo_panduan, jieguo_num;
var all_text = "";
var canshu = 3;

$(document).ready(
	init
);

function init() {
	//按钮添加参数事件
	$("#co_add_a").click(do_add_canshu);
	//按钮添加生成题目事件
	$("#show [name='sub']").click(do_build_string);


}
// num_min最小值
// num_max最大值
// num_float保留小数位数
// num_random出现概率
function do_build_canshu(num_min, num_max, num_float, num_random) {
	num_min = parseFloat(num_min.toFixed(num_float));
	num_max = parseFloat(num_max.toFixed(num_float));
	if (num_random > 100) {
		num_random == 100;
	} else if (num_random < 0) {
		num_random = 0;
	}
	num_make = Math.random() * num_random;
	let num_result
	if (num_make >= 0 && num_make <= num_random) {
		num_result = parseFloat(num_min + Math.random() * (num_max - num_min)).toFixed(num_float);

		return num_result;
	} else {
		console.log("concel");
	}

}

function do_build_yunsuanfu(fu_arr) {
	let fu_result = fu_arr[Math.floor(Math.random() * fu_arr.length)]
	console.log(fu_result);
	return fu_result;
}

function do_build_string() {
	let canshu = $(".co_canshu");
	let yunsuanfu = $(".co_yunsuanfu");
	for (let index = 0; index < canshu.length; index++) {
		//验证并初始化数字
		let canshu_min = parseFloat(canshu.eq(index).children("input")[0].value);
		let canshu_max = parseFloat(canshu.eq(index).children("input")[1].value);
		let canshu_float = 0;
		let canshu_random = 0;
		let real_index = index + 1;
		if (!canshu_min) {
			let real_index = index + 1;
			alert("数字" + real_index + "中在最小值上存在错误，请检查！");
			return;
		} else if (!canshu_max) {
			alert("数字" + real_index + "中在最大值上存在错误，请检查！");
			return;
		} else if (canshu_min > canshu_max) {
			alert("数字" + real_index + "中最小值大于最大值，请检查！");
			return;
		} else {
			if (canshu.eq(index).children("input")[2] == undefined || !parseInt(canshu.eq(index).children("input")[2].value)) {
				canshu_float = 0;
			} else {
				canshu_float = parseInt(canshu.eq(index).children("input")[2].value)
			}
			if (canshu.eq(index).children("input")[3] == undefined || !parseInt(canshu.eq(index).children("input")[3].value)) {
				canshu_random = 100;
			} else {
				canshu_random = parseInt(canshu.eq(index).children("input")[3].value);
			}
		}
		do_build_canshu(canshu_min, canshu_max, canshu_float, canshu_random);
		//验证并初始化运算符号
		yunsuanfu=yunsuanfu.eq(index).find("input")
		let yuansuanfu_jia = yunsuanfu.eq(0).prop("checked");
		let yuansuanfu_jian = yunsuanfu.eq(1).prop("checked");
		let yuansuanfu_cheng =yunsuanfu.eq(2).prop("checked");
		let yuansuanfu_chu = yunsuanfu.eq(3).prop("checked");
		let yuansuanfu_arr = [];
		if (index < yunsuanfu.length) {
			if (yuansuanfu_jia || yuansuanfu_jian || yuansuanfu_cheng || yuansuanfu_chu) {
				if (yuansuanfu_jia) {
					yuansuanfu_arr.push('+');
				}
				if (yuansuanfu_jian) {
					yuansuanfu_arr.push('-');
				}
				if (yuansuanfu_cheng) {
					yuansuanfu_arr.push('*');
				}
				if (yuansuanfu_chu) {
					yuansuanfu_arr.push('/');
				}
				do_build_yunsuanfu(yuansuanfu_arr)
			} else {
				alert("请至少选择一个运算符")
				return;
			}
			
		}
	}
}




function do_get_canshu() {
	let a = $(".co_canshu").eq(0).children("input")[0].value;
	let b = $(".co_yunsuanfu").eq(0).find("input")[0].checked;
	// console.log($(".co_canshu").eq(0).children("input")[1].value);
	console.log(parseFloat(a));
	console.log(b);
	let x = "1+2*3";
	console.log(eval(x))
}

function do_add_canshu() {
	add_yunsuanfu = '<div class="col-xs-12 co_label"><label>运算符</label></div><div class="col-xs-12 co_block co_yunsuanfu"><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jia">加法（+）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jian">减法（-）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="cheng">乘法（×）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="chu">除法(÷)</label></div>';
	add_canshu = '<div class="col-xs-12 co_label"><label>第' + canshu + '个数字</label></div><div class="col-xs-12 co_block co_canshu "><input class="form-control" type="text" name="nr1" placeholder="最小值"><br><input class="form-control" type="text" name="nr1" placeholder="最大值"><br><input class="form-control" type="text" name="nr1" placeholder="保留几位小数"><br><input class="form-control" type="text" name="nr1" placeholder="参数出现的概率"></div>';
	$("#co_body_in").append(add_yunsuanfu + add_canshu);
	canshu++
}

function doCanshu(nr, sym_in) {
	this.a = [];
	this.ra = Math.random();
	this.ress = '';
	this.nmax = 0;
	this.nmin = 0;
	if (nr.indexOf(",") > 0) {
		this.a = nr.split(",");

		for (var m = 0; m < this.a.length; m++) {
			if (this.ra > m / this.a.length && this.ra <= (m + 1) / this.a.length) {
				this.ress = this.a[m];
				if (this.ress.indexOf(">") > 0) {
					var res_r = this.ress.split(">");
					this.nmax = parseInt(res_r[0]);
					this.nmin = parseInt(res_r[1]);
					if (this.nmax != res_r[0] || this.nmin != res_r[1]) {
						return -10000000000;
					} else {
						return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
					}
				} else {
					if (parseInt(this.ress) != this.ress) {
						return -10000000000;
					} else {
						return parseInt(this.ress);
					}
				}
			}
		}
	} else if (nr.indexOf(">") > 0) {
		this.a = nr.split(">");
		this.nmax = parseInt(this.a[0]);
		this.nmin = parseInt(this.a[1]);
		if (this.nmax != this.a[0] || this.nmin != this.a[1]) {
			return -10000000000;
		} else {
			return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
		}
	} else if (nr.indexOf("!") > 0) {
		this.canshu_fanwei = nr.split("!")
		if (sym_in == "jia") {
			this.nmax = parseInt(this.canshu_fanwei[0]);
			this.nmin = parseInt(this.canshu_fanwei[1]);
			if (this.nmax != this.canshu_fanwei[0] || this.nmin != this.canshu_fanwei[1]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if (sym_in == "jian") {
			this.nmax = parseInt(this.canshu_fanwei[2]);
			this.nmin = parseInt(this.canshu_fanwei[3]);
			if (this.nmax != this.canshu_fanwei[2] || this.nmin != this.canshu_fanwei[3]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if (sym_in == "cheng") {
			this.nmax = parseInt(this.canshu_fanwei[4]);
			this.nmin = parseInt(this.canshu_fanwei[5]);
			if (this.nmax != this.canshu_fanwei[4] || this.nmin != this.canshu_fanwei[5]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
		if (sym_in == "chu") {
			this.nmax = parseInt(this.canshu_fanwei[6]);
			this.nmin = parseInt(this.canshu_fanwei[7]);
			if (this.nmax != this.canshu_fanwei[6] || this.nmin != this.canshu_fanwei[7]) {
				return -10000000000;
			} else {
				return Math.round(Math.random() * (this.nmax - this.nmin) + this.nmin);
			}
		}
	} else {
		if (parseInt(nr) == nr) {
			return parseInt(nr);
		} else {
			return -10000000000;
		}
	}
}

function doFuhao(fuhao_in) {
	this.radom_fuhao = Math.random();
	for (var l = 0; l < fuhao_in.length; l++) {
		if (this.radom_fuhao > l / fuhao_in.length && this.radom_fuhao < (l + 1) / fuhao_in.length) {
			return fuhao_in[l];
		}

	}
}

function doJieguo(jieguo_in) {

	if (parseInt(jieguo_in) == 0 || jieguo_in == "") {
		this.jieguo_jieguo = "kong";

	} else if (jieguo_in.indexOf(">") > 0) {
		var jieguo_r = jieguo_in.split(">");
		this.jieguo_max = parseInt(jieguo_r[0]);
		this.jieguo_min = parseInt(jieguo_r[1]);
		if (this.jieguo_max != jieguo_r[0] || this.jieguo_min != jieguo_r[1]) {
			this.jieguo_jieguo = "cuowu";
		} else {
			this.jieguo_jieguo = "fanwei";
		}

	} else if (jieguo_in.indexOf("%") > 0) {
		var zhengchu_r = jieguo_in.split("%");
		this.zhengchu = parseInt(zhengchu_r[0]);
		this.jieguo_max = parseInt(zhengchu_r[1]);
		this.jieguo_min = parseInt(zhengchu_r[2]);
		if (this.zhengchu != zhengchu_r[0] || this.jieguo_max != zhengchu_r[1] || this.jieguo_min != zhengchu_r[2]) {
			this.jieguo_jieguo = "cuowu";
		} else {
			this.jieguo_jieguo = "zhengchu";
		}
	} else if (jieguo_in.indexOf("!") > 0) {
		this.fuhao_fanwei = jieguo_in.split("!");
		for (var m = 0; m < this.fuhao_fanwei.length; m++) {
			if (this.fuhao_fanwei[m] != parseInt(this.fuhao_fanwei[m])) {
				this.jieguo_jieguo = "cuowu";
				break;
			} else {
				this.jieguo_jieguo = "fuhao_fanwei";
			}
		}
	} else if (parseInt(jieguo_in) == jieguo_in) {
		this.zhengshu = parseInt(jieguo_in);
		this.jieguo_jieguo = "zhengshu";

	} else {

		this.jieguo_jieguo = "cuowu"
	}

}

function doPanduan(jieguo_num_in, jieguo_panduan_in, sym_in) {

	if (jieguo_panduan_in.jieguo_jieguo == "kong") {
		return true;
	} else if (jieguo_panduan_in.jieguo_jieguo == "fanwei") {
		if (jieguo_num_in <= jieguo_panduan_in.jieguo_max && jieguo_num_in >= jieguo_panduan_in.jieguo_min) {
			return true;
		}
	} else if (jieguo_panduan_in.jieguo_jieguo == "zhengchu") {
		if (jieguo_num_in % jieguo_panduan_in.zhengchu == 0 && jieguo_num_in <= jieguo_panduan_in.jieguo_max && jieguo_num_in >= jieguo_panduan_in.jieguo_min) {
			return true;
		}
	} else if (jieguo_panduan_in.jieguo_jieguo == "zhengshu") {
		if (jieguo_num_in == jieguo_panduan_in.zhengshu) {
			return true;
		}
	} else if (jieguo_panduan_in.jieguo_jieguo == "fuhao_fanwei") {
		if (sym_in == "jia") {

			if (jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[1] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[0]) {
				return true;
			}
		}
		if (sym_in == "jian") {
			if (jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[3] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[2]) {
				return true;
			}
		}
		if (sym_in == "cheng") {
			if (jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[5] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[4]) {
				return true;
			}
		}
		if (sym_in == "chu") {
			if (jieguo_num_in >= jieguo_panduan_in.fuhao_fanwei[7] && jieguo_num_in <= jieguo_panduan_in.fuhao_fanwei[6]) {
				return true;
			}
		}
	}
}

function doGouzao(shili_in) {
	var shili = shili_in;
	var shili_kaishi = shili.lastIndexOf("<");
	var shili_jieshu = shili.indexOf(">", shili_kaishi);

	//alert("kaishi:" + shili_kaishi + "jieshu:" + shili_jieshu + "length:" + shili.length);
	var jiequ = shili.substring(shili_kaishi + 1, shili_jieshu);
	if (shili.lastIndexOf("<") >= 0) {

		if ((jiequ != "" && jiequ.indexOf("+") < 0 && jiequ.indexOf("-") < 0) || (shili_kaishi == 0 && shili_jieshu == (shili.length - 1))) {
			shili = shili.split('');
			shili.splice(shili_jieshu, 1, "");
			shili.splice(shili_kaishi, 1, "");
			shili = shili.join('');


		} else {
			shili = shili.split('');
			shili.splice(shili_jieshu, 1, ")");
			shili.splice(shili_kaishi, 1, "(");
			shili = shili.join('');

		}
		doGouzao(shili);
	} else {
		alert(shili)
		return shili;
	}
}

function doAdd() {
	doGouzao("a-<<<b>*e>+<c+d>>");
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
	$("#show [name='fuhao']:checked").each(function () {
		fuhao.push($(this).val())
	});

	num = parseInt($("#show [name='num']").val());
	$("#show").append("<!--startprint-->");
	res += "<div class='center-block' id='show_table'><h1 class='text-center'>一年二班刘墨瞳口算作业</h1><h3 class='text-center'>日期（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）正确（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）时间（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）</h3><table class='table table-responsive'>";
	if (jieguo_panduan.jieguo_jieguo == "cuowu") {
		alert("结果格式输入错误");
	} else if (doCanshu(nr1) == -10000000000 || doCanshu(nr2) == -10000000000) {
		alert("参数格式输入错误")
	} else {
		while (i <= num) {

			if (last_num != i) {
				if (i == 1) {
					res += "<tr><td>";
					//alert(res)
				}
				if (i != 1 && i % 3 == 1) {
					res += "</td></tr><tr><td>";
					//alert(res)
				}
				if (i != 1 && i % 3 != 1) {
					res += "</td><td>";
					//alert(res)
				}
				last_num++;
			}
			sym = doFuhao(fuhao);
			x = doCanshu(nr1, sym);
			y = doCanshu(nr2, sym);
			if (sym == "jia") {
				jieguo_num = x + y;
				if (doPanduan(jieguo_num, jieguo_panduan, sym)) {
					res += i + "、" + x + "+" + y + "=";
					i++;
				}

			}
			if (sym == "jian") {
				jieguo_num = x - y;
				if (doPanduan(jieguo_num, jieguo_panduan, sym)) {
					res += i + "、" + x + "-" + y + "=";
					i++;
				}
			}
			if (sym == "cheng") {
				jieguo_num = x * y;
				if (doPanduan(jieguo_num, jieguo_panduan, sym)) {
					res += i + "、" + x + "×" + y + "=";
					i++;
				}
			}
			if (sym == "chu") {
				if (y != 0) {
					jieguo_num = x / y;
					if (doPanduan(jieguo_num, jieguo_panduan, sym)) {
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
	setTimeout(function () {
		if (all_text != "") {
			$("body").html(all_text);
			$("#show [name='nmax']").val(nmax);
			$("#show [name='nmin']").val(nmin);
			$("#show [name='zmax']").val(zmax);
			$("#show [name='zmin']").val(zmin);
			$("#show [name='num']").val(num);
			$("#show [name='if_next']").val(if_next);
			init();

		}
	}, 2000)
}