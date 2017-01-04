riot.tag2('sample', '<div class="{opts.wrapper}"> <h3>{message}</h3> {none} <ul> <li each="{techs}"> {name}</li> </ul> <yield from="content"> {html} </yield> </div>', 'sample,[riot-tag="sample"],[data-is="sample"]{ font-size: 1em }', '', function(opts) {
    this.none = this.content;
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
      this.on("load",function(){ alert() })
});