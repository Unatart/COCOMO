const medaBtn = document.getElementById('meda');
const fpBtn = document.getElementById('fpBtn');

let FP = 0;
let correctFP = 0;

fpBtn.addEventListener('click', ()=> {
    FP = 0;
    correctFP = 0;
    let sumCoeffCorrComplexity = 0;
    for (let i = 1; i < 15; i++) {
        let curr = +document.getElementById('fp'+i).value;
        sumCoeffCorrComplexity += curr;
    }

    let EI = [[3, 3, 4], [3, 4, 6], [4, 6, 6]];
    let EO = [[4, 4, 5], [4, 5, 7], [5, 7, 7]];
    let ILF = [[7, 7, 10], [7, 10, 15], [10, 15, 15]];
    let EIF = [[5, 5, 7], [5, 7, 10], [7, 10, 10]];
    let EQ = [[3, 3, 4], [3, 4, 6], [4, 6, 6]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            FP += +document.getElementById('EI'+i+j).value * EI[i][j] +
                +document.getElementById('EO'+i+j).value * EO[i][j] +
                +document.getElementById('ILF'+i+j).value * ILF[i][j] +
                +document.getElementById('EIF'+i+j).value * EIF[i][j] +
                +document.getElementById('EQ'+i+j).value * EQ[i][j];
        }
    }

    correctFP = FP * (0.65 + 0.01*sumCoeffCorrComplexity);

    document.getElementById('fp').innerHTML = 'Функц.точки без корректировки: ' + FP.toFixed(2);
    document.getElementById('ufp').innerHTML = 'Функц.точки с корректировкой: ' + correctFP.toFixed(2);
    document.getElementById('fi').innerHTML = 'Коэфф.корректировки:' + sumCoeffCorrComplexity.toFixed(2);
});

medaBtn.addEventListener('click', ()=> {
    const p = countP();
    document.getElementById('p').innerHTML = 'P = ' + p;

    const eArch = counteArch(p);
    let procRUSE = +document.getElementById('rusePr').value;
    let PROD = document.getElementById('exp');
    PROD = PROD.options[PROD.selectedIndex].value;
    let screenForms = +document.getElementById('sS').value +
        +document.getElementById('mS').value*2 +
        +document.getElementById('hS').value*3;
    let docs = +document.getElementById('sD').value*2 +
        +document.getElementById('mD').value*5 +
        +document.getElementById('hD').value*8;
    let modules = +document.getElementById('mod').value*10;

    const FPper = FP/100;
    const kLOC = FPper * 30 * 64 + FPper * 10 * 21 + FPper * 60 * 53;
    const size = screenForms+docs+modules;
    const MdpJob = (size * ((100 - procRUSE)/100))/PROD ;
    const medaJob = 2.45*eArch*Math.pow(kLOC/1000, p);

    document.getElementById('jobResultMeda').innerHTML = 'Трудозатраты(чел/мес): ' +medaJob.toFixed(2) ;
    document.getElementById('timeResultMeda').innerHTML = 'Время(мес):' + (3.0*Math.pow(medaJob, 0.33 + 0.2*(p-1.01))).toFixed(2);
    document.getElementById('jobResultMdp').innerHTML = 'Трудозатраты(чел/мес):' + MdpJob;
    document.getElementById('timeResultMdp').innerHTML = 'Время(мес):' + (3*Math.pow(MdpJob, 0.33+0.2*(p-1.01))).toFixed(2);
});

function countP(){
    let prec = document.getElementById('prec');
    prec = +prec.options[prec.selectedIndex].value;
    let flex = document.getElementById('Flex');
    flex = +flex.options[flex.selectedIndex].value;
    let risk = document.getElementById('Risk');
    risk = +risk.options[risk.selectedIndex].value;
    let team = document.getElementById('team');
    team = +team.options[team.selectedIndex].value;
    let pmat = document.getElementById('pmat');
    pmat = +pmat.options[pmat.selectedIndex].value;

    return ((prec+flex+risk+team+pmat)/100 + 1.01).toFixed(2);
}

function counteArch(p) {
    let PERS = document.getElementById('PERS');
    PERS = +PERS.options[PERS.selectedIndex].value;
    let RCPX = document.getElementById('RCPX');
    RCPX = +RCPX.options[RCPX.selectedIndex].value;
    let RUSE = document.getElementById('RUSE');
    RUSE = +RUSE.options[RUSE.selectedIndex].value;
    let PDIF = document.getElementById('PDIF');
    PDIF = +PDIF.options[PDIF.selectedIndex].value;
    let FCIL = document.getElementById('FCIL');
    FCIL = +FCIL.options[FCIL.selectedIndex].value;
    let SCED = document.getElementById('SCED');
    SCED = +SCED.options[SCED.selectedIndex].value;
    let PREX = document.getElementById('PREX');
    PREX = +PREX.options[PREX.selectedIndex].value;

    return (PERS*RCPX*RUSE*PDIF*FCIL*SCED*PREX).toFixed(2);
}