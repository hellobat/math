//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
var x, y, z, zmax, zmin, nmin, nmax, num, i, j, if_next, if_num, res;

$(document).ready(
	function() {
		$("#show [name='sub']").click(doAdd);
		$("#show [name='copy_text']").click(doPrint);
	}
);

function doAdd() {
	res=" ";
	$("#show_table").remove();
	i = 1;
	last_num = 0;
	nmax = parseInt($("#show [name='nmax']").val());
	nmin = parseInt($("#show [name='nmin']").val());
	zmax = parseInt($("#show [name='zmax']").val());
	zmin = parseInt($("#show [name='zmin']").val());
	num = parseInt($("#show [name='num']").val());
	if_next = parseInt($("#show [name='if_next']").val());
	while(i <= num) {
		x = Math.floor(Math.random() * (nmax - nmin) + nmin);
		y = Math.floor(Math.random() * (nmax - nmin) + nmin);
		if_num = Math.floor(Math.random() * 100);
		if(x != 1 && y != 1 && y != -1 && x + y != 0 && x > 0 && x + y <= zmax && x + y >= zmin) {
			if(if_num < if_next) {
				z = Math.floor(Math.random() * (nmax - nmin) + nmin);
				if(x + y + z <= zmax && x + y + z >= zmin) {
					if(y < 0 && z > 0) {
						res+=i + "、" + x + y + "+" + z + "=\n";
						i++;
					} else if(y < 0 && z < 0) {
						res+=i + "、" + x + y + z + "=\n";
						i++;
					} else if(y > 0 && z > 0) {
						res+=i + "、" + x + "+" + y + "+" + z + "=\n";
						i++;
					} else if(y > 0 && z < 0) {
						res+=i + "、" + x + "+" + y + z + "=\n";
						i++;
					}
				}
			} else {
				if(y < 0) {
					res+=i + "、" + x + y + "=\n";
					i++;
				} else if(y > 0) {
					res+=i + "、" + x + "+" + y + "=\n";
					i++;
				}
			}
		}

	}

	$("#text_show").val(res);
	$("#text_show").select();
	document.execCommand("copy");
}

function doPrint() {
	$("body").html($("#show_table").html());
	window.print();
}