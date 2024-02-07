/*
Language: Chapel
Author: Brad Chamberlain <bradcray@gmail.com>
Contributors: 
Description: A parallel language for productive programming at scale
Website: https://chapel-lang.org
*/
export default function(hljs) {
    return {
        name: "Chapel",
        aliases: ['chapel', 'chpl'],
        disableAutodetect: true,
        keywords: {
            keyword: 'align as atomic begin bool borrowed break by bytes catch class cobegin coforall complex config const continue defer delete dmapped do domain else enum export except extern false for forall foreach forwarding if imag import in include index inline inout int implements interface iter label lambda let lifetime local locale manage module new noinit none nothing on only operator otherwise out override owned param pragma private proc prototype public real record reduce ref require return scan select serial shared single sparse string subdomain sync then this throw throws true try try! type uint union unmanaged use var void when where while with yield zip',

            // What other built-ins should we add here?
            built_in: 'here Locales write writef writeln',
            literal: 'false true nil none'
        },
        contains: [
            // Our line comments are like C's
            hljs.C_LINE_COMMENT_MODE,

            // Like C's block comment mode, but supporting nested comments:
            hljs.COMMENT('/\\*', '\\*/', {contains: ['self']}),

            // The following is similar to C's C_NUMBER_MODE, but it
            // requires a digit after '9.' like Chapel does to avoid
            // mis-coloring '0..10' and disambiguate calls like
            // '9.square()'
            {
                className: 'number',
                begin: '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d+)?|\\.\\d\
+)([eE][-+]?\\d+)?)',
                relevance: 0
            },
            // More could/should be done here to handle escapes and
            // the like, but for some reason, inheriting the C string
            // definitions didn't work well for me, so I went with this
            // basic approach for now.
            {
                className: 'string',
                variants: [
                    {
                        begin: '(b)?"', end: '"'
                    },
                    {
                        begin: "(b)?'", end: "'"
                    },
                    {
                        begin: '(b)?"""', end: '"""'
                    },
                    {
                        begin: "(b)?'''", end: "'''"
                    }
                ]
            },
        ]
    }
}

