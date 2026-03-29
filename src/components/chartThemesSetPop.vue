<template>
    <div id="chartThemesSetPopShadow" v-if="visible" :class="{ 'leaving': isLeaving }">
        <div id="chartThemesSetPop">
            <h2>主题管理</h2>
            <div id="chartThemesSetPopContent">
                基础主题：<input type="text" v-model="baseTheme">
                挑战主题：<input type="text" v-model="challengeTheme">
            </div>
            <div id="chartThemesSetPopButtonsDiv">
                <button class="confirmButton" @click="confirm()">确定</button>
                <button class="cancelButton" @click="closePop()">取消</button>
            </div>
        </div>
    </div>
</template>

<style>
    #chartThemesSetPopShadow {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(1px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;
    }

    /* 离开时的遮罩淡出 */
    #chartThemesSetPopShadow.leaving {
        animation: fadeOut 0.4s ease forwards;
    }

    #chartThemesSetPop {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #333;
        padding: 40px;
        border: #fff 1px solid;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        animation: appear 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* 离开时的弹窗动画 */
    #chartThemesSetPopShadow.leaving #chartThemesSetPop {
        animation: disappear 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    #chartThemesSetPopContent {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        align-content: center;
        grid-gap: 20px;
    }

    #chartThemesSetPopButtonsDiv {
        margin: 30px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0px 50px;
    }

    /* 遮罩淡入 */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* 遮罩淡出 */
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    /* 弹窗出现 */
    @keyframes appear {
        from {
            opacity: 0;
            top: 100%;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 1;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    /* 弹窗消失 */
    @keyframes disappear {
        from {
            opacity: 1;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            top: 100%;
            transform: translate(-50%, -50%) scale(0);
        }
    }
</style>

<script setup>
    import { popStates } from '../assets/js/popControl';
    import { chartJson } from '../assets/js/chartList';
    import { ref, watch } from 'vue';

    const visible = ref(popStates.value.chartThemesSetPopState);
    const isLeaving = ref(false);
    
    // const baseTheme = ref(chartJson.value.Themes[0].colorList);

    // 监听外部状态变化（打开时）
    watch(() => popStates.value.chartThemesSetPopState, (newVal) => {
        if (newVal) {
            isLeaving.value = false;
            visible.value = true;
        }
    });

    function closePop() {
        isLeaving.value = true; // 触发离开动画
        
        // 等待动画完成后隐藏 DOM
        setTimeout(() => {
            visible.value = false;
            isLeaving.value = false;
            popStates.value.chartThemesSetPopState = false;
        }, 400); // 与 disappear 动画时长一致
    }

    function confirm() {
        // 保存数据
        
        console.log(chartJson.value);
        
        closePop();
    }
</script>