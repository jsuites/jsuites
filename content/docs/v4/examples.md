<div class="section">
<div class="section-content">

<h1>Examples</h1>

<ul>
<?php

foreach ($this->view['pages'] as $v) {
    echo "<li><a href='/docs/v4/{$v['url']}'>{$v['title']}</a><br>{$v['description']}</li><br>";
}

?>
</ul>

</div>
</div>