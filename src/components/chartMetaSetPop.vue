<template>
    <div id="chartMetaSetPopShadow" v-if="visible" :class="{ 'leaving': isLeaving }">
        <div id="chartMetaSetPop">
            <h2>谱面基本信息</h2>
            <div id="chartMetaSetPopContent">
                谱面名称：<input type="text" v-model="chartName">
                谱师：<input type="text" v-model="charter">
                画师：<input type="text" v-model="illustrator">
                曲师：<input type="text" v-model="musician">
                难度：<input type="text" v-model="level">
            </div>
            <div id="chartMetaSetPopButtonsDiv">
                <button class="confirmButton" @click="confirm()">确定</button>
                <button class="cancelButton" @click="closePop()">取消</button>
            </div>
        </div>
    </div>
</template>

<style>
    #chartMetaSetPopShadow {
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
    #chartMetaSetPopShadow.leaving {
        animation: fadeOut 0.4s ease forwards;
    }

    #chartMetaSetPop {
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
    #chartMetaSetPopShadow.leaving #chartMetaSetPop {
        animation: disappear 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    #chartMetaSetPopContent {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        align-content: center;
        grid-gap: 20px;
    }

    #chartMetaSetPopButtonsDiv {
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

    const visible = ref(popStates.value.chartMetaSetPopState);
    const isLeaving = ref(false);
    
    const level = ref(chartJson.value.meta.level);
    const chartName = ref(chartJson.value.meta.name);
    const charter = ref(chartJson.value.meta.charter);
    const musician = ref(chartJson.value.meta.musician);
    const illustrator = ref(chartJson.value.meta.illustrator);

    // 监听外部状态变化（打开时）
    watch(() => popStates.value.chartMetaSetPopState, (newVal) => {
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
            popStates.value.chartMetaSetPopState = false;
        }, 400); // 与 disappear 动画时长一致
    }

    function confirm() {
        // 保存数据
        chartJson.value.meta.name = chartName.value;
        chartJson.value.meta.charter = charter.value;
        chartJson.value.meta.illustrator = illustrator.value;
        chartJson.value.meta.musician = musician.value;
        chartJson.value.meta.level = level.value;
        console.log(chartJson.value);
        
        closePop();
    }
</script>