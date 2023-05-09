<script setup lang="ts">
const mode = useColorMode()
const isDark = computed<boolean>({
    get() {
        return mode.value === 'dark'
    },
    set() {
        mode.preference = isDark.value ? 'light' : 'dark'
    },
})
const toggle = useToggle(isDark)
const context = {
    mode,
    isDark,
    toggle,
}
</script>
<template>
    <ColorScheme placeholder="..." tag="span">
        <slot v-bind="context" />
    </ColorScheme>
</template>