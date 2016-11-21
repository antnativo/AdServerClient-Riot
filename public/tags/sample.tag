<sample>
<div class = {opts.wrapper}>
  <h3>{ message }</h3>
  <ul>
    <li each={ techs }>{ name }</li>
  </ul>
  <yield from="content">
  {html}
  </yield>
</div>
  <script>
    if(opts.wrapperclass)
      this.wrapperClass = opts.wrapper
    else
      this.wrapperClass = "sidebar-top"
    if(opts.list)
      this.message = opts.message
    else
      this.message = 'Hello, Riot!'
    if(opts.list)
      this.techs = opts.list
    else
      this.techs = [
        { name: 'HTML' },
        { name: 'JavaScript' },
        { name: 'CSS' }
      ]
  </script>
  <style scoped>
    :scope { font-size: 1em }
  </style>
</sample>