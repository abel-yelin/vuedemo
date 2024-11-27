<template>
  <div></div>
</template>

<script lang="ts" setup>
// @ts-nocheck
defineOptions({
  name: 'VabStatistics',
})

// 网站访问量统计 如不需要请自行注释
onBeforeMount(() => {
  if (location.hostname !== 'localhost' && !location.hostname.includes('127') && !location.hostname.includes('192')) {
    ;(function () {
      const hm = document.createElement('script')
      let k = '820b686671af452e8a4e18952ce946d8'
      if (location.hostname.includes('vuejs-core')) k = '9578a46b371ba85ee55bc868d6b30692'
      hm.src = `//hm.baidu.com/hm.js?${k}`
      const s: any = document.querySelectorAll('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
    ;(function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          // eslint-disable-next-line prefer-rest-params
          ;(c[a].q = c[a].q || []).push(arguments)
        }
      t = l.createElement(r)
      t.async = 1
      t.src = `//www.clarity.ms/tag/${i}`
      y = l.getElementsByTagName(r)[0]
      y.parentNode.insertBefore(t, y)
    })(globalThis, document, 'clarity', 'script', 'j9de7dmm7n')
  }
})
</script>
