import fs from 'fs';
import { dirname, join, isAbsolute } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readChartPath(path) {
    // 如果传入的是相对路径，才拼接 __dirname
    const finalPath = isAbsolute(path) ? path : join(__dirname, path);
    console.log('Reading:', finalPath);
    const chartJson = JSON.parse(fs.readFileSync(finalPath, 'utf-8'));
    return chartJson;
}

function writeChartPath(path, chartJson) {
    // 如果传入的是相对路径，才拼接 __dirname
    const finalPath = isAbsolute(path) ? path : join(__dirname, path);
    console.log('Writing:', finalPath);
    fs.writeFileSync(finalPath, JSON.stringify(chartJson, null, 2));
}

// 其余 fv2cre 函数代码保持不变...

function fv2cre(chart) {
    const result = {
        "meta": {
            "CREVersion": 100,
            "charter": "Unknown",
            "illustrator": "Unknown",
            "level": "0",
            "name": "Unknown",
            "musician": "Unknown",
            "offset": 0
        },
        "themes": [],
        "challengeTimes": [],
        "bpmList": [],
        "lines": [],
        "canvases": [],
        "camera": {
            "moveXEvents": [],
            "scaleEvents": []
        }
    }
    result.meta.offset = chart.offset;
    for(let i = 0; i < chart.themes.length; i++) {
        if ( !result.themes[i] ) result.themes[i] = {};
        const colorsList = chart.themes[i].colorsList;
        result.themes[i].backgroundColor = [colorsList[0].r, colorsList[0].g, colorsList[0].b, colorsList[0].a];
        result.themes[i].noteColor = [colorsList[1].r, colorsList[1].g, colorsList[1].b, colorsList[1].a];
        result.themes[i].effectsColor = [colorsList[2].r, colorsList[2].g, colorsList[2].b, colorsList[2].a];
    }
    for(let i = 0; i < chart.challengeTimes.length; i++) {
        const ct = chart.challengeTimes[i];
        result.challengeTimes.push({
            "startTime": ct.start,
            "endTime": ct.end,
            "transTime": ct.transTime
        });
    }
    for(let i = 0; i < chart.bpmShifts.length; i++) {
        const BaseBpm = chart.bPM
        const bpmShift = chart.bpmShifts[i];
        const bpm = BaseBpm * bpmShift.value;
        result.bpmList.push({
            "time": bpmShift.time,
            "bpm": bpm
        });
    }
    if (chart.bpmShifts.length === 0) {
        result.bpmList.push({
            "time": 0,
            "bpm": BaseBpm
        });
    }
    for(let i = 0; i < chart.lines.length; i++) {
        const line = chart.lines[i];
        const linePoints = line.linePoints;
        const newLinePoints = [];
        const newNotes = [];
        const newJudgeRingColors = [];
        const newLineColors = [];
        for(let j = 0; j < linePoints.length; j++) {
            const point = linePoints[j];
            newLinePoints.push({
                "time": point.time,
                "x": point.xPosition,
                "color": [point.color.r, point.color.g, point.color.b, point.color.a],
                "easeType": point.easeType,
                "canvasIndex": point.canvasIndex,
            });
        }
        result.lines.push({
            "linePoints": newLinePoints
        });
        for(let j = 0; j < line.notes.length; j++) {
            const note = line.notes[j];
            if (!note.otherInformations) note.otherInformations = [];
            try {
                newNotes.push({
                "time": note.time,
                "type": note.type,
                "endTime": note.otherInformations.length > 0 ? note.otherInformations[0] : undefined,
                "endCanvasIndex": note.otherInformations.length > 0 ? note.otherInformations[1] : undefined,
            })
            }
            catch(e) {
                console.log(e, note, "line:" + i, "note:" + j);
            }
        }
        result.lines[i].notes = newNotes;
        for(let j = 0; j < line.judgeRingColor.length; j++) {
            const judgeRingColor = line.judgeRingColor[j];
            newJudgeRingColors.push({
                "startColor": [judgeRingColor.startColor.r, judgeRingColor.startColor.g, judgeRingColor.startColor.b, judgeRingColor.startColor.a],
                "endColor": [judgeRingColor.endColor.r, judgeRingColor.endColor.g, judgeRingColor.endColor.b, judgeRingColor.endColor.a],
                "startTime": judgeRingColor.time,
                "endTime": line.judgeRingColor[j+1] ? line.judgeRingColor[j+1].time : 18446744073709551615,
            });
        }
        result.lines[i].judgeRingColors = newJudgeRingColors;
        for(let j = 0; j < line.lineColor.length; j++) {
            const lineColor = line.lineColor[j];
            newLineColors.push({
                "startColor": [lineColor.startColor.r, lineColor.startColor.g, lineColor.startColor.b, lineColor.startColor.a],
                "endColor": [lineColor.endColor.r, lineColor.endColor.g, lineColor.endColor.b, lineColor.endColor.a],
                "startTime": lineColor.time,
                "endTime": line.lineColor[j+1] ? line.lineColor[j+1].time : 18446744073709551615,
            });
        }
        result.lines[i].lineColors = newLineColors;
    }
    for(let i = 0; i < chart.canvasMoves.length; i++) {
        const canvasMove = chart.canvasMoves[i];
        const moveXEvents = [];
        const speedEvents = [];
        for(let j = 0; j < canvasMove.xPositionKeyPoints.length; j++) {
            const xPositionKeyPoint = canvasMove.xPositionKeyPoints[j];
            moveXEvents.push({
                "startTime": xPositionKeyPoint.time,
                "endTime": canvasMove.xPositionKeyPoints[j+1] ? canvasMove.xPositionKeyPoints[j+1].time : 18446744073709551615,
                "start": xPositionKeyPoint.value,
                "end": canvasMove.xPositionKeyPoints[j+1] ? canvasMove.xPositionKeyPoints[j+1].value : xPositionKeyPoint.value,
                "easeType": xPositionKeyPoint.easeType,
            });
        }
        for(let j = 0; j < canvasMove.speedKeyPoints.length; j++) {
            const speedKeyPoint = canvasMove.speedKeyPoints[j];
            speedEvents.push({
                "startTime": speedKeyPoint.time,
                "endTime": canvasMove.speedKeyPoints[j+1] ? canvasMove.speedKeyPoints[j+1].time : 18446744073709551615,
                "start": speedKeyPoint.value,
                "end": speedKeyPoint.value,
            });
        }
        result.canvases.push({
            "moveXEvents": moveXEvents,
            "speedEvents": speedEvents,
        });
    }
    for(let i = 0; i < chart.cameraMove.xPositionKeyPoints.length; i++) {
        const xPositionKeyPoint = chart.cameraMove.xPositionKeyPoints[i];
        result.camera.moveXEvents.push({
            "startTime": xPositionKeyPoint.time,
            "endTime": chart.cameraMove.xPositionKeyPoints[i+1] ? chart.cameraMove.xPositionKeyPoints[i+1].time : 18446744073709551615,
            "start": xPositionKeyPoint.value,
            "end": chart.cameraMove.xPositionKeyPoints[i+1] ? chart.cameraMove.xPositionKeyPoints[i+1].value : xPositionKeyPoint.value,
            "easeType": xPositionKeyPoint.easeType,
        });
    }
    for(let i = 0; i < chart.cameraMove.scaleKeyPoints.length; i++) {
        const scaleKeyPoint = chart.cameraMove.scaleKeyPoints[i];
        result.camera.scaleEvents.push({
            "startTime": scaleKeyPoint.time,
            "endTime": chart.cameraMove.scaleKeyPoints[i+1] ? chart.cameraMove.scaleKeyPoints[i+1].time : 18446744073709551615,
            "start": scaleKeyPoint.value,
            "end": chart.cameraMove.scaleKeyPoints[i+1] ? chart.cameraMove.scaleKeyPoints[i+1].value : scaleKeyPoint.value,
            "easeType": scaleKeyPoint.easeType,
        });
    }
    return result;
    // writeChartPath('../charts/Bamboo/CRE.chart.Bamboo.rissyuu.0.IN.json', result);
    // writeChartPath('../charts/BRAVEROAD/CRE.chart.BRAVEROAD.umavsMorimoriAtsushi.0.AT.json', result);
    // writeChartPath('../charts/RIP/CRE.chart.RIP.eicateve.0.IN.json', result);
    // writeChartPath('../charts/LAIGN/CRE.chart.LAIGN.KiufeatNikkiSimons.0.IN.json', result);
    // writeChartPath('../charts/ULTRASYNERGYMATRIX/CRE.chart.ULTRASYNERGYMATRIX.Tanchiky.0.IN.json', result);
}

// fv2cre(readChartPath('../charts/Bamboo/chart.Bamboo.rissyuu.0.IN.json'))
// fv2cre(readChartPath('../charts/BRAVEROAD/chart.BRAVEROAD.umavsMorimoriAtsushi.0.AT.json'))
// fv2cre(readChartPath('../charts/RIP/chart.RIP.eicateve.0.IN.json'))
// fv2cre(readChartPath('../charts/LAIGN/chart.LAIGN.KiufeatNikkiSimons.0.IN.json'))
// fv2cre(readChartPath('../charts/ULTRASYNERGYMATRIX/chart.ULTRASYNERGYMATRIX.Tanchiky.0.IN.json'))

// 遍历chart目录里面所有的文件夹，并把每个文件夹里面的chart.开头的json都转换成fv2cre格式的json，导出新json文件，文件名为原文件名开头加CRE.
const chartDir = join(dirname(fileURLToPath(import.meta.url)), '../charts');
const chartNames = fs.readdirSync(chartDir);
for(let i = 0; i < chartNames.length; i++) {
    const chartName = chartNames[i];
    if (fs.statSync(join(chartDir, chartName)).isDirectory()) {
        // 遍历chart目录里面每个文件夹里面的chart.开头的json
        const chartJsons = fs.readdirSync(join(chartDir, chartName)).filter(name => name.startsWith('chart.'));
        for(let j = 0; j < chartJsons.length; j++) {
            const chartJsonName = chartJsons[j];
            const chartJson = readChartPath(join(chartDir, chartName, chartJsonName));
            const creJson = fv2cre(chartJson);
            writeChartPath(join(chartDir, chartName, 'CRE.' + chartJsonName), creJson);
        }
    }
}