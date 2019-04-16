(function COCOMO() {
	let btn = document.getElementById('countBtn');

	btn.addEventListener('click', ()=> {
		let kLOC = parseFloat(document.getElementById('kloc').value);
		
		let lang = document.getElementById('lang');
		lang = lang.options[lang.selectedIndex].value;

		kLOC = (kLOC / lang).toFixed(2);
		
		const EAF = eaf();

		let manMonth = 0;
		let timeMonth = 0;	
		
		let mode = document.getElementById('mode');
		mode = mode.options[mode.selectedIndex].value;
		
		if (mode === 'simple') {
			manMonth = 3.2 * EAF * Math.pow(kLOC, 1.05);
			timeMonth = 2.5 * Math.pow(manMonth, 0.38);
		}
		if (mode === 'inter') {
			manMonth = 3 * EAF * Math.pow(kLOC, 1.12);
			timeMonth = 2.5 * Math.pow(manMonth, 0.35);
		}
		if (mode === 'buildin') {
			manMonth = 2.8 * EAF * Math.pow(kLOC, 1.2);
			timeMonth = 2.5 * Math.pow(manMonth, 0.32);
		}

		createTables(manMonth.toFixed(2), timeMonth.toFixed(2));
	});
	
	function eaf() {
		let rely = document.getElementById('RELY');
		rely = rely.options[rely.selectedIndex].value;		
		let data = document.getElementById('DATA');
		data = data.options[data.selectedIndex].value;		
		let cplx = document.getElementById('CPLX');
		cplx = cplx.options[cplx.selectedIndex].value;
		
		let time = document.getElementById('TIME');
		time = time.options[time.selectedIndex].value;
		let stor = document.getElementById('STOR');
		stor = stor.options[stor.selectedIndex].value;
		let virt = document.getElementById('VIRT');
		virt = virt.options[virt.selectedIndex].value;
		let turn = document.getElementById('TURN');
		turn = turn.options[turn.selectedIndex].value;
		
		let acap = document.getElementById('ACAP');
		acap = acap.options[acap.selectedIndex].value;
		let aexp = document.getElementById('AEXP');
		aexp = aexp.options[aexp.selectedIndex].value;
		let pcap = document.getElementById('PCAP');
		pcap = pcap.options[pcap.selectedIndex].value;
		
		let vexp = document.getElementById('VEXP');
		vexp = vexp.options[vexp.selectedIndex].value;
		let lexp = document.getElementById('LEXP');
		lexp = lexp.options[lexp.selectedIndex].value;
		let modp = document.getElementById('MODP');
		modp = modp.options[modp.selectedIndex].value;
		let tool = document.getElementById('TOOL');
		tool = tool.options[tool.selectedIndex].value;
		let sced = document.getElementById('SCED');
		sced = sced.options[sced.selectedIndex].value;
		
		return parseFloat(rely*data*cplx*time*stor*virt*turn*acap*aexp*pcap*vexp*lexp*modp*tool*sced).toFixed(2);
	}
	
	function createTables(manMonth, timeMonth) {
		let budget = [0.04*manMonth, 
					0.12*manMonth, 
					0.44*manMonth, 
					0.06*manMonth, 
					0.14*manMonth, 
					0.07*manMonth, 
					0.07*manMonth, 
					0.06*manMonth];

		budget = budget.map((elem) => { return elem.toFixed(2)});
		
		let tAn = document.getElementById('tAn');
		tAn.innerHTML = budget[0];
		let tProj = document.getElementById('tProj');
		tProj.innerHTML = budget[1];
		let tProg = document.getElementById('tProg');
		tProg.innerHTML = budget[2];
		let tTest = document.getElementById('tTest');
		tTest.innerHTML = budget[3];
		let tVer = document.getElementById('tVer');
		tVer.innerHTML = budget[4];
		let tOff = document.getElementById('tOff');
		tOff.innerHTML = budget[5];
		let tManag = document.getElementById('tManag');
		tManag.innerHTML = budget[6];
		let tCreat = document.getElementById('tCreat');
		tCreat.innerHTML = budget[7];
		let tTotal = document.getElementById('tTotal');
		tTotal.innerHTML = manMonth;
		
		let job = [	0.18*manMonth, 
					0.25*manMonth, 
					0.26*manMonth, 
					0.31*manMonth ];

		let time = [ 0.36*timeMonth, 
					 0.18*timeMonth,
					 0.18*timeMonth,
					 0.28*timeMonth ];

		job = job.map((elem) => { return elem.toFixed(2)});
		time = time.map((elem) => { return elem.toFixed(2)});

		let j1 = document.getElementById('j1');
		j1.innerHTML = (0.08 * manMonth).toFixed(2);
		let t1 = document.getElementById('t1');
		t1.innerHTML = (0.36 * timeMonth).toFixed(2);
		let j2 = document.getElementById('j2');
		j2.innerHTML = job[0];
		let t2 = document.getElementById('t2');
		t2.innerHTML = time[0];
		let j3 = document.getElementById('j3');
		j3.innerHTML = job[1];
		let t3 = document.getElementById('t3');
		t3.innerHTML = time[1];
		let j4 = document.getElementById('j4');
		j4.innerHTML = job[2];
		let t4 = document.getElementById('t4');
		t4.innerHTML = time[2];
		let j5 = document.getElementById('j5');
		j5.innerHTML = job[3];
		let t5 = document.getElementById('t5');
		t5.innerHTML = time[3];	

		let wPj = document.getElementById('wPj');
		wPj.innerHTML = manMonth;
		let wPt = document.getElementById('wPt');
		wPt.innerHTML = timeMonth;
		
		let j = document.getElementById('j');
		j.innerHTML = (+manMonth + 0.08 * manMonth).toFixed(2);
		let t = document.getElementById('t');
		t.innerHTML = (+timeMonth + 0.36 * timeMonth).toFixed(2);
		
		(function createGraph() {	
			var ctx = document.getElementById('chart').getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ["Анализ требований",
							"Проектирование",
							"Программирование",
							"Тестирование",
							"Вериф. и аттест.",
							"Канцелярия проекта",
							"Упр.конф. и об.кач.",
							"Создание руководств"],
					datasets: [{
						data: budget,
						backgroundColor: randomColor({
							count: budget.length
						}),
						borderWidth: 1
					}]
				},
				options: {
					legend: {
						display: false,
						labels: {
							fontColor: 'white'
						}
					}
				}
			});
			
			var ctxTJ = document.getElementById('timejob').getContext('2d');
			var myChartTJ = new Chart(ctxTJ, {
				type: 'doughnut',
				data: {
					labels: ["Проектирование",
							"Детальное проектирование",
							"Кодирование и тестирование отдельных модулей",
							"Интеграция и тестирование"],
					datasets: [{
						data: job,
						backgroundColor: randomColor({
							count: job.length
						}),
						borderWidth: 1
					},
					{	data: time,
						backgroundColor: randomColor({
							count: time.length
						}),
						borderWidth: 1
					}]
				},
				options: {
					legend: {
						display: false,
						labels: {
							fontColor: 'white'
						}
					}
				}
			});
			
			let dataJT = [];
			let current = 0;
			for (let i = 0, len = job.length; i < len; i++) {
				current += job[i]/time[i];
				dataJT.push(Math.round(current));
			}
			
			let ctxDia = document.getElementById('dia').getContext('2d');
			let myChartDia = new Chart(ctxDia, {
				type: 'bar',
				data: {
					labels: ["Проектирование",
							"Детальное проектирование",
							"Код. и тест.отд. модулей",
							"Интеграция и тестирование"],
					datasets: [{
						data: dataJT,
						backgroundColor: randomColor({
							count: dataJT.length
						}),
						borderWidth: 1
					}]
				},
				options: {
					legend: {
						display: false,
						labels: {
							fontColor: 'white'
						}
					}
				}
			});

		})();
	}
})();