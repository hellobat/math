//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
var x, y, z, zmax, zmin, nmin, nmax, num, i, j, if_next, if_num;

$(document).ready(
	function() {
		$("#show :button").click(doAdd);
	}
);

function doAdd() {
	i = 1;
	$("#show p").remove();
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
		if(x!=1&&y!=1&&y!=-1&&x+y!=0&&x > 0 && x + y <= zmax && x + y >= zmin) {
			if(if_num < if_next) {
				z = Math.floor(Math.random() * (nmax - nmin) + nmin);
				if(x + y + z <= zmax && x + y + z >= zmin) {
					if(y < 0 && z > 0) {
						$("#show").append("<p>" + i + "、" + x + y + "+" + z + "=" + "</p>");
						i++;
					} else if(y < 0 && z < 0) {
						$("#show").append("<p>" + i + "、" + x + y + z + "=" + "</p>");
						i++;
					} else if(y > 0 && z > 0) {
						$("#show").append("<p>" + i + "、" + x + "+" + y + "+" + z + "=" + "</p>");
						i++;
					} else if(y > 0 && z < 0) {
						$("#show").append("<p>" + i + "、" + x + "+" + y + z + "=" + "</p>");
						i++;
					}
				}
			} else {
				if(y < 0) {
					$("#show").append("<p>" + i + "、" + x + y + "=" + "</p>");
					i++;
				} else if(y > 0) {
					$("#show").append("<p>" + i + "、" + x + "+" + y + "=" + "</p>");
					i++;
				}
			}
		}
	}
}