<script lang="jsx">
  import icons from './icons.svg'

  export default {
    name: 'EjIcon',

    functional: true,

    render: (h, {data: $data, props: $props}) => {
      const {iconSet, icon} = $props

      const $svgData = {
        ...$data,
        class: ['ej-icon'].concat($data.staticClass, $data.class),
      }

      const $useAttrs = {
        'xlink:href': icon.indexOf('#') > 0 ? icon : `${iconSet || icons}#${icon}`,
      }

      return (
        <svg {...$svgData}>
          <use {...{attrs: $useAttrs}}/>
        </svg>
      )
    },
  }
</script>

<style>
  .ej-icon {
    width: 24px;
    height: 24px;
  }
</style>
