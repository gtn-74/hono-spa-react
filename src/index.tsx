import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

// 環境変数の型定義
type Env = {
  Bindings: {
    MY_VAR: string
  }
}

const app = new Hono<Env>()

// routing
app.get('/api/clock', (c) => {
  return c.json({
    // wrangler.tomlに存在してる
    var: c.env.MY_VAR, // Cloudflare Bindings
    // varの下に表示されてる時間
    time: new Date().toLocaleTimeString()
  })
})


app.get('*', (c) => {
  return c.html(
    // renderToStringは、Cloudflare Workersでルーティング、ミドルウェアを提供してる
    // サーバーサイドでのレンダリングを可能にしてる
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
          {/* 読み込み先のファイルを探してる */}
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/src/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app

/*
・ReactをサーバーサイドでレンダリングしてAPIのエンドポイントを提供してる


*/
