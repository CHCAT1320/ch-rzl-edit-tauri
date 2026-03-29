<template>
    <h1>愤怒喵</h1>
    <router-link to="/edit">去编辑</router-link>
</template>
<script setup>
import { resourceDir, join } from '@tauri-apps/api/path';
import { exists, BaseDirectory } from '@tauri-apps/plugin-fs';
import { openPath } from '@tauri-apps/plugin-opener';
console.log(await resourceDir())
</script>