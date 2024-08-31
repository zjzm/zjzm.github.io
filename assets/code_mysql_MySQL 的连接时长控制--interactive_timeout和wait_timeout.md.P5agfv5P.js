import{_ as a,c as s,o as n,a4 as e}from"./chunks/framework.qL1yNBZ5.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/mysql/MySQL 的连接时长控制--interactive_timeout和wait_timeout.md","filePath":"code/mysql/MySQL 的连接时长控制--interactive_timeout和wait_timeout.md"}'),p={name:"code/mysql/MySQL 的连接时长控制--interactive_timeout和wait_timeout.md"},i=e(`<p>在用MySQL客户端对数据库进行操作时，如果一段时间没有操作，再次操作时，常常会报如下错误：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ERROR 2013 (HY000): Lost connection to MySQL server during query</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ERROR 2006 (HY000): MySQL server has gone away</span></span>
<span class="line"><span>No connection. Trying to reconnect...</span></span></code></pre></div><p>这个报错信息就意味着当前的连接已经断开，需要重新建立连接。</p><p>那么，连接建立后，连接的时长是如何确定的呢？</p><p>在MySQL中，这个与两个参数<code>interactive_timeout</code>和<code>wait_timeout</code>的设置有关。</p><p>注:以下说明基于MySQL 5.7.</p><h2 id="_1-interactive-timeout和wait-timeout的定义" tabindex="-1">1.interactive_timeout和wait_timeout的定义 <a class="header-anchor" href="#_1-interactive-timeout和wait-timeout的定义" aria-label="Permalink to &quot;1.interactive\\_timeout和wait\\_timeout的定义&quot;">​</a></h2><p>首先，看看官方文档对于这两个参数的定义。</p><p><strong>interactive_timeout</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The number of seconds the server waits for activity on an interactive connection before closing it. An interactive client is defined as a client that uses the CLIENT_INTERACTIVE option to mysql_real_connect(). See also wait_timeout.</span></span></code></pre></div><p>interactive_timeout参数，定义了对于交互式连接，服务端等待数据的最大时间。如果超过这个时间，服务端仍然没有收到数据，则会关闭连接。</p><p>所谓交互式client，是指调用mysql_real_connect()函数建立连接时，设置了CLIENT_INTERACTIVE选项。比较常用的就是命令行终端。</p><p>查看interactive_timeout的值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global variables like  &#39;interactive_timeout%&#39;;</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>1 row in set (0.01 sec)</span></span></code></pre></div><p>默认是28800，单位秒，即8个小时</p><p><strong>wait_timeout</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The number of seconds the server waits for activity on a noninteractive connection before closing it.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>On thread startup, the session wait_timeout value is initialized from the global wait_timeout value or from the global interactive_timeout value, depending on the type of client (as defined by the CLIENT_INTERACTIVE connect option to mysql_real_connect()). See also interactive_timeout.</span></span></code></pre></div><p>wait_timeout参数，定义对于非交互式连接，服务端等待数据的最长时间。如果超过这个时间，服务端仍然没有收到数据，则会关闭连接。</p><p>在连接线程启动的时候，根据连接的类型，决定会话级的wait_timeout的值是初始化为全局的wait_timeout，还是全局的interactive_timeout。即如果是交互式连接，会话变量wait_timeout初始化为全局的interactive_timeout，否则，初始化为全局的wait_timeout。</p><p>查看wait_timeout的值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global variables like  &#39;wait_timeout%&#39;;</span></span>
<span class="line"><span>+---------------+-------+</span></span>
<span class="line"><span>| Variable_name | Value |</span></span>
<span class="line"><span>+---------------+-------+</span></span>
<span class="line"><span>| wait_timeout  | 28800 |</span></span>
<span class="line"><span>+---------------+-------+</span></span>
<span class="line"><span>1 row in set (0.00 sec)</span></span></code></pre></div><p>默认同样是28800s,即8小时。</p><p>根据上述定义，两者的区别显而易见：interactive_timeout针对交互式连接，wait_timeout针对非交互式连接。所谓的交互式连接，即在mysql_real_connect()函数中使用了CLIENT_INTERACTIVE选项。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> 说得直白一点，通过mysql命令行终端连接数据库是交互式连接，通过jdbc等连接数据库是非交互式连接。</span></span></code></pre></div><p>下面来测试一下，确认如下问题：</p><ul><li>控制连接最大空闲时长的是哪个参数。</li><li>会话变量wait_timeout的继承问题</li></ul><h2 id="_2-控制连接最大空闲时长的是哪个参数" tabindex="-1">2.控制连接最大空闲时长的是哪个参数 <a class="header-anchor" href="#_2-控制连接最大空闲时长的是哪个参数" aria-label="Permalink to &quot;2.控制连接最大空闲时长的是哪个参数&quot;">​</a></h2><p>先给出答案：wait_timeout</p><p>接下来进行验证。</p><h3 id="_2-1-只修改会话的wait-timeout参数" tabindex="-1">2.1 只修改会话的wait_timeout参数 <a class="header-anchor" href="#_2-1-只修改会话的wait-timeout参数" aria-label="Permalink to &quot;2.1 只修改会话的wait\\_timeout参数&quot;">​</a></h3><p>查看当前会话的wait_timeout和interactive_timeout。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>设置当前会话的wait_timeout为10s</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; set session wait_timeout=10;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.00 sec)</span></span></code></pre></div><p>再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 10    |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>等待10s，再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>ERROR 2006 (HY000): MySQL server has gone away</span></span>
<span class="line"><span>No connection. Trying to reconnect...</span></span>
<span class="line"><span>Connection id:    8</span></span>
<span class="line"><span>Current database: *** NONE ***</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.01 sec)</span></span></code></pre></div><p>可以看到，等待10s后再执行操作，原来的连接已经断开，并重新建立连接。</p><h3 id="_2-2-只修改会话的interactive-timeout参数" tabindex="-1">2.2 只修改会话的interactive_timeout参数 <a class="header-anchor" href="#_2-2-只修改会话的interactive-timeout参数" aria-label="Permalink to &quot;2.2 只修改会话的interactive\\_timeout参数&quot;">​</a></h3><p>首先查看当前会话的interactive_timeout和wait_timeout.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>接着，设置当前会话的interactive_timeout为10s</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; set session interactive_timeout=10;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.00 sec)</span></span></code></pre></div><p>再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 10    |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.01 sec)</span></span></code></pre></div><p>等待10s，再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 10    |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>可以看到，即使等待10后，连接是正常的。所以，设置interactive_timeout，对连接的时长没有影响。</p><h2 id="_3-会话变量wait-timeout的继承问题" tabindex="-1">3.会话变量wait_timeout的继承问题 <a class="header-anchor" href="#_3-会话变量wait-timeout的继承问题" aria-label="Permalink to &quot;3.会话变量wait\\_timeout的继承问题&quot;">​</a></h2><p>上面已经提到，如果是交互式连接，则继承自全局变量interactive_timeout的值，如果是非交互式连接，则继承自全局变量wait_timeout的值。</p><p>下面进行验证。</p><h3 id="_3-1-只修改全局变量interactive-timeout的值" tabindex="-1">3.1 只修改全局变量interactive_timeout的值 <a class="header-anchor" href="#_3-1-只修改全局变量interactive-timeout的值" aria-label="Permalink to &quot;3.1 只修改全局变量interactive\\_timeout的值&quot;">​</a></h3><p>首先查看全局的interactive_timeout和wait_timeout。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>接着，设置全局的interactive_timeout为10s。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; set global INTERACTIVE_TIMEOUT=10;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.00 sec)</span></span></code></pre></div><p>再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 10    |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>开启另外一个MySQL客户端，查看会话变量的值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 10    |</span></span>
<span class="line"><span>| wait_timeout        | 10    |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.01 sec)</span></span></code></pre></div><p>发现，WAIT_TIMEOUT的值已经变为10了。</p><p>等待10s后，再次查看，会发现原来的连接已经断开，连接的时长设置已经生效。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>ERROR 2006 (HY000): MySQL server has gone away</span></span>
<span class="line"><span>No connection. Trying to reconnect...</span></span>
<span class="line"><span>Connection id:    70</span></span>
<span class="line"><span>Current database: *** NONE ***</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 10    |</span></span>
<span class="line"><span>| wait_timeout        | 10    |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.01 sec)</span></span></code></pre></div><p>但通过非终端测试，wait_timeout的值依旧是28800：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>        &quot;database/sql&quot;</span></span>
<span class="line"><span>        &quot;log&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        _ &quot;github.com/go-sql-driver/mysql&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var DB *sql.DB</span></span>
<span class="line"><span>var dataBase = &quot;root:Aa123456@tcp(127.0.0.1:3306)/?loc=Local&amp;amp;parseTime=true&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func mysqlInit() {</span></span>
<span class="line"><span>        var err error</span></span>
<span class="line"><span>        DB, err = sql.Open(&quot;mysql&quot;, dataBase)</span></span>
<span class="line"><span>        if err != nil {</span></span>
<span class="line"><span>                log.Fatalln(&quot;open db fail:&quot;, err)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        DB.SetMaxOpenConns(1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        err = DB.Ping()</span></span>
<span class="line"><span>        if err != nil {</span></span>
<span class="line"><span>                log.Fatalln(&quot;ping db fail:&quot;, err)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>        mysqlInit()</span></span>
<span class="line"><span>        execSql()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func execSql() {</span></span>
<span class="line"><span>        var variableName string</span></span>
<span class="line"><span>        var value int</span></span>
<span class="line"><span>        sql := &quot;show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;)&quot;</span></span>
<span class="line"><span>        rows, err := DB.Query(sql)</span></span>
<span class="line"><span>        if err != nil {</span></span>
<span class="line"><span>                log.Println(&quot;query failed:&quot;, err)</span></span>
<span class="line"><span>                return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        defer rows.Close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for rows.Next() {</span></span>
<span class="line"><span>                err = rows.Scan(&amp;amp;variableName, &amp;amp;value)</span></span>
<span class="line"><span>                if err != nil {</span></span>
<span class="line"><span>                        log.Println(&quot;rows.Scan failed:&quot;, err)</span></span>
<span class="line"><span>                        return</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                log.Println(&quot;variable_name:&quot;, variableName, &quot;, value:&quot;, value)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2019/10/13 17:11:22 variable_name: interactive_timeout , value: 10</span></span>
<span class="line"><span>2019/10/13 17:11:22 variable_name: wait_timeout , value: 28800</span></span></code></pre></div><p>结果输出如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>INTERACTIVE_TIMEOUT:  10</span></span>
<span class="line"><span>WAIT_TIMEOUT:  28800</span></span></code></pre></div><h3 id="_3-2-只修改全局变量wait-timeout的值" tabindex="-1">3.2 只修改全局变量wait_timeout的值 <a class="header-anchor" href="#_3-2-只修改全局变量wait-timeout的值" aria-label="Permalink to &quot;3.2 只修改全局变量wait\\_timeout的值&quot;">​</a></h3><p>首先查看全局的interactive_timeout和wait_timeout。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>接着，将全局的WAIT_TIMEOUT设置为20s。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; set global WAIT_TIMEOUT=20;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.07 sec)</span></span></code></pre></div><p>再次查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show global  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 20    |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>开启另外一个mysql客户端，查看会话变量的值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;);</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| Variable_name       | Value |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>| interactive_timeout | 28800 |</span></span>
<span class="line"><span>| wait_timeout        | 28800 |</span></span>
<span class="line"><span>+---------------------+-------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><p>WAIT_TIMEOUT的值依旧是28800.</p><p>查看非终端的代码执行的结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func execSql() {</span></span>
<span class="line"><span>        var variableName string</span></span>
<span class="line"><span>        var value int</span></span>
<span class="line"><span>        sql := &quot;show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;)&quot;</span></span>
<span class="line"><span>        rows, err := DB.Query(sql)</span></span>
<span class="line"><span>        if err != nil {</span></span>
<span class="line"><span>                log.Println(&quot;query failed:&quot;, err)</span></span>
<span class="line"><span>                return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        defer rows.Close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for rows.Next() {</span></span>
<span class="line"><span>                err = rows.Scan(&amp;amp;variableName, &amp;amp;value)</span></span>
<span class="line"><span>                if err != nil {</span></span>
<span class="line"><span>                        log.Println(&quot;rows.Scan failed:&quot;, err)</span></span>
<span class="line"><span>                        return</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                log.Println(&quot;variable_name:&quot;, variableName, &quot;, value:&quot;, value)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2019/10/13 17:23:10 variable_name: interactive_timeout , value: 28800</span></span>
<span class="line"><span>2019/10/13 17:23:10 variable_name: wait_timeout , value: 20</span></span></code></pre></div><p>修改程序，执行sql语句后，等待25s后，再次执行sql语句，查看执行情况。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>        mysqlInit()</span></span>
<span class="line"><span>        for {</span></span>
<span class="line"><span>                execSql()</span></span>
<span class="line"><span>                time.Sleep(25*time.Second)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func execSql() {</span></span>
<span class="line"><span>        var variableName string</span></span>
<span class="line"><span>        var value int</span></span>
<span class="line"><span>        sql := &quot;show session  variables where Variable_name in (&#39;interactive_timeout&#39;, &#39;wait_timeout&#39;)&quot;</span></span>
<span class="line"><span>        rows, err := DB.Query(sql)</span></span>
<span class="line"><span>        if err != nil {</span></span>
<span class="line"><span>                log.Println(&quot;query failed:&quot;, err)</span></span>
<span class="line"><span>                return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        defer rows.Close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for rows.Next() {</span></span>
<span class="line"><span>                err = rows.Scan(&amp;amp;variableName, &amp;amp;value)</span></span>
<span class="line"><span>                if err != nil {</span></span>
<span class="line"><span>                        log.Println(&quot;rows.Scan failed:&quot;, err)</span></span>
<span class="line"><span>                        return</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                log.Println(&quot;variable_name:&quot;, variableName, &quot;, value:&quot;, value)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2019/10/13 17:26:46 variable_name: interactive_timeout , value: 28800</span></span>
<span class="line"><span>2019/10/13 17:26:46 variable_name: wait_timeout , value: 20</span></span>
<span class="line"><span>[mysql] 2019/10/13 17:27:11 packets.go:36: unexpected EOF</span></span>
<span class="line"><span>[mysql] 2019/10/13 17:27:11 packets.go:141: write tcp 127.0.0.1:53878-&amp;gt;127.0.0.1:3306: write: broken pipe</span></span>
<span class="line"><span>2019/10/13 17:27:11 variable_name: interactive_timeout , value: 28800</span></span>
<span class="line"><span>2019/10/13 17:27:11 variable_name: wait_timeout , value: 20</span></span></code></pre></div><p>可以看到，等待25s后，再次执行sql，此时连接已经断开。<br> 底层又重新建立连接。</p><h2 id="_4-总结" tabindex="-1">4.总结 <a class="header-anchor" href="#_4-总结" aria-label="Permalink to &quot;4.总结&quot;">​</a></h2><ul><li><p>控制连接最大空闲时长的wait_timeout参数。</p></li><li><p>关于wait_timeout的继承</p><ul><li>对于非交互式连接，类似于jdbc连接，wait_timeout的值继承自全局变量wait_timeout。</li><li>对于交互式连接，类似于mysql命令行终端，wait_timeout的值继承全局变量interactive_timeout。</li></ul></li><li><p>判断一个连接的空闲时间，可通过show processlist输出中Sleep状态的时间</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql&amp;gt; show processlist;</span></span>
<span class="line"><span>+----+------+----------------------+------+---------+------+-------+------------------+</span></span>
<span class="line"><span>| Id | User | Host                 | db   | Command | Time | State | Info             |</span></span>
<span class="line"><span>+----+------+----------------------+------+---------+------+-------+------------------+</span></span>
<span class="line"><span>|  2 | root | localhost            | NULL | Query   |    0 | init  | show processlist |</span></span>
<span class="line"><span>|  6 | repl | 192.132.2.66:56001   | NULL | Sleep   | 1201 |       | NULL             |</span></span>
<span class="line"><span>+----+------+----------------------+------+---------+------+-------+------------------+</span></span>
<span class="line"><span>2 rows in set (0.03 sec)</span></span></code></pre></div><p><a href="https://www.cnblogs.com/ivictor/p/5979731.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/ivictor/p/5979731.html</a></p><p><a href="http://www.cnblogs.com/cenalulu/archive/2012/06/20/2554863.html" target="_blank" rel="noreferrer">http://www.cnblogs.com/cenalulu/archive/2012/06/20/2554863.html</a></p><p><a href="http://www.cnblogs.com/Alight/p/4118515.html" target="_blank" rel="noreferrer">http://www.cnblogs.com/Alight/p/4118515.html</a></p><p><a href="http://ronaldbradford.com/blog/sqlstatehy000-general-error-2006-mysql-server-has-gone-away-2013-01-02/" target="_blank" rel="noreferrer">http://ronaldbradford.com/blog/sqlstatehy000-general-error-2006-mysql-server-has-gone-away-2013-01-02/</a></p>`,97),t=[i];function l(c,o,r,u,m,d){return n(),s("div",null,t)}const b=a(p,[["render",l]]);export{v as __pageData,b as default};
