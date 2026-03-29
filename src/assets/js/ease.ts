export type EaseFunction = (x: number) => number;

const { pow, sin, cos, PI, sqrt } = Math;

// 1. 缓动函数定义（19个，严格匹配提供的列表）
function linear(x: number): number {
    return x;
}

function easeInQuad(x: number): number {
    return x * x;
}

function easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x);
}

function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

function easeInCubic(x: number): number {
    return x * x * x;
}

function easeOutCubic(x: number): number {
    return 1 - pow(1 - x, 3);
}

function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

function easeInQuart(x: number): number {
    return x * x * x * x;
}

function easeOutQuart(x: number): number {
    return 1 - pow(1 - x, 4);
}

function easeInOutQuart(x: number): number {
    return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
}

function easeInQuint(x: number): number {
    return x * x * x * x * x;
}

function easeOutQuint(x: number): number {
    return 1 - pow(1 - x, 5);
}

function easeInOutQuint(x: number): number {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}

function easeZero(_x: number): number {
    return 0;
}

function easeOne(_x: number): number {
    return 1;
}

function easeInCirc(x: number): number {
    return 1 - sqrt(1 - pow(x, 2));
}

function easeOutCirc(x: number): number {
    return sqrt(1 - pow(x - 1, 2));
}

function easeOutSine(x: number): number {
    return sin((x * PI) / 2);
}

function easeInSine(x: number): number {
    return 1 - cos((x * PI) / 2);
}

// 2. 缓动函数数组（19个，索引0-18，严格匹配提供的顺序）
export const easeFuncs: EaseFunction[] = [
    linear,          // 0: Linear
    easeInQuad,      // 1: InQuad
    easeOutQuad,     // 2: OutQuad
    easeInOutQuad,   // 3: InOutQuad
    easeInCubic,     // 4: InCubic
    easeOutCubic,    // 5: OutCubic
    easeInOutCubic,  // 6: InOutCubic
    easeInQuart,     // 7: InQuart
    easeOutQuart,    // 8: OutQuart
    easeInOutQuart,  // 9: InOutQuart
    easeInQuint,     // 10: InQuint
    easeOutQuint,    // 11: OutQuint
    easeInOutQuint,  // 12: InOutQuint
    easeZero,        // 13: Zero
    easeOne,         // 14: One
    easeInCirc,      // 15: InCirc
    easeOutCirc,     // 16: OutCirc
    easeOutSine,     // 17: OutSine
    easeInSine       // 18: InSine
];

// 3. 线性插值（保持原逻辑，确保缓动结果正确映射）
function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

// 4. 缓动执行函数（适配新的缓动函数数组，保留原参数以兼容调用）
export function tweenExecute(
    nowTime: number,
    startTime: number,
    endTime: number,
    start: number,
    end: number,
    easeType: number = 0,
    _easeHead: number = 0,
    _easeTail: number = 1
): number {
    const duration = endTime - startTime;
    const normalizedTime = duration <= 0 ? 0 : (nowTime - startTime) / duration;
    const rdt = Math.min(Math.max(normalizedTime, 0), 1);

    const easingFunc = easeFuncs[easeType] ?? easeFuncs[0];

    try {
        const t = easingFunc(rdt);
        return lerp(start, end, t);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Ease calculation error! rdt: ${rdt}, error: ${error.message}`);
        } else {
            console.error(`Ease calculation error! rdt: ${rdt}, error:`, error);
        }
        return rdt < 0 ? start : end;
    }
}
