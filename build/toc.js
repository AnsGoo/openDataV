// Process @[toc](|Title)

'use strict'

module.exports = function (md) {
  const TOC_REGEXP = /\[toc\](?:\((?:\s+)?([^\)]+)(?:\s+)?\)?)?(?:\s+?)?$/im
  let gstate

  function toc(state, silent) {
    while (state.src.indexOf('\n') >= 0 && state.src.indexOf('\n') < state.src.indexOf('[toc]')) {
      if (state.tokens.slice(-1)[0].type === 'softbreak') {
        state.src = state.src.split('\n').slice(1).join('\n')
        state.pos = 0
      }
    }
    let token
    let match = TOC_REGEXP.exec(state.src)
    if (!match) {
      return false
    }
    match = match.filter(function (m) {
      return m
    })
    if (match.length < 1) {
      return false
    }
    if (silent) {
      // don't run any pairs in validation mode
      return false
    }

    token = state.push('toc_open', 'toc', 1)
    token.markup = '[toc]'

    token = state.push('toc_body', '', 0)

    token = state.push('toc_close', 'toc', -1)

    let offset = 0
    let newline = state.src.indexOf('\n')
    if (newline !== -1) {
      offset = state.pos + newline
    } else {
      offset = state.pos + state.posMax + 1
    }
    state.pos = offset

    return true
  }
  const makeSafe = function (label) {
    return label
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .join('_')
  }

  md.renderer.rules.heading_open = function (tokens, index) {
    const level = tokens[index].tag
    const label = tokens[index + 1]
    if (label.type === 'inline') {
      const anchor = makeSafe(label.content) + '_' + label.map[0]
      return `<${level}><a id="${anchor}"></a>`
    } else {
      return '</h1>'
    }
  }

  md.renderer.rules.toc_open = function (_tokens, _index) {
    return ''
  }

  md.renderer.rules.toc_close = function (_tokens, _index) {
    return ''
  }

  md.renderer.rules.toc_body = function (_tokens, _index) {
    // Wanted to avoid linear search through tokens here,
    // but this seems the only reliable way to identify headings
    const headings = []
    const gtokens = gstate.tokens
    const size = gtokens.length
    for (let i = 0; i < size; i++) {
      if (gtokens[i].type !== 'heading_close') {
        continue
      }
      const token = gtokens[i]
      const heading = gtokens[i - 1]
      if (heading.type === 'inline') {
        headings.push({
          level: +token.tag.substr(1, 1),
          anchor: makeSafe(heading.content) + '_' + heading.map[0],
          content: heading.content
        })
      }
    }

    let indent = 0
    const list = headings.map(function (heading) {
      let res = []
      if (heading.level > indent) {
        const ldiff = heading.level - indent
        for (let i = 0; i < ldiff; i++) {
          res.push('<ul>')
          indent++
        }
      } else if (heading.level < indent) {
        const ldiff = indent - heading.level
        for (let i = 0; i < ldiff; i++) {
          res.push('</ul>')
          indent--
        }
      }

      res.push(
        `<li><a href="javascript:document.querySelector('#${heading.anchor}').scrollIntoView({behavior: 'smooth'})">${heading.content}</a></li>`
      )
      return res.join('')
    })

    return `<div class="toc-box">${list.join('') + new Array(indent + 1).join('</ul>')}</div>`
  }

  md.core.ruler.push('grab_state', function (state) {
    gstate = state
  })

  md.inline.ruler.after('emphasis', 'toc', toc)
}
