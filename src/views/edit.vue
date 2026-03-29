<template>
    <div style="height: 100vh;">
        <header>
            <router-link to="/" class="simpleButton">返回←</router-link>
            <div id="canvasIndexDiv">
                <h4>当前画布：</h4>
                <input type="text" v-model="editCanvasIndex">
            </div>
            <div id="beatLineCountDiv">
                <h4>tick横线密度：</h4>
                <input type="text" v-model="subDivisions">
            </div>
            <div id="beatLineIntervalDiv">
                <h4>tick横线间隔：</h4>
                <input type="text" v-model="pixelsPerSecond">
            </div>
        </header>
        <div id="editArea">
            <canvas ref="cvs" id="cvs"></canvas>
            <div id="toolBox">
                <h1 style="color: white;">工具栏</h1>
                <audio ref="audio" controls></audio>
                <div id="tollsDiv">
                    <button class="simpleButton" @click="popStates.chartMetaSetPopState = true">谱面基本信息</button>
                    <button class="simpleButton" @click="popStates.chartThemesSetPopState = true">主题管理</button>
                    <button class="simpleButton">滚木</button>
                    <button class="simpleButton">滚木</button>
                    <button class="simpleButton">滚木</button>
                    <button class="simpleButton">滚木</button>
                    <button class="simpleButton">滚木</button>
                    <button class="simpleButton">滚木</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <chartMetaSetPop v-if="popStates.chartMetaSetPopState"></chartMetaSetPop> -->
    <!-- <chartThemesSetPop v-if="popStates.chartThemesSetPopState"></chartThemesSetPop> -->
</template>
<style src="../assets/css/edit.css"></style>
<script setup>
    import { useTemplateRef, onMounted } from 'vue'
    import { cvs, ctx, audio } from '../assets/js';
    // import chartMetaSetPop from '../components/chartMetaSetPop.vue'
    // import chartThemesSetPop from '../components/chartThemesSetPop.vue';

    const canvas = useTemplateRef('cvs')
    const audioEl = useTemplateRef('audio')
    onMounted(() => {
        cvs.value = canvas.value
        ctx.value = cvs.value.getContext('2d')
        audio.value = audioEl.value
    })

</script>