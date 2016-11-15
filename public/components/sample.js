riot.tag2('sample', '<h3>{message}</h3> <ul> <li each="{techs}">{name}</li> </ul>', 'sample,[riot-tag="sample"],[data-is="sample"]{ font-size: 2rem } sample h3,[riot-tag="sample"] h3,[data-is="sample"] h3{ color: #444 } sample ul,[riot-tag="sample"] ul,[data-is="sample"] ul{ color: #999 }', '', function(opts) {
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
});