<?php
class SimpleClass
{
    public $var = 'a default value';
    public function displayVar() {
        echo $this->var;
    }
}

$instance = new SimpleClass();
$instance->var = "new value";
$instance->displayVar();