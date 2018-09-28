//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
let result_arr = [];
$(document).ready(
	init
);

function init() {
	//按钮添加参数事件
	$("#co_add_a").click(do_add_canshu);
	$("#co_del_a").click(do_del_canshu);
	//按钮添加生成题目事件
	$("#show [name='sub']").click(do_result_num);
	$("#show_table").click(do_table);
	$("#show [name='point_text']").click(do_print);
	$("#show [name='co_cut']").click(do_copy);
}
//生成表格
function do_table() {
	$("#table_show").html('');
	result_arr = do_result_num();
	console.log(result_arr);
	//题目
	let get_title = $("#co_title").prop("value");
	let title_str = "<h3 class='text-center'>" + get_title + "<h3>";
	$("#table_show").prepend(title_str);
	//表格
	let get_tr_num = parseInt($("#co_tr_num").prop("value"));
	let get_td_height = parseInt($("#co_td_height").prop("value"));
	let table_str = '<table class="table table-striped">';
	let add_n_str = '';
	for (let j = 0; j < get_td_height; j++) {
		add_n_str += "<br>";

	}
	for (let index = 0; index < result_arr.length; index++) {
		let result_str = result_arr[index].join(" ") + " =" + add_n_str;
		console.log(result_arr[index].length);
		if (index % get_tr_num == 0) {
			table_str += "<tr><td>" + result_str;

		} else if (index % get_tr_num == 6) {
			table_str += result_str + "</td></tr>"
		} else {
			table_str += "<td>" + result_str + "</td>"
		}

	}
	table_str += "</table>";
	$("#table_show").append(table_str);
}
//生成算式
//
function do_result_num() {
	//初始化结果判断类的错误提示
	result_method_class.method_err = false;
	let result_arr = [];
	//获取客户设置的各参数的合成条件
	let build_obj = do_build_obj();
	//获取客户设置的生成算式的数量
	let result_num = parseInt($("#co_result input")[0].value);
	//获取客户选择的结果约束条件
	let result_method = $(".co_result_method");
	let result_method_arr = [];
	for (let index = 0; index < result_method.length; index++) {
		if (result_method.eq(index).prop("checked")) {
			result_method_arr.push(result_method.eq(index).prop("value"));
		}
	}
	let i = 0;
	let while_time = 0;
	let result_method_pass = true;
	while (i < result_num) {
		if (while_time == 29999) {
			alert("运行时间过长，请检查您的设置");
			break;
		}
		while_time++;
		//生成算式
		let build_arr = do_build_arr(build_obj);
		//进行结果判断
		if (!result_method_class.method_err) {
			for (let j = 0; j < result_method_arr.length; j++) {
				if (result_method_class[result_method_arr[j]](build_arr, result_arr)) {
					result_method_pass = true;
				} else {
					result_method_pass = false;
					break;
				}

			}
		} else {
			break;
		}


		//如果完全符合结果判断条件就确定这个算式
		if (result_method_pass) {
			result_arr.push(build_arr);
			i++;
		} else {
			//如果不符合就重新执行
			continue;
		}
	}
	return result_arr
}
//对结果进行约束的类，其中包含的各种方法。方法名称必须与html页面checkbox 的value属性一致，并且接受两个参数，build_arr（算式数组——当前生成的算式），result_arr（结果数组——符合条件的算式集合）作为参数，返回一个boolean值
result_method_class = {
	method_err: false,
	do_result_range: function (build_arr) {
		let result_range;
		let result_string = eval(build_arr.join(""));
		let result_min = parseFloat($("#jieguo input")[0].value);
		let result_max = parseFloat($("#jieguo input")[1].value);
		if (!result_min && result_min != 0) {
			alert("在结果最小值设置上存在错误，请检查！");
			result_method_class.method_err = true;
			return;
		} else if (!result_max && result_max != 0) {
			result_method_class.method_err = true;
			alert("在结果最大值设置上存在错误，请检查！");
			return;
		} else if (result_min > result_max) {
			result_method_class.method_err = true;
			alert("在结果中最小值大于最大值，请检查！");
			return;
		} else {
			if (result_string >= result_min && result_string <= result_max) {
				result_range = true;
			} else {
				result_range = false;
			}

			return result_range
		}
	},
	do_result_jinwei: function (build_arr) {
		let result_jinwei;
		let result_string = eval(build_arr.join("")).toString();
		let result_weishu = build_arr[0].length - result_string.length;
		let result_radio = $("#jinwei input[type='radio']");
		for (let index = 0; index < result_radio.length; index++) {
			let result_radio_index = result_radio.eq(index);
			if (result_radio_index.prop("checked")) {
				if (result_radio_index.prop("value") == "do_result_ahead" && result_weishu == -1) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_radio_index.prop("value") == "do_result_back" && result_weishu == 1) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_radio_index.prop("value") == "do_result_stay" && result_weishu == 0) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_weishu == 1 || result_weishu == -1 && result_radio_index.prop("value") == "do_result_ahead_back") {
					result_jinwei = true;
					return result_jinwei;
				} else {
					result_jinwei = false;
					return result_jinwei
				}
			}

		}
	},
	do_result_chachong: function (build_arr, result_arr) {
		if (result_arr.length >= 1 && result_arr.indexOf(build_arr) >= 0) {
			return false
		} else {
			return true
		}
	},
	do_result_nofu: function (build_arr) {
		let result_nofu = false;
		let build_arr_new = build_arr.slice();

		function nofu_fn() {
			let nofu_cheng = build_arr_new.indexOf("*");
			let nofu_chu = build_arr_new.indexOf("/");
			if (build_arr_new.length >= 3) {
				if (nofu_cheng >= 0 || nofu_chu >= 0) {
					if (nofu_cheng < nofu_chu) {
						build_arr_new.splice(nofu_cheng - 1, 3, parseFloat(build_arr_new[nofu_cheng - 1]) * parseFloat(build_arr_new[nofu_cheng + 1]));
						nofu_fn();
					} else {
						build_arr_new.splice(nofu_chu - 1, 3, parseFloat(build_arr_new[nofu_chu - 1]) / parseFloat(build_arr_new[nofu_chu + 1]));
						nofu_fn();
					}
				} else {
					let new_arr = build_arr_new.splice(0, 3);
					let new_result = eval(new_arr.join(''));
					if (new_result >= 0) {
						build_arr_new.unshift(new_result);
						nofu_fn();
					} else {
						result_nofu = false;
						return
					}
				}
			} else {
				result_nofu = true;
				return
			}
		}
		nofu_fn();
		return result_nofu
	}
}


function do_build_arr(build_obj) {
	let build_arr = [];
	build_arr.push(do_build_canshu(build_obj.canshu[0]));
	for (let index = 0; index < build_obj.yunsuanfu.length; index++) {
		let yunsuanfu_str = do_build_yunsuanfu(build_obj.yunsuanfu[index]);
		let canshu_str = do_build_canshu(build_obj.canshu[index + 1]);
		build_arr.push(yunsuanfu_str);
		if (canshu_str == "num_del") {
			build_arr.pop();
		} else {
			build_arr.push(canshu_str);
			//build_arr.pop();
		}
	}
	return build_arr
}

function do_build_obj() {
	let build_obj = {};
	build_obj.canshu = do_build_check_canshu();
	build_obj.yunsuanfu = do_build_check_yunsuanfu();
	return build_obj
}
//用来生成参数
// num_min最小值
// num_max最大值
// num_float保留小数位数
// num_random出现概率
function do_build_canshu(num) {
	let num_min = num[0];
	let num_max = num[1];
	let num_float = num[2];
	let num_random = num[3];
	let num_result;
	num_min = parseFloat(num_min.toFixed(num_float));
	num_max = parseFloat(num_max.toFixed(num_float));
	if (num_random > 100) {
		num_random == 100;
	} else if (num_random < 0) {
		num_random = 0;
	}
	let num_make = Math.random() * 100;
	if (num_make >= 0 && num_make <= num_random) {
		num_result = parseFloat(num_min + Math.random() * (num_max - num_min)).toFixed(num_float);
		if (num_result < 0) {
			num_result = "(" + num_result + ")"
		}
	} else {
		num_result = "num_del";

	}
	return num_result;
}
//用来生成运算符
function do_build_yunsuanfu(fu_arr) {
	let fu_result = fu_arr[Math.floor(Math.random() * fu_arr.length)]
	return fu_result;
}
//用来验证并初始化数字
function do_build_check_canshu() {
	let canshu_arr = [];
	let canshu = $(".co_canshu");
	for (let index = 0; index < canshu.length; index++) {

		let canshu_input = canshu.eq(index).children("input");
		let canshu_min = parseFloat(canshu_input[0].value);
		let canshu_max = parseFloat(canshu_input[1].value);
		let canshu_float = 0;
		let canshu_random = 0;
		let real_index = index + 1;
		if (!canshu_min && canshu_min != 0) {
			alert("数字" + real_index + "中在最小值上存在错误，请检查！");
			return;
		} else if (!canshu_max && canshu_max != 0) {
			alert("数字" + real_index + "中在最大值上存在错误，请检查！");
			return;
		} else if (canshu_min > canshu_max) {
			alert("数字" + real_index + "中最小值大于最大值，请检查！");
			return;
		} else {
			if (canshu_input[2] == undefined || !parseInt(canshu_input[2].value)) {
				canshu_float = 0;
			} else {
				canshu_float = parseInt(canshu_input[2].value)
			}
			if (canshu_input[3] == undefined || canshu_input[3].value.trim() == '') {
				canshu_random = 100;
			} else {
				canshu_random = parseInt(canshu_input[3].value);
			}
		}
		canshu_arr.push([canshu_min, canshu_max, canshu_float, canshu_random]);

	}
	return canshu_arr
}
//用来验证并初始化运算符
function do_build_check_yunsuanfu() {
	let yunsuanfu_all_arr = [];
	let yunsuanfu = $(".co_yunsuanfu");
	for (let index = 0; index < yunsuanfu.length; index++) {

		let yunsuanfu_input = yunsuanfu.eq(index).find("input")
		let yuansuanfu_jia = yunsuanfu_input.eq(0).prop("checked");
		let yuansuanfu_jian = yunsuanfu_input.eq(1).prop("checked");
		let yuansuanfu_cheng = yunsuanfu_input.eq(2).prop("checked");
		let yuansuanfu_chu = yunsuanfu_input.eq(3).prop("checked");
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
				yunsuanfu_all_arr.push(yuansuanfu_arr);
			} else {
				alert("请至少选择一个运算符")
				return;
			}

		}
	}
	return yunsuanfu_all_arr
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
	let canshu = $(".co_canshu").length + 1;
	add_yunsuanfu = '<div class="col-xs-12 co_label"><label>运算符</label></div><div class="col-xs-12 co_block co_yunsuanfu"><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jia">加法（+）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jian">减法（-）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="cheng">乘法（×）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="chu">除法(÷)</label></div>';
	add_canshu = '<div class="col-xs-12 co_label"><label>第' + canshu + '个数字</label></div><div class="col-xs-12 co_block co_canshu "><input class="form-control" type="text" name="nr1" placeholder="最小值"><br><input class="form-control" type="text" name="nr1" placeholder="最大值"><br><input class="form-control" type="text" name="nr1" placeholder="保留几位小数"><br><input class="form-control" type="text" name="nr1" placeholder="当前参数出现的概率,默认为0,请填入0~100之间的数"></div>';
	$("#co_body_in").append(add_yunsuanfu + add_canshu);
	canshu++
}

function do_del_canshu() {
	let del_canshu = $("#co_body_in");
	if (del_canshu.children("div").length > 6) {
		for (let index = 0; index < 4; index++) {
			del_canshu.children("div:last-child").remove();
		}
	} else {
		alert("不能继续删除了！")
	}
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



function do_print() {
	let show_str = $("body").html();
	let table_show_str = $("#table_show").html();
	let all_input = $("input");
	let input_arr_value = [];
	let input_arr_checked = [];
	for (let index = 0; index < all_input.length; index++) {
		input_arr_value.push(all_input.eq(index).prop("value"));
		input_arr_checked.push(all_input.eq(index).prop("checked"));
	}

	$("body").html(table_show_str);
	window.print();
	setTimeout(function () {
		$("body").html(show_str);
		init();
		let input_now = $("input");
		for (let j = 0; j < input_now.length; j++) {
			input_now.eq(j).attr("value", input_arr_value[j]);
			input_now.eq(j).attr("checked", input_arr_checked[j]);
		}

	}, 100)
}

function do_copy() {
	let input_show=document.createElement('input');
	input_show.value=result_arr.join("");
	document.body.appendChild(input_show);
	
	input_show.select();
	document.execCommand("copy");
	input_show.style.display='none';
	alert("复制成功")

}