riot.tag2('sample', '<div class="{opts.wrapper}"> <h3>{message}</h3> {none} <ul> <li each="{techs}"> {name}</li> </ul> <viewability></viewability> <yield from="content"> {html} </yield> </div>', 'sample,[riot-tag="sample"],[data-is="sample"]{ font-size: 1em } sample h3,[riot-tag="sample"] h3,[data-is="sample"] h3{ background: blue !important; } sample h3.old,[riot-tag="sample"] h3.old,[data-is="sample"] h3.old{ background:red !important; }', '', function(opts) {
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
      var viewability = this.mixin(checkComponentViewability)
      viewability.checkViewability()
});