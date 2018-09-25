//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
var x, y, z, zmax, zmin, nmin, nmax, num, i, j, if_next, if_num, res;
var all_text = "";

$(document).ready(
init
);
function init() {
		$("#show [name='sub']").click(doAdd);
		$("#show [name='point_text']").click(doPrint);
	}
function doAdd() {
	
	res = " ";
	$("#show_table").remove();
	i = 1;
	last_num = 0;
	nmax = parseInt($("#show [name='nmax']").val());
	nmin = parseInt($("#show [name='nmin']").val());
	zmax = parseInt($("#show [name='zmax']").val());
	zmin = parseInt($("#show [name='zmin']").val());
	num = parseInt($("#show [name='num']").val());
	if_next = parseInt($("#show [name='if_next']").val());
	$("#show").append("<!--startprint-->");
	res += "<div class='center-block' id='show_table'><h1 class='text-center'>一年二班刘墨瞳口算作业</h1><h3 class='text-center'>日期（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）正确（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）时间（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）</h3><table class='table table-responsive'>";

	while(i <= num) {
		if(last_num != i) {
			if(i == 1) {
				res += "<tr><td>";
			}
			if(i != 1 && i % 3 == 1) {
				res += "</td></tr><tr><td>";
			}
			if(i != 1 && i % 3 != 1) {
				res += "</td><td>";
			}
			last_num++;
		}

		x = Math.floor(Math.random() * (nmax - nmin) + nmin);
		y = Math.floor(Math.random() * (nmax - nmin) + nmin);
		if_num = Math.floor(Math.random() * 100);
		if(x != 1 && y != 1 && y != -1 && x + y != 0 && x > 0 && x + y <= zmax && x + y >= zmin) {
			if(if_num < if_next) {
				z = Math.floor(Math.random() * (nmax - nmin) + nmin);
				if(x + y + z <= zmax && x + y + z >= zmin) {
					if(y < 0 && z > 0) {
						res += i + "、" + x + y + "+" + z + "=";
						i++;
					} else if(y < 0 && z < 0) {
						res += i + "、" + x + y + z + "=";
						i++;
					} else if(y > 0 && z > 0) {
						res += i + "、" + x + "+" + y + "+" + z + "=";
						i++;
					} else if(y > 0 && z < 0) {
						res += i + "、" + x + "+" + y + z + "=";
						i++;
					}
				}
			} else {
				if(y < 0) {
					res += i + "、" + x + y + "=";
					i++;
				} else if(y > 0) {
					res += i + "、" + x + "+" + y + "=";
					i++;
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