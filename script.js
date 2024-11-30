function n1(x) {
	if (x <= 99) {
			return Math.ceil((100 - x) / 10);
	} else {
			return 0;
	}
}

function n2(x) {
	if (x <= 159) {
			return Math.ceil((160 - 10 * n1(x) - x) / 5);
	} else {
			return 0;
	}
}

function n3(x) {
	return 255 - 10 * n1(x) - 5 * n2(x) - x;
}

function n(x) {
	return n1(x) + n2(x) + n3(x);
}

function g(x) {
	if (x >= 160) {
			return 3;
	} else if (x >= 100) {
			return 9;
	} else {
			return 16;
	}
}

function nakayoshi(i, x) {
	if (x == 0) {
			return i;
	} else {
			return nakayoshi(Math.min(i + g(i),255), x - 1);
	}
}

function h(i, x) {
	return n(nakayoshi(i, x));
}

// クリアボタン用の関数
function clearFields() {
	document.getElementById('a0').value = '';
	document.getElementById('a1').value = '';
	document.getElementById('a2').value = '';
	document.getElementById('a3').value = '';
	document.getElementById('a4').value = '';
	document.getElementById('a5').value = '';
	document.getElementById('result').innerHTML = ''; // 結果もクリア
}

function calculate() {
	const a0 = parseInt(document.getElementById('a0').value);
	const a1 = parseInt(document.getElementById('a1').value);
	const a2 = parseInt(document.getElementById('a2').value);
	const a3 = parseInt(document.getElementById('a3').value);
	const a4 = parseInt(document.getElementById('a4').value);
	const a5 = parseInt(document.getElementById('a5').value);

	const isNull = (value) => value === '' || isNaN(value);
	const conditions = [a0, a1, a2, a3, a4, a5];
	const conditionsToCheck = conditions.map((value) => isNull(value) ? null : value);

	let result = [];

	for (let i = 0; i < 256; i++) {
			let match = true;
			for (let j = 0; j < conditionsToCheck.length; j++) {
					if (conditionsToCheck[j] !== null && h(i, j) !== conditionsToCheck[j]) {
							match = false;
							break;
					}
			}
			if (match) {
					result.push(i);
			}
	}

	let tableHTML = '<table border="1"><tr><th>0個</th>';
	for (let x = 1; x <= 5; x++) {
			tableHTML += `<th>${x}個</th>`;
	}
	tableHTML += '</tr>';

	if (result.length > 0) {
			result.forEach((i) => {
					tableHTML += `<tr><td>${i}（${h(i,0)}）</td>`;
					for (let x = 1; x <= 5; x++) {
							tableHTML += `<td>${nakayoshi(i, x)}（${h(i,x)}）</td>`;
					}
					tableHTML += '</tr>';
			});
	} else {
			tableHTML += '<tr><td colspan="6">一致する値はありません。</td></tr>';
	}
	tableHTML += '</table>';

	document.getElementById('result').innerHTML = tableHTML;
}